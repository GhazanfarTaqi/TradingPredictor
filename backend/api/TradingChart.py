# import MetaTrader5 as mt5
from groq import Groq
import pandas as pd
import pandas_ta as ta  # Library for technical indicators
import json
import time
from datetime import datetime
from django.conf import settings
from twelvedata import TDClient
import os
from dotenv import load_dotenv
from twelvedata import TDClient

# Force load the .env file
load_dotenv()

# Change how the keys are fetched to be more robust
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
TWELVE_DATA_API_KEY = os.getenv("TWELVEDATA_API_KEY")
SYMBOL = "XAU/USD"
TIMEFRAME = "15min"
# Initialize Groq Client
client = Groq(api_key=GROQ_API_KEY)
td_client = TDClient(apikey=TWELVE_DATA_API_KEY)

# ==========================================
# 2. FUNCTION: FETCH LIVE DATA FROM MT5 (FIXED)
# ==========================================
def get_gold_data():
    print(f"   📡 Fetching Real-Time {SYMBOL} data from TwelveData...")
    ts = td_client.time_series(symbol=SYMBOL, interval=TIMEFRAME, outputsize=500)
    try:
        df = ts.as_pandas()
    except Exception as e:
        print(f"❌ Error fetching data: {e}")
        return None
    
    df = df.iloc[::-1] # Sort Oldest -> Newest
    
    # Calculate Indicators
    df['rsi'] = ta.rsi(df['close'], length=14)
    df['ema_50'] = ta.ema(df['close'], length=50)
    bb = ta.bbands(df['close'], length=20, std=2)
    if bb is not None:
        df = pd.concat([df, bb], axis=1)
        cols = df.columns.tolist()
        bbu = [c for c in cols if c.startswith('BBU')][0]
        bbl = [c for c in cols if c.startswith('BBL')][0]
        df.rename(columns={bbu: 'upper_band', bbl: 'lower_band'}, inplace=True)
    return df

# ==========================================
# 3. SMART MONEY LOGIC
# ==========================================
def detect_liquidity_grab(df):
    current = df.iloc[-1]
    last_10 = df.iloc[-11:-1]
    recent_support = last_10['low'].min()
    recent_resistance = last_10['high'].max()
    
    grab_detected = "NONE"
    if current['low'] < recent_support and current['close'] > recent_support:
        grab_detected = "BULLISH_LIQUIDITY_GRAB"
    elif current['high'] > recent_resistance and current['close'] < recent_resistance:
        grab_detected = "BEARISH_LIQUIDITY_GRAB"
        
    return grab_detected, recent_support, recent_resistance

# ==========================================
# 4. AI LOGIC (UPDATED PROMPT FOR NEW OUTPUT)
# ==========================================
def ask_ai_trader(df):
    # 1. History Log
    history_log = ""
    last_5 = df.tail(5) 
    for index, row in last_5.iterrows():
        history_log += f"Candle {index}: Open={row['open']:.1f}, High={row['high']:.1f}, Low={row['low']:.1f}, Close={row['close']:.1f}\n"    
    
    # 2. Structural Data
    grab_status, recent_supp, recent_res = detect_liquidity_grab(df)
    current = df.iloc[-1]
    
    # 3. Context String
    market_context = f"""
    ASSET: {SYMBOL}
    PRICE: {current['close']:.2f}
    RSI: {current['rsi']:.2f}
    UPPER_BAND: {current['upper_band']:.2f}
    LOWER_BAND: {current['lower_band']:.2f}
    
    STRUCTURE:
    Liquidity Event: {grab_status}
    Recent Support: {recent_supp:.2f}
    Recent Resistance: {recent_res:.2f}
    
    RECENT HISTORY LOG:
    {history_log}
    """

    # --- UPDATED PROMPT TO MATCH YOUR OUTPUT FORMAT ---
    system_prompt = """
    You are a Professional Gold Trader AI.
    Analyze the HISTORY LOG and STRUCTURE.
    
    OUTPUT REQUIREMENTS:
    - You MUST output strict JSON.
    - You MUST identify a specific pattern (e.g., "Bullish Liquidity Sweep", "RSI Divergence", "Consolidation","tell the pattern by studing the books and the professional studeis").
    - You MUST give a confidence score (e.g. "80%").
    
    JSON FORMAT:
    { 
        "module": "TECHNICAL",
        "decision": "BUY/SELL/WAIT", 
        "confidence": "0-100%",     
        "entry_price": 0.0, 
        "stop_loss": 0.0, 
        "take_profit": 0.0, 
        "pattern_identified": "Name of Pattern",
        "reasoning": "Detailed explanation of why." 
    }
    """

    try:
        completion = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": market_context}
            ],
            temperature=0,
            response_format={"type": "json_object"}
        )
        return json.loads(completion.choices[0].message.content)
    except Exception as e:
        print(f"AI Error: {e}")
        return None

def getPrediction():
    print(f"--- ⚡ STARTING {SYMBOL} BOT (Ctrl+C to Stop) ---")
    df = get_gold_data()
    if df is not None:
        price = df.iloc[-1]['close']
        print(f"   -> Analyzing Market... Price: {price} | RSI: {df.iloc[-1]['rsi']:.2f}")
            
        decision = ask_ai_trader(df)
            
        # --- THE EXACT OUTPUT FORMAT YOU ASKED FOR ---
        if decision:
            # Only print detailed block if it's NOT a WAIT signal (or print all if you prefer)
            if decision['decision'] != "WAIT":
                print("\n" + f"📢 PATTERN: {decision.get('pattern_identified', 'Unknown')}")
                print(f"🚀 DECISION: {decision.get('decision')} ({decision.get('confidence', 'N/A')})")
                print(f"📝 REASON:   {decision.get('reasoning')}")
                print("="*50)
                print(json.dumps(decision, indent=4))
                print("="*50 + "\n")
            else:
                print(f"   -> AI Says: WAIT ({decision.get('confidence')} confidence) - Pattern: {decision.get('pattern_identified')}")
        return decision
    
# ==========================================
# 5. MAIN SERVER LOOP (UPDATED PRINT STYLE)
# ==========================================
if __name__ == "__main__":
    print(f"--- ⚡ STARTING {SYMBOL} BOT (Ctrl+C to Stop) ---")
    
    while True:
        df = get_gold_data()
        
        if df is not None:
            price = df.iloc[-1]['close']
            print(f"   -> Analyzing Market... Price: {price} | RSI: {df.iloc[-1]['rsi']:.2f}")
            
            decision = ask_ai_trader(df)
            
            # --- THE EXACT OUTPUT FORMAT YOU ASKED FOR ---
            if decision:
                # Only print detailed block if it's NOT a WAIT signal (or print all if you prefer)
                if decision['decision'] != "WAIT":
                    print("\n" + f"📢 PATTERN: {decision.get('pattern_identified', 'Unknown')}")
                    print(f"🚀 DECISION: {decision.get('decision')} ({decision.get('confidence', 'N/A')})")
                    print(f"📝 REASON:   {decision.get('reasoning')}")
                    print("="*50)
                    print(json.dumps(decision, indent=4))
                    print("="*50 + "\n")
                else:
                    print(f"   -> AI Says: WAIT ({decision.get('confidence')} confidence) - Pattern: {decision.get('pattern_identified')}")
            
        print("   💤 Sleeping 5 minutes...")
        time.sleep(300)