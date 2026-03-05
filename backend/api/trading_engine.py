# # import pandas as pd
# # from twelvedata import TDClient
# # import pymongo
# import MetaTrader5 as mt5
# from groq import Groq
# import pandas as pd
# import pandas_ta as ta  # Library for technical indicators
# import json
# import time
# from datetime import datetime
# from django.conf import settings

# # Initialize Connections
# mongo_client = pymongo.MongoClient("mongodb://localhost:27017/")
# db = mongo_client['goldrush_db']
# trades_collection = db['signals']
# td_client = TDClient(apikey="eacef76c03744c549807adadd7e2b626")

# def check_trade_status_historically(trade, df):
#     """Walks forward from entry time to see if TP/SL was hit."""
#     try:
#         # 1. Force the chart index to be clean, timezone-naive datetimes
#         df.index = pd.to_datetime(df.index)
#         if df.index.tz is not None:
#             df.index = df.index.tz_localize(None)

#         # 2. Clean the trade entry time
#         trade_time = pd.to_datetime(trade['entry_time'])
#         if trade_time.tzinfo is not None:
#             trade_time = trade_time.tz_localize(None)
            
#         # 3. Slice the data to only look at the future
#         future_data = df[df.index >= trade_time]
        
#         print(f"🔍 Checking Trade {trade.get('trade_id', 'Unknown')}")
#         print(f"   -> Opened at: {trade_time}")
#         print(f"   -> Future Candles Found: {len(future_data)}")

#         if future_data.empty:
#             print("   -> ⚠️ No new market data since trade was opened.")
#             return "PENDING", None

#     except Exception as e:
#         print(f"❌ Date matching error: {e}")
#         return "ERROR", None

#     # 4. Force all prices to be numbers (Floats) to prevent string comparison errors
#     tp = float(trade['take_profit'])
#     sl = float(trade['stop_loss'])

#     for time_index, candle in future_data.iterrows():
#         high = float(candle['high'])
#         low = float(candle['low'])
        
#         if trade['decision'] == "BUY":
#             if low <= sl: 
#                 print(f"   ❌ Hit Stop Loss ({sl}) at {time_index}")
#                 return "LOSS", time_index
#             elif high >= tp: 
#                 print(f"   ✅ Hit Take Profit ({tp}) at {time_index}")
#                 return "WIN", time_index
                
#         elif trade['decision'] == "SELL":
#             if high >= sl: 
#                 print(f"   ❌ Hit Stop Loss ({sl}) at {time_index}")
#                 return "LOSS", time_index
#             elif low <= tp: 
#                 print(f"   ✅ Hit Take Profit ({tp}) at {time_index}")
#                 return "WIN", time_index

#     print("   -> Checked all candles. TP/SL not reached yet.")
#     return "PENDING", None

# def update_all_pending_trades():
#     """Triggered by views.py. Fetches chart ONCE and checks all pending trades."""
#     pending_trades = list(trades_collection.find({"status": "PENDING"}))
    
#     if not pending_trades:
#         print("🔄 No PENDING trades to check.")
#         return 0 
        
#     print(f"🔄 Found {len(pending_trades)} PENDING trades. Fetching chart...")
#     ts = td_client.time_series(symbol="XAU/USD", interval="15min", outputsize=500)
    
#     try:
#         df = ts.as_pandas().iloc[::-1]
#     except Exception as e:
#         print(f"❌ Failed to download TwelveData chart: {e}")
#         return 0

#     updated_count = 0
#     for trade in pending_trades:
#         new_status, close_time = check_trade_status_historically(trade, df)
        
#         if new_status in ["WIN", "LOSS"]:
#             trades_collection.update_one(
#                 {"_id": trade["_id"]},
#                 {"$set": {"status": new_status, "closed_at": str(close_time)}}
#             )
#             updated_count += 1
#             print(f"   💾 Saved {new_status} to Database!")
            
#     return updated_count



# import pandas as pd
# from twelvedata import TDClient
# import pymongo

# # Initialize MongoDB and TwelveData here
# mongo_client = pymongo.MongoClient("mongodb://localhost:27017/")
# db = mongo_client['goldrush_db']
# trades_collection = db['signals']

# td_client = TDClient(apikey="eacef76c03744c549807adadd7e2b626")

# def get_latest_chart():
#     """Fetches the latest 500 candles to check trade status."""
#     ts = td_client.time_series(symbol="XAU/USD", interval="15min", outputsize=500)
#     try:
#         return ts.as_pandas().iloc[::-1] # Oldest to Newest
#     except Exception:
#         return None

# def check_trade_status_historically(trade, df):
#     """Walks forward from entry time to see if TP/SL was hit."""
#     try:
#         trade_time = pd.to_datetime(trade['entry_time']).tz_localize(None)
#         future_data = df[df.index >= trade_time]
#     except Exception:
#         return "ERROR", None

#     for time_index, candle in future_data.iterrows():
#         high, low = candle['high'], candle['low']
        
#         if trade['decision'] == "BUY":
#             if low <= trade['stop_loss']: return "LOSS", time_index
#             elif high >= trade['take_profit']: return "WIN", time_index
#         elif trade['decision'] == "SELL":
#             if high >= trade['stop_loss']: return "LOSS", time_index
#             elif low <= trade['take_profit']: return "WIN", time_index

#     return "PENDING", None

# def update_all_pending_trades():
#     """Finds all pending trades, checks them, and updates MongoDB."""
#     pending_trades = list(trades_collection.find({"status": "PENDING"}))
    
#     if not pending_trades:
#         return 0 # No trades to update
        
#     df = get_latest_chart()
#     if df is None:
#         return 0

#     updated_count = 0
#     for trade in pending_trades:
#         new_status, close_time = check_trade_status_historically(trade, df)
        
#         if new_status in ["WIN", "LOSS"]:
#             trades_collection.update_one(
#                 {"_id": trade["_id"]},
#                 {"$set": {"status": new_status, "closed_at": str(close_time)}}
#             )
#             updated_count += 1
            
#     return updated_count

# from groq import Groq
# import pandas as pd
# import pandas_ta as ta  # Library for technical indicators
# import json
# import time
# from datetime import datetime
# from django.conf import settings

# # ==========================================
# # 1. CONFIGURATION
# # ==========================================
# GROQ_API_KEY = settings.GROQ_API_KEY  # Get from console.groq.com
# MT5_LOGIN = settings.MT5_LOGIN  # Optional: Your Account ID (or leave 0 if MT5 is already open)
# MT5_PASSWORD = settings.MT5_PASSWORD # Optional
# MT5_SERVER = "MetaQuotes-Demo"     # Optional
# SYMBOL = "XAUUSD"              # Gold Symbol
# TIMEFRAME = "15min"

# # Initialize Groq Client
# client = Groq(api_key=GROQ_API_KEY)


# # ==========================================
# # 2. FUNCTION: FETCH LIVE DATA FROM MT5 (FIXED)
# # ==========================================
# def get_market_data(symbol, timeframe, num_candles=100):
#     # Connect to MT5
#     if not mt5.initialize():
#         print("initialize() failed, error code =", mt5.last_error())
#         return None

#     # Get candlesticks
#     rates = mt5.copy_rates_from_pos(symbol, timeframe, 0, num_candles)
#     mt5.shutdown() # Close connection to free resources

#     if rates is None:
#         print("Failed to get rates")
#         return None

#     # Convert to DataFrame
#     df = pd.DataFrame(rates)
#     df['time'] = pd.to_datetime(df['time'], unit='s')
    
#     # Calculate Indicators
#     # 1. RSI
#     df['rsi'] = ta.rsi(df['close'], length=14)
    
#     # 2. EMA
#     df['ema_50'] = ta.ema(df['close'], length=50)
    
#     # 3. Bollinger Bands (ROBUST FIX)
#     # We assign result to 'bb' and verify columns exist
#     bb = ta.bbands(df['close'], length=20, std=2)
    
#     if bb is not None and not bb.empty:
#         # Concatenate bands to the main dataframe
#         df = pd.concat([df, bb], axis=1)
        
#         # --- FIX: RENAME COLUMNS TO ENSURE NAMES MATCH ---
#         # pandas_ta creates columns like BBL_20_2.0, BBM_20_2.0, BBU_20_2.0
#         # We find them dynamically to avoid KeyErrors
#         cols = df.columns.tolist()
        
#         # Rename the Upper Band column (Starts with BBU) to just 'BBU'
#         bbu_col = [c for c in cols if c.startswith('BBU')][0]
#         df.rename(columns={bbu_col: 'BBU_20_2.0'}, inplace=True)

#         # Rename the Lower Band column (Starts with BBL) to just 'BBL'
#         bbl_col = [c for c in cols if c.startswith('BBL')][0]
#         df.rename(columns={bbl_col: 'BBL_20_2.0'}, inplace=True)
#     else:
#         print("Error: Could not calculate Bollinger Bands")

#     # Debug: Print columns to verify they exist now
#     # print("Columns:", df.columns.tolist()) 

#     return df

# # ==========================================
# # 3. FUNCTION: ASK GROQ FOR DECISION
# # ==========================================
# def ask_groq_oracle(df):
#     # Get the latest candle (Current Market State)
#     current = df.iloc[-1]
#     prev = df.iloc[-2]
    
#     # Prepare the "Prompt" (The Context)
#     market_context = f"""
#     ASSET: {SYMBOL}
#     CURRENT PRICE: {current['close']}
#     RSI (14): {current['rsi']:.2f}
#     EMA (50): {current['ema_50']:.2f}
#     BOLLINGER UPPER: {current['BBU_20_2.0']:.2f}
#     BOLLINGER LOWER: {current['BBL_20_2.0']:.2f}
    
#     PREVIOUS CANDLE CLOSE: {prev['close']}
#     """

#     # The System Instruction (Your "Custom Book" Strategy Logic)
#     system_prompt = """
#     You are an expert Gold Trader AI. 
#     Analyze the technical data provided.
    
#     STRATEGY RULES:
#     1. SELL if Price > Upper Bollinger Band AND RSI > 70 (Overbought).
#     2. BUY if Price < Lower Bollinger Band AND RSI < 30 (Oversold).
#     3. WAIT if signals are mixed.
    
#     OUTPUT FORMAT:
#     You must reply with strict JSON only. No text.
#     Format:
#     {
#         "decision": "BUY" or "SELL" or "WAIT",
#         "confidence": "0-100%",
#         "entry_price": float,
#         "stop_loss": float,
#         "take_profit": float,
#         "reasoning": "Short explanation",
#         "pattern_detected": "Name of pattern (e.g. Overbought Rejection)"
#     }
#     """

#     try:
#         completion = client.chat.completions.create(
#             # model="llama-3.1-8b-instant", # Using the fast model
#             model="openai/gpt-oss-120b",
#             messages=[
#                 {"role": "system", "content": system_prompt},
#                 {"role": "user", "content": market_context}
#             ],
#             temperature=0, # 0 = Strict Logic, 1 = Creative
#             response_format={"type": "json_object"} # Force JSON mode
#         )
#         return json.loads(completion.choices[0].message.content)
#     except Exception as e:
#         print(f"AI Error: {e}")
#         return None

# def getPrediction():
#     print(f"--- 🤖 STARTING {SYMBOL} AI AGENT ---")
    
#     # Step A: Get Data
#     print("1. Fetching Live Data from MetaTrader 5...")
#     df = get_market_data(SYMBOL, TIMEFRAME)
    
#     if df is not None:
#         print(f"   -> Data Received. Current Price: {df.iloc[-1]['close']}")
        
#         # Step B: Get AI Decision
#         print("2. Sending to Groq AI for analysis...")
#         ai_decision = ask_groq_oracle(df)
        
#         # Step C: Display Result
#         print("\n" + "="*40)
#         print("       📢 AI TRADE SIGNAL RECEIVED")
#         print("="*40)
        
#         if ai_decision:
#             # This is what you would send to your React Frontend
#             print(json.dumps(ai_decision, indent=4))
#             return ai_decision
#             # Example of using the data
#             if ai_decision['decision'] != "WAIT":
#                 print(f"\n🚀 ACTION REQUIRED: {ai_decision['decision']} @ {ai_decision['entry_price']}")
#                 print(f"🛑 STOP LOSS: {ai_decision['stop_loss']}")
#                 print(f"🎯 TAKE PROFIT: {ai_decision['take_profit']}")
                
#         else:
#             print("❌ AI returned no response.")
# # ==========================================
# # 4. MAIN EXECUTION LOOP
# # ==========================================
# if __name__ == "__main__":
#     print(f"--- 🤖 STARTING {SYMBOL} AI AGENT ---")
    
#     # Step A: Get Data
#     print("1. Fetching Live Data from MetaTrader 5...")
#     df = get_market_data(SYMBOL, TIMEFRAME)
    
#     if df is not None:
#         print(f"   -> Data Received. Current Price: {df.iloc[-1]['close']}")
        
#         # Step B: Get AI Decision
#         print("2. Sending to Groq AI for analysis...")
#         ai_decision = ask_groq_oracle(df)
        
#         # Step C: Display Result
#         print("\n" + "="*40)
#         print("       📢 AI TRADE SIGNAL RECEIVED")
#         print("="*40)
        
#         if ai_decision:
#             # This is what you would send to your React Frontend
#             print(json.dumps(ai_decision, indent=4))
            
#             # Example of using the data
#             if ai_decision['decision'] != "WAIT":
#                 print(f"\n🚀 ACTION REQUIRED: {ai_decision['decision']} @ {ai_decision['entry_price']}")
#                 print(f"🛑 STOP LOSS: {ai_decision['stop_loss']}")
#                 print(f"🎯 TAKE PROFIT: {ai_decision['take_profit']}")
#         else:
#             print("❌ AI returned no response.")
            
            
            
# import pandas as pd
# from twelvedata import TDClient
# import pymongo

# # Initialize Connections
# mongo_client = pymongo.MongoClient("mongodb://localhost:27017/")
# db = mongo_client['goldrush_db']
# trades_collection = db['signals']
# td_client = TDClient(apikey="eacef76c03744c549807adadd7e2b626")

# def check_trade_status_historically(trade, df):
#     """Walks forward from entry time to see if TP/SL was hit."""
#     try:
#         # 1. Force the chart index to be clean, timezone-naive datetimes
#         df.index = pd.to_datetime(df.index)
#         if df.index.tz is not None:
#             df.index = df.index.tz_localize(None)

#         # 2. Clean the trade entry time
#         trade_time = pd.to_datetime(trade['entry_time'])
#         if trade_time.tzinfo is not None:
#             trade_time = trade_time.tz_localize(None)
            
#         # 3. Slice the data to only look at the future
#         future_data = df[df.index >= trade_time]
        
#         print(f"🔍 Checking Trade {trade.get('trade_id', 'Unknown')}")
#         print(f"   -> Opened at: {trade_time}")
#         print(f"   -> Future Candles Found: {len(future_data)}")

#         if future_data.empty:
#             print("   -> ⚠️ No new market data since trade was opened.")
#             return "PENDING", None

#     except Exception as e:
#         print(f"❌ Date matching error: {e}")
#         return "ERROR", None

#     # 4. Force all prices to be numbers (Floats) to prevent string comparison errors
#     tp = float(trade['take_profit'])
#     sl = float(trade['stop_loss'])

#     for time_index, candle in future_data.iterrows():
#         high = float(candle['high'])
#         low = float(candle['low'])
        
#         if trade['decision'] == "BUY":
#             if low <= sl: 
#                 print(f"   ❌ Hit Stop Loss ({sl}) at {time_index}")
#                 return "LOSS", time_index
#             elif high >= tp: 
#                 print(f"   ✅ Hit Take Profit ({tp}) at {time_index}")
#                 return "WIN", time_index
                
#         elif trade['decision'] == "SELL":
#             if high >= sl: 
#                 print(f"   ❌ Hit Stop Loss ({sl}) at {time_index}")
#                 return "LOSS", time_index
#             elif low <= tp: 
#                 print(f"   ✅ Hit Take Profit ({tp}) at {time_index}")
#                 return "WIN", time_index

#     print("   -> Checked all candles. TP/SL not reached yet.")
#     return "PENDING", None

# def update_all_pending_trades():
#     """Triggered by views.py. Fetches chart ONCE and checks all pending trades."""
#     pending_trades = list(trades_collection.find({"status": "PENDING"}))
    
#     if not pending_trades:
#         print("🔄 No PENDING trades to check.")
#         return 0 
        
#     print(f"🔄 Found {len(pending_trades)} PENDING trades. Fetching chart...")
#     ts = td_client.time_series(symbol="XAU/USD", interval="15min", outputsize=500)
    
#     try:
#         df = ts.as_pandas().iloc[::-1]
#     except Exception as e:
#         print(f"❌ Failed to download TwelveData chart: {e}")
#         return 0

#     updated_count = 0
#     for trade in pending_trades:
#         new_status, close_time = check_trade_status_historically(trade, df)
        
#         if new_status in ["WIN", "LOSS"]:
#             trades_collection.update_one(
#                 {"_id": trade["_id"]},
#                 {"$set": {"status": new_status, "closed_at": str(close_time)}}
#             )
#             updated_count += 1
#             print(f"   💾 Saved {new_status} to Database!")
            
#     return updated_count
# import pandas as pd
# from twelvedata import TDClient
# from .models import ChartTradingAnalysis 

# td_client = TDClient(apikey="eacef76c03744c549807adadd7e2b626")

# def check_trade_status_historically(trade, df):
#     """Walks forward from entry time to see if TP/SL was hit."""
#     try:
#         trade_time = pd.to_datetime(trade.created_at)
#         if trade_time.tzinfo is not None:
#             trade_time = trade_time.tz_localize(None)
            
#         df.index = pd.to_datetime(df.index)
#         if df.index.tz is not None:
#             df.index = df.index.tz_localize(None)
            
#         future_data = df[df.index >= trade_time]
        
#         if future_data.empty:
#             return "Pending", None, None

#     except Exception as e:
#         print(f"❌ Date matching error: {e}")
#         return "ERROR", None, None

#     tp = float(trade.trade_tp)  
#     sl = float(trade.trade_sl)
#     decision = str(trade.signal).upper()

#     # Loop through the future candles chronologically
#     for time_index, candle in future_data.iterrows():
#         high = float(candle['high'])
#         low = float(candle['low'])
        
#         if decision == "BUY":
#             if low <= sl: 
#                 # Hit Stop Loss. Return "Lost", the exact candle time, and the SL price.
#                 return "Lost", time_index, sl
#             elif high >= tp: 
#                 # Hit Take Profit. Return "Won", the exact candle time, and the TP price.
#                 return "Won", time_index, tp
                
#         elif decision == "SELL":
#             if high >= sl: 
#                 return "Lost", time_index, sl
#             elif low <= tp: 
#                 return "Won", time_index, tp

#     return "Pending", None, None

# def update_all_pending_trades():
#     """Triggered by views.py. Fetches chart ONCE and checks all pending trades."""
#     pending_trades = ChartTradingAnalysis.objects.filter(accuracy_status="Pending")
    
#     if not pending_trades.exists():
#         return 0 
        
#     print(f"🔄 Found {pending_trades.count()} 'Pending' trades. Fetching chart...")
#     ts = td_client.time_series(symbol="XAU/USD", interval="15min", outputsize=500)
    
#     try:
#         df = ts.as_pandas().iloc[::-1]
#     except Exception as e:
#         print(f"❌ Failed to download TwelveData chart: {e}")
#         return 0

#     updated_count = 0
#     for trade in pending_trades:
#         # Unpack all THREE variables returned by our checker
#         new_status, close_time, hit_price = check_trade_status_historically(trade, df)
        
#         if new_status in ["Won", "Lost"]:
#             # 1. Update the status
#             trade.accuracy_status = new_status
            
#             # 2. Save the exact price where the trade closed
#             trade.exit_price = hit_price 
            
#             # 3. Save to Database
#             trade.save()
            
#             updated_count += 1
            
#             # 4. Format the time nicely for the terminal
#             formatted_time = close_time.strftime("%Y-%m-%d at %H:%M")
#             emoji = "✅" if new_status == "Won" else "❌"
            
#             print(f"   {emoji} Trade {trade.id} {new_status.upper()}!")
#             print(f"       -> Closed at Price: {hit_price}")
#             print(f"       -> Candle Date & Time: {formatted_time}")
            
#     return updated_count
import datetime
import pandas as pd
from twelvedata import TDClient
from .models import ChartTradingAnalysis 
from django.utils import timezone

td_client = TDClient(apikey="eacef76c03744c549807adadd7e2b626")

def check_trade_status_historically(trade, df):
    """Walks forward from entry time to see if TP/SL was hit."""
    try:
        # 1. Safely handle Django's UTC timestamp
        trade_time = pd.to_datetime(trade.created_at)
        if trade_time.tzinfo is not None:
            trade_time = trade_time.tz_convert('UTC').tz_localize(None)
            
        # 2. Safely handle TwelveData's timestamp
        df.index = pd.to_datetime(df.index)
        if df.index.tz is not None:
            df.index = df.index.tz_convert('UTC').tz_localize(None)
            
        # 3. 🔴 THE FIX: Round the trade time down to the current 15-min candle
        # Example: 10:22:00 becomes 10:15:00
        trade_candle_start = trade_time.floor('15min')
        
        # 4. ONLY check candles strictly AFTER the entry candle
        future_data = df[df.index > trade_candle_start]
        
        if future_data.empty:
            return "Pending", None, None

    except Exception as e:
        print(f"❌ Date matching error: {e}")
        return "ERROR", None, None

    tp = float(trade.trade_tp)  
    sl = float(trade.trade_sl)
    decision = str(trade.signal).upper()

    for time_index, candle in future_data.iterrows():
        high = float(candle['high'])
        low = float(candle['low'])
        
        if decision == "BUY":
            # Check SL first to be conservative
            if low <= sl: return "Lost", time_index, sl
            elif high >= tp: return "Won", time_index, tp
                
        elif decision == "SELL":
            if high >= sl: return "Lost", time_index, sl
            elif low <= tp: return "Won", time_index, tp

    return "Pending", None, None


def update_all_pending_trades():
    """Triggered by views.py. Fetches chart ONCE and checks all pending trades."""
    pending_trades = ChartTradingAnalysis.objects.filter(accuracy_status="Pending")
    
    if not pending_trades.exists():
        return 0 
        
    print(f"🔄 Found {pending_trades.count()} 'Pending' trades. Fetching chart...")
    
    # 🔴 THE FIX: Force TwelveData to return UTC timezone to match Django!
    ts = td_client.time_series(
        symbol="XAU/USD", 
        interval="15min", 
        outputsize=5000, 
        timezone="UTC"
    )
    
    try:
        df = ts.as_pandas().iloc[::-1]
    except Exception as e:
        print(f"❌ Failed to download TwelveData chart: {e}")
        return 0

    updated_count = 0
    for trade in pending_trades:
        new_status, close_time, hit_price = check_trade_status_historically(trade, df)
        
        if new_status in ["Won", "Lost"]:
            trade.accuracy_status = new_status
            trade.exit_price = hit_price
            
            # Convert Pandas time to Django Timezone-Aware time
            py_dt = close_time.to_pydatetime()
            if timezone.is_naive(py_dt):
                py_dt = timezone.make_aware(py_dt, datetime.timezone.utc)
                # py_dt = timezone.make_aware(py_dt, timezone.utc)
                
            trade.exit_time = py_dt
            trade.save()
            
            updated_count += 1
            
            formatted_time = py_dt.strftime("%Y-%m-%d at %H:%M UTC")
            emoji = "✅" if new_status == "Won" else "❌"
            print(f"   {emoji} Trade {trade.id} {new_status.upper()}! Closed at {hit_price} on {formatted_time}")
            
    return updated_count