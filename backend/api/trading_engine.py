import MetaTrader5 as mt5
from groq import Groq
import pandas as pd
import pandas_ta as ta  # Library for technical indicators
import json
import time
from datetime import datetime
from django.conf import settings

# ==========================================
# 1. CONFIGURATION
# ==========================================
GROQ_API_KEY = settings.GROQ_API_KEY  # Get from console.groq.com
MT5_LOGIN = settings.MT5_LOGIN  # Optional: Your Account ID (or leave 0 if MT5 is already open)
MT5_PASSWORD = settings.MT5_PASSWORD # Optional
MT5_SERVER = "MetaQuotes-Demo"     # Optional
SYMBOL = "XAUUSD"              # Gold Symbol
TIMEFRAME = mt5.TIMEFRAME_M15  # 15-Minute Candles

# Initialize Groq Client
client = Groq(api_key=GROQ_API_KEY)


# ==========================================
# 2. FUNCTION: FETCH LIVE DATA FROM MT5 (FIXED)
# ==========================================
def get_market_data(symbol, timeframe, num_candles=100):
    # Connect to MT5
    if not mt5.initialize():
        print("initialize() failed, error code =", mt5.last_error())
        return None

    # Get candlesticks
    rates = mt5.copy_rates_from_pos(symbol, timeframe, 0, num_candles)
    mt5.shutdown() # Close connection to free resources

    if rates is None:
        print("Failed to get rates")
        return None

    # Convert to DataFrame
    df = pd.DataFrame(rates)
    df['time'] = pd.to_datetime(df['time'], unit='s')
    
    # Calculate Indicators
    # 1. RSI
    df['rsi'] = ta.rsi(df['close'], length=14)
    
    # 2. EMA
    df['ema_50'] = ta.ema(df['close'], length=50)
    
    # 3. Bollinger Bands (ROBUST FIX)
    # We assign result to 'bb' and verify columns exist
    bb = ta.bbands(df['close'], length=20, std=2)
    
    if bb is not None and not bb.empty:
        # Concatenate bands to the main dataframe
        df = pd.concat([df, bb], axis=1)
        
        # --- FIX: RENAME COLUMNS TO ENSURE NAMES MATCH ---
        # pandas_ta creates columns like BBL_20_2.0, BBM_20_2.0, BBU_20_2.0
        # We find them dynamically to avoid KeyErrors
        cols = df.columns.tolist()
        
        # Rename the Upper Band column (Starts with BBU) to just 'BBU'
        bbu_col = [c for c in cols if c.startswith('BBU')][0]
        df.rename(columns={bbu_col: 'BBU_20_2.0'}, inplace=True)

        # Rename the Lower Band column (Starts with BBL) to just 'BBL'
        bbl_col = [c for c in cols if c.startswith('BBL')][0]
        df.rename(columns={bbl_col: 'BBL_20_2.0'}, inplace=True)
    else:
        print("Error: Could not calculate Bollinger Bands")

    # Debug: Print columns to verify they exist now
    # print("Columns:", df.columns.tolist()) 

    return df

# ==========================================
# 3. FUNCTION: ASK GROQ FOR DECISION
# ==========================================
def ask_groq_oracle(df):
    # Get the latest candle (Current Market State)
    current = df.iloc[-1]
    prev = df.iloc[-2]
    
    # Prepare the "Prompt" (The Context)
    market_context = f"""
    ASSET: {SYMBOL}
    CURRENT PRICE: {current['close']}
    RSI (14): {current['rsi']:.2f}
    EMA (50): {current['ema_50']:.2f}
    BOLLINGER UPPER: {current['BBU_20_2.0']:.2f}
    BOLLINGER LOWER: {current['BBL_20_2.0']:.2f}
    
    PREVIOUS CANDLE CLOSE: {prev['close']}
    """

    # The System Instruction (Your "Custom Book" Strategy Logic)
    system_prompt = """
    You are an expert Gold Trader AI. 
    Analyze the technical data provided.
    
    STRATEGY RULES:
    1. SELL if Price > Upper Bollinger Band AND RSI > 70 (Overbought).
    2. BUY if Price < Lower Bollinger Band AND RSI < 30 (Oversold).
    3. WAIT if signals are mixed.
    
    OUTPUT FORMAT:
    You must reply with strict JSON only. No text.
    Format:
    {
        "decision": "BUY" or "SELL" or "WAIT",
        "confidence": "0-100%",
        "entry_price": float,
        "stop_loss": float,
        "take_profit": float,
        "reasoning": "Short explanation",
        "pattern_detected": "Name of pattern (e.g. Overbought Rejection)"
    }
    """

    try:
        completion = client.chat.completions.create(
            # model="llama-3.1-8b-instant", # Using the fast model
            model="openai/gpt-oss-120b",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": market_context}
            ],
            temperature=0, # 0 = Strict Logic, 1 = Creative
            response_format={"type": "json_object"} # Force JSON mode
        )
        return json.loads(completion.choices[0].message.content)
    except Exception as e:
        print(f"AI Error: {e}")
        return None

def getPrediction():
    print(f"--- 🤖 STARTING {SYMBOL} AI AGENT ---")
    
    # Step A: Get Data
    print("1. Fetching Live Data from MetaTrader 5...")
    df = get_market_data(SYMBOL, TIMEFRAME)
    
    if df is not None:
        print(f"   -> Data Received. Current Price: {df.iloc[-1]['close']}")
        
        # Step B: Get AI Decision
        print("2. Sending to Groq AI for analysis...")
        ai_decision = ask_groq_oracle(df)
        
        # Step C: Display Result
        print("\n" + "="*40)
        print("       📢 AI TRADE SIGNAL RECEIVED")
        print("="*40)
        
        if ai_decision:
            # This is what you would send to your React Frontend
            print(json.dumps(ai_decision, indent=4))
            return ai_decision
            # Example of using the data
            if ai_decision['decision'] != "WAIT":
                print(f"\n🚀 ACTION REQUIRED: {ai_decision['decision']} @ {ai_decision['entry_price']}")
                print(f"🛑 STOP LOSS: {ai_decision['stop_loss']}")
                print(f"🎯 TAKE PROFIT: {ai_decision['take_profit']}")
                
        else:
            print("❌ AI returned no response.")
# ==========================================
# 4. MAIN EXECUTION LOOP
# ==========================================
if __name__ == "__main__":
    print(f"--- 🤖 STARTING {SYMBOL} AI AGENT ---")
    
    # Step A: Get Data
    print("1. Fetching Live Data from MetaTrader 5...")
    df = get_market_data(SYMBOL, TIMEFRAME)
    
    if df is not None:
        print(f"   -> Data Received. Current Price: {df.iloc[-1]['close']}")
        
        # Step B: Get AI Decision
        print("2. Sending to Groq AI for analysis...")
        ai_decision = ask_groq_oracle(df)
        
        # Step C: Display Result
        print("\n" + "="*40)
        print("       📢 AI TRADE SIGNAL RECEIVED")
        print("="*40)
        
        if ai_decision:
            # This is what you would send to your React Frontend
            print(json.dumps(ai_decision, indent=4))
            
            # Example of using the data
            if ai_decision['decision'] != "WAIT":
                print(f"\n🚀 ACTION REQUIRED: {ai_decision['decision']} @ {ai_decision['entry_price']}")
                print(f"🛑 STOP LOSS: {ai_decision['stop_loss']}")
                print(f"🎯 TAKE PROFIT: {ai_decision['take_profit']}")
        else:
            print("❌ AI returned no response.")