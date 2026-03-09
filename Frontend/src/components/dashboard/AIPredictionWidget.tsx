// // import { useState, useMemo } from "react";
// // import { motion } from "framer-motion";
// // import { TrendingUp, TrendingDown, Minus, Brain, Zap, Target, Clock, Calendar } from "lucide-react";

// // // Latest Signals logic
// // const dummySignals = [
// //   {
// //     id: 16,
// //     module: "FUSION",
// //     signal: "BUY",
// //     confidence_score: 90.0,
// //     trade_entry: 5139.3,
// //     trade_sl: 5120.84,
// //     trade_tp: 5148.09,
// //     reasoning: "Technical=BUY (0.80), Sentiment=BULLISH (0.80), WeightedScore=0.80 The RSI is at 49.51, indicating oversold conditions. The recent history log shows a series of small candles with a slight upward trend, indicating a potential reversal. The recent support at 5122.05 and resistance at 5145.61 also suggest a potential breakout. The Bullish Divergence pattern is identified when the RSI makes a higher low while the price makes a lower low, indicating a potential reversal.",
// //     pattern: "Bullish Divergence",
// //     created_at: "2026-03-04T22:16:35.138235Z",
// //     exit_price: 5148.09,
// //     exit_time: "2026-03-04T23:00:00Z",
// //     accuracy_status: "Won"
// //   },
// //   {
// //     id: 15,
// //     module: "FUSION",
// //     signal: "BUY",
// //     confidence_score: 90.0,
// //     trade_entry: 5140.8,
// //     trade_sl: 5120.89,
// //     trade_tp: 5150.0,
// //     reasoning: "Technical=BUY (0.80), Sentiment=BULLISH (0.80), WeightedScore=0.80 The RSI is at 49.45, indicating oversold conditions. The recent history log shows a series of small candles with a slight upward trend, indicating a potential reversal. The recent support at 5122.05 and resistance at 5145.61 also suggest a potential breakout. The upper band is also close to the current price, indicating a potential bullish divergence.",
// //     pattern: "N/A",
// //     created_at: "2026-03-04T22:14:06.333922Z",
// //     exit_price: 5150.0,
// //     exit_time: "2026-03-04T23:00:00Z",
// //     accuracy_status: "Pending"
// //   },
// //   {
// //     id: 14,
// //     module: "FUSION",
// //     signal: "BUY",
// //     confidence_score: 90.0,
// //     trade_entry: 5141.0,
// //     trade_sl: 5130.0,
// //     trade_tp: 5150.0,
// //     reasoning: "Technical=BUY (0.80), Sentiment=BULLISH (0.80), WeightedScore=0.80 The RSI is at 49.59, indicating oversold conditions. The recent history log shows a series of small candles with a slight upward trend, indicating a potential reversal. The recent support at 5122.05 and resistance at 5145.61 also suggest a potential breakout. The Bullish Divergence pattern is identified when the RSI makes a lower low while the price makes a higher low, indicating a potential reversal.",
// //     pattern: "N/A",
// //     created_at: "2026-03-04T22:10:26.088602Z",
// //     exit_price: 5150.0,
// //     exit_time: "2026-03-04T23:00:00Z",
// //     accuracy_status: "Won"
// //   },
// //   {
// //     id: 13,
// //     module: "FUSION",
// //     signal: "BUY",
// //     confidence_score: 90.0,
// //     trade_entry: 5140.99,
// //     trade_sl: 5120.88,
// //     trade_tp: 5150.0,
// //     reasoning: "Technical analysis shows strong consolidation near support levels. High confidence in upward breakout.",
// //     pattern: "N/A",
// //     created_at: "2026-03-04T22:01:45.288715Z",
// //     exit_price: 5150.0,
// //     exit_time: "2026-03-04T23:00:00Z",
// //     accuracy_status: "Won"
// //   },
// //   {
// //     id: 12,
// //     module: "FUSION",
// //     signal: "BUY",
// //     confidence_score: 92.0,
// //     trade_entry: 5203.44,
// //     trade_sl: 5180.7,
// //     trade_tp: 5210.0,
// //     reasoning: "Market trend shifted unexpectedly against the long position, hitting the stop loss level.",
// //     pattern: "N/A",
// //     created_at: "2026-02-25T05:48:09.178961Z",
// //     exit_price: 5180.7,
// //     exit_time: "2026-02-25T09:00:00Z",
// //     accuracy_status: "Loss"
// //   },
// //   {
// //     id: 11,
// //     module: "FUSION",
// //     signal: "BUY",
// //     confidence_score: 92.0,
// //     trade_entry: 5147.64,
// //     trade_sl: 5130.1,
// //     trade_tp: 5172.48,
// //     reasoning: "Strong volume confirmation on the 15m chart. Automated exit at take profit target reached.",
// //     pattern: "N/A",
// //     created_at: "2026-02-24T17:05:30.697288Z",
// //     exit_price: 5172.48,
// //     exit_time: "2026-02-24T20:30:00Z",
// //     accuracy_status: "Won"
// //   },
// //   {
// //     id: 10,
// //     module: "TECHNICAL",
// //     signal: "BUY",
// //     confidence_score: 80.0,
// //     trade_entry: 5149.4,
// //     trade_sl: 5130.0,
// //     trade_tp: 5160.0,
// //     reasoning: "The RSI is at 49.83, indicating oversold conditions. The recent history log shows a series of higher lows, indicating a potential bullish trend. The recent support at 5100.80 and resistance at 5159.49 also suggest a potential breakout. The Bollinger Bands are also indicating a potential breakout, with the price trading above the upper band. Therefore, a bullish divergence pattern is identified, and a buy decision is recommended.",
// //     pattern: "Bullish Divergence",
// //     created_at: "2026-02-24T15:52:20.335329Z",
// //     exit_price: 5160.0,
// //     exit_time: "2026-02-24T17:15:00Z",
// //     accuracy_status: "Won"
// //   },
// //   {
// //     id: 9,
// //     module: "TECHNICAL",
// //     signal: "BUY",
// //     confidence_score: 80.0,
// //     trade_entry: 5152.54,
// //     trade_sl: 5106.85,
// //     trade_tp: 5191.66,
// //     reasoning: "The RSI is at 50.47, indicating a neutral market condition. However, the recent history log shows a series of higher highs and higher lows, indicating a bullish trend. Additionally, the price is trading above the lower band, suggesting that the market is in an uptrend. The bullish divergence pattern is confirmed by the fact that the price is making higher highs while the RSI is making lower highs, indicating that the market is due for a bounce.",
// //     pattern: "Bullish Divergence",
// //     created_at: "2026-02-24T15:51:17.634478Z",
// //     exit_price: 5191.66,
// //     exit_time: "2026-02-25T02:15:00Z",
// //     accuracy_status: "Pending"
// //   },
// //   {
// //     id: 8,
// //     module: "TECHNICAL",
// //     signal: "BUY",
// //     confidence_score: 80.0,
// //     trade_entry: 5154.05,
// //     trade_sl: 5106.89,
// //     trade_tp: 5191.76,
// //     reasoning: "The RSI is at 51.16, indicating a potential oversold condition. The recent history log shows a series of higher lows, indicating a bullish trend. The recent support at 5100.80 and resistance at 5159.49 also suggest a potential breakout. Additionally, the Bollinger Bands are tightening, indicating increased volatility. The Bullish Divergence pattern is identified when the price makes a lower low while the RSI makes a higher low, indicating a potential reversal.",
// //     pattern: "Bullish Divergence",
// //     created_at: "2026-02-24T15:50:01.213912Z",
// //     exit_price: 5191.76,
// //     exit_time: "2026-02-25T02:15:00Z",
// //     accuracy_status: "Won"
// //   },
// //   {
// //     id: 7,
// //     module: "TECHNICAL",
// //     signal: "BUY",
// //     confidence_score: 80.0,
// //     trade_entry: 5154.09,
// //     trade_sl: 5106.9,
// //     trade_tp: 5191.77,
// //     reasoning: "The RSI is at 51.18, indicating a potential oversold condition. The recent history log shows a series of higher lows, indicating a bullish trend. Additionally, the price is trading above the lower band, suggesting a potential breakout. The recent support level of 5100.80 is also a potential entry point. The bullish divergence pattern is identified, indicating a potential buy signal.",
// //     pattern: "Bullish Divergence",
// //     created_at: "2026-02-24T15:48:58.555936Z",
// //     exit_price: 5191.77,
// //     exit_time: "2026-02-25T02:15:00Z",
// //     accuracy_status: "Won"
// //   },
// //   {
// //     id: 6,
// //     module: "TECHNICAL",
// //     signal: "BUY",
// //     confidence_score: 80.0,
// //     trade_entry: 5177.9,
// //     trade_sl: 5165.8,
// //     trade_tp: 5190.42,
// //     reasoning: "The RSI is at 44.62, indicating oversold conditions. The recent history log shows a series of higher lows, indicating a potential bullish trend. The Bullish Divergence pattern is identified when the price makes a lower low while the RSI makes a higher low. However, the price hit stop loss before moving towards the target.",
// //     pattern: "Bullish Divergence",
// //     created_at: "2026-02-24T05:53:22.129950Z",
// //     exit_price: 5165.8,
// //     exit_time: "2026-02-24T06:30:00Z",
// //     accuracy_status: "Loss"
// //   },
// //   {
// //     id: 5,
// //     module: "TECHNICAL",
// //     signal: "BUY",
// //     confidence_score: 80.0,
// //     trade_entry: 5177.39,
// //     trade_sl: 5160.08,
// //     trade_tp: 5190.38,
// //     reasoning: "The RSI is at 44.26, indicating oversold conditions. The recent history log shows a series of higher lows, indicating a potential bullish trend. Market volatility triggered the stop loss prematurely.",
// //     pattern: "Bullish Divergence",
// //     created_at: "2026-02-24T05:52:20.689531Z",
// //     exit_price: 5160.08,
// //     exit_time: "2026-02-24T06:30:00Z",
// //     accuracy_status: "Loss"
// //   },
// //   {
// //     id: 4,
// //     module: "TECHNICAL",
// //     signal: "BUY",
// //     confidence_score: 80.0,
// //     trade_entry: 5234.36,
// //     trade_sl: 5194.58,
// //     trade_tp: 5237.62,
// //     reasoning: "The RSI is at 71.72, indicating overbought conditions. However, the price is still trading above the recent support level of 5205.48. The Bullish Divergence pattern is identified when the price makes a higher high, but the RSI fails to make a new high, indicating a potential reversal.",
// //     pattern: "Bullish Divergence",
// //     created_at: "2026-02-23T21:11:35.037450Z",
// //     exit_price: 5237.62,
// //     exit_time: "2026-02-23T23:00:00Z",
// //     accuracy_status: "Won"
// //   },
// //   {
// //     id: 3,
// //     module: "TECHNICAL",
// //     signal: "BUY",
// //     confidence_score: 80.0,
// //     trade_entry: 5235.44,
// //     trade_sl: 5194.41,
// //     trade_tp: 5237.62,
// //     reasoning: "The RSI is overbought at 72.89, but the price is still trading above the upper Bollinger Band. The recent history log shows a series of higher highs and higher lows, indicating a bullish trend. Bullish Divergence pattern confirmed.",
// //     pattern: "Bullish Divergence",
// //     created_at: "2026-02-23T21:10:32.488584Z",
// //     exit_price: 5237.62,
// //     exit_time: "2026-02-23T23:00:00Z",
// //     accuracy_status: "Won"
// //   },
// //   {
// //     id: 2,
// //     module: "Ensemble Engine",
// //     signal: "BUY",
// //     confidence_score: 85.0,
// //     trade_entry: 2050.5,
// //     trade_sl: 2040.0,
// //     trade_tp: 2060.0,
// //     reasoning: "Testing the automated predictive loop. Ensemble agreement high on upward movement.",
// //     pattern: "Bullish",
// //     created_at: "2026-02-23T20:52:50.067446Z",
// //     exit_price: 2060.0,
// //     exit_time: "2026-02-23T21:00:00Z",
// //     accuracy_status: "Won"
// //   },
// //   {
// //     id: 1,
// //     module: "Ensemble Engine",
// //     signal: "BUY",
// //     confidence_score: 85.0,
// //     trade_entry: 2050.5,
// //     trade_sl: 2040.0,
// //     trade_tp: 2060.0,
// //     reasoning: "Initial system test of the automated predictive loop. Confirmed winning trade on exit.",
// //     pattern: "Bullish",
// //     created_at: "2026-02-23T20:51:50.020957Z",
// //     exit_price: 2060.0,
// //     exit_time: "2026-02-23T21:00:00Z",
// //     accuracy_status: "Won"
// //   }
// // ];

// // // Prop mein onSelect function add kiya hai
// // export const AIPredictionWidget = ({ onSelectSignal }: { onSelectSignal: (signal: any) => void }) => {

// //   // Date & Time prominent formatting
// //   const formatDate = (dateStr: string) => {
// //     return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
// //   };

// //   const formatTime = (dateStr: string) => {
// //     return new Date(dateStr).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
// //   };

// //   const latestPrediction = useMemo(() => {
// //     const pending = dummySignals.find(s => s.accuracy_status === "Pending");
// //     return pending || dummySignals[0];
// //   }, []);

// //   const stanceConfig = {
// //     BUY: { icon: TrendingUp, color: "#10B981", bgColor: "bg-neon-green/10", borderColor: "border-neon-green/30" },
// //     SELL: { icon: TrendingDown, color: "#F43F5E", bgColor: "bg-neon-red/10", borderColor: "border-neon-red/30" },
// //     HOLD: { icon: Minus, color: "#F59E0B", bgColor: "bg-neon-amber/10", borderColor: "border-neon-amber/30" },
// //   };

// //   const config = stanceConfig[latestPrediction.signal as keyof typeof stanceConfig];
// //   const Icon = config.icon;

// //   return (
// //     <div 
// //       onClick={() => onSelectSignal(latestPrediction)}
// //       className="glass-card p-6 gradient-border relative overflow-hidden h-full flex flex-col justify-between cursor-pointer group active:scale-[0.98] transition-all duration-300"
// //     >
// //       {/* Background Ambient Glow */}
// //       <div className="absolute -right-20 -top-20 w-40 h-40 rounded-full blur-[100px] opacity-20 transition-all duration-1000" style={{ backgroundColor: config.color }} />

// //       {/* Header */}
// //       <div className="flex items-center justify-between mb-4 relative z-10">
// //         <div className="flex items-center gap-3">
// //           <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
// //             <Brain className="w-5 h-5 text-primary" />
// //           </div>
// //           <h3 className="text-xs font-black text-white italic tracking-tight uppercase">Prediction</h3>
// //         </div>
// //         <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 border border-white/10">
// //           <Zap className="w-2.5 h-2.5 text-primary animate-pulse" />
// //           <span className="text-[9px] font-black text-primary uppercase italic">Live AI</span>
// //         </div>
// //       </div>

// //       {/* PROMINENT DATE & TIME BAR */}
// //       <div className="relative z-10 flex items-center justify-between bg-white/5 border border-white/5 rounded-2xl px-5 py-3 mb-6">
// //         <div className="flex items-center gap-2">
// //           <Calendar size={14} className="text-primary" />
// //           <span className="text-[11px] font-black text-white uppercase tracking-tighter">{formatDate(latestPrediction.created_at)}</span>
// //         </div>
// //         <div className="flex items-center gap-2">
// //           <Clock size={14} className="text-primary" />
// //           <span className="text-[11px] font-black text-white uppercase tracking-tighter">{formatTime(latestPrediction.created_at)}</span>
// //         </div>
// //       </div>

// //       {/* Main Signal Display */}
// //       <div className="relative z-10 flex-1 flex flex-col justify-center space-y-6">
// //         <div className="text-center">
// //           <div className={`inline-flex items-center gap-6 px-10 py-4 rounded-[2.5rem] border-2 transition-all duration-500 ${config.bgColor} ${config.borderColor} group-hover:scale-105`}>
// //             <Icon className="w-12 h-12" style={{ color: config.color }} />
// //             <div className="text-left">
// //               <span className="block text-[8px] text-muted-foreground uppercase font-black tracking-widest mb-1">Current Stance</span>
// //               <span className="text-5xl font-black italic tracking-tighter" style={{ color: config.color }}>{latestPrediction.signal}</span>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Prices Row */}
// //         <div className="grid grid-cols-2 gap-3">
// //           <div className="bg-white/5 p-4 rounded-3xl border border-white/5">
// //             <span className="text-[8px] font-black text-muted-foreground uppercase block mb-1">Entry Price</span>
// //             <p className="text-lg font-mono font-black text-white">${latestPrediction.trade_entry.toLocaleString()}</p>
// //           </div>
// //           <div className="bg-white/5 p-4 rounded-3xl border border-white/5">
// //             <span className="text-[8px] font-black text-muted-foreground uppercase block mb-1">Target TP</span>
// //             <p className="text-lg font-mono font-black text-primary">${latestPrediction.trade_tp.toLocaleString()}</p>
// //           </div>
// //         </div>

// //         {/* Confidence */}
// //         <div className="space-y-2">
// //           <div className="flex justify-between items-end px-1">
// //             <span className="text-[8px] font-black text-muted-foreground uppercase tracking-widest ">Neural Accuracy</span>
// //             <span className="text-xs font-black" style={{ color: config.color }}>{latestPrediction.confidence_score}%</span>
// //           </div>
// //           <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
// //             <motion.div initial={{ width: 0 }} animate={{ width: `${latestPrediction.confidence_score}%` }} className="h-full rounded-full" style={{ backgroundColor: config.color }} />
// //           </div>
// //         </div>
// //       </div>

// //       <div className="mt-4 text-center">
// //          <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-[0.2em] group-hover:text-primary transition-colors italic">Tap to Expand Full Technical Analysis</p>
// //       </div>
// //     </div>
// //   );
// // };


// import { useState, useMemo } from "react";
// import { motion } from "framer-motion";
// import { TrendingUp, TrendingDown, Minus, Brain, Zap, Target, Clock, Calendar } from "lucide-react";

// // Latest Signals logic
// export const dummySignals = [
//   {
//     id: 16,
//     module: "FUSION",
//     signal: "BUY",
//     confidence_score: 91.0,
//     market_situation: "secure",
//     trade_entry: 5139.3,
//     trade_sl: 5120.84,
//     trade_tp: 5148.09,
//     reasoning: "Technical=BUY (0.80), Sentiment=BULLISH (0.80), WeightedScore=0.80 The RSI is at 49.51, indicating oversold conditions. The recent history log shows a series of small candles with a slight upward trend, indicating a potential reversal. The recent support at 5122.05 and resistance at 5145.61 also suggest a potential breakout. The Bullish Divergence pattern is identified when the RSI makes a higher low while the price makes a lower low, indicating a potential reversal.",
//     pattern: "Bullish Divergence",
//     created_at: "2026-03-04T22:16:35.138235Z",
//     exit_price: 5148.09,
//     exit_time: "2026-03-04T23:00:00Z",
//     accuracy_status: "Won"
//   },
//   {
//     id: 15,
//     module: "FUSION",
//     signal: "BUY",
//     confidence_score: 90.0,
//     market_situation: "caution",
//     trade_entry: 5140.8,
//     trade_sl: 5120.89,
//     trade_tp: 5150.0,
//     reasoning: "Technical=BUY (0.80), Sentiment=BULLISH (0.80), WeightedScore=0.80 The RSI is at 49.45, indicating oversold conditions. The recent history log shows a series of small candles with a slight upward trend, indicating a potential reversal. The recent support at 5122.05 and resistance at 5145.61 also suggest a potential breakout. The upper band is also close to the current price, indicating a potential bullish divergence.",
//     pattern: "N/A",
//     created_at: "2026-03-04T22:14:06.333922Z",
//     exit_price: 5150.0,
//     exit_time: "2026-03-04T23:00:00Z",
//     accuracy_status: "Pending"
//   },
//   {
//     id: 14,
//     module: "FUSION",
//     signal: "BUY",
//     confidence_score: 90.0,
//     market_situation: "secure",
//     trade_entry: 5141.0,
//     trade_sl: 5130.0,
//     trade_tp: 5150.0,
//     reasoning: "Technical=BUY (0.80), Sentiment=BULLISH (0.80), WeightedScore=0.80 The RSI is at 49.59, indicating oversold conditions. The recent history log shows a series of small candles with a slight upward trend, indicating a potential reversal. The recent support at 5122.05 and resistance at 5145.61 also suggest a potential breakout. The Bullish Divergence pattern is identified when the RSI makes a lower low while the price makes a higher low, indicating a potential reversal.",
//     pattern: "N/A",
//     created_at: "2026-03-04T22:10:26.088602Z",
//     exit_price: 5150.0,
//     exit_time: "2026-03-04T23:00:00Z",
//     accuracy_status: "Won"
//   },
//   {
//     id: 13,
//     module: "FUSION",
//     signal: "BUY",
//     confidence_score: 90.0,
//     market_situation: "secure",
//     trade_entry: 5140.99,
//     trade_sl: 5120.88,
//     trade_tp: 5150.0,
//     reasoning: "Technical analysis shows strong consolidation near support levels. High confidence in upward breakout.",
//     pattern: "N/A",
//     created_at: "2026-03-04T22:01:45.288715Z",
//     exit_price: 5150.0,
//     exit_time: "2026-03-04T23:00:00Z",
//     accuracy_status: "Won"
//   },
//   {
//     id: 12,
//     module: "FUSION",
//     signal: "BUY",
//     confidence_score: 92.0,
//     market_situation: "dangerous",
//     trade_entry: 5203.44,
//     trade_sl: 5180.7,
//     trade_tp: 5210.0,
//     reasoning: "Market trend shifted unexpectedly against the long position, hitting the stop loss level.",
//     pattern: "N/A",
//     created_at: "2026-02-25T05:48:09.178961Z",
//     exit_price: 5180.7,
//     exit_time: "2026-02-25T09:00:00Z",
//     accuracy_status: "Loss"
//   },
//   {
//     id: 11,
//     module: "FUSION",
//     signal: "BUY",
//     confidence_score: 92.0,
//     market_situation: "secure",
//     trade_entry: 5147.64,
//     trade_sl: 5130.1,
//     trade_tp: 5172.48,
//     reasoning: "Strong volume confirmation on the 15m chart. Automated exit at take profit target reached.",
//     pattern: "N/A",
//     created_at: "2026-02-24T17:05:30.697288Z",
//     exit_price: 5172.48,
//     exit_time: "2026-02-24T20:30:00Z",
//     accuracy_status: "Won"
//   },
//   {
//     id: 10,
//     module: "TECHNICAL",
//     signal: "BUY",
//     confidence_score: 80.0,
//     market_situation: "caution",
//     trade_entry: 5149.4,
//     trade_sl: 5130.0,
//     trade_tp: 5160.0,
//     reasoning: "The RSI is at 49.83, indicating oversold conditions. The recent history log shows a series of higher lows, indicating a potential bullish trend. The recent support at 5100.80 and resistance at 5159.49 also suggest a potential breakout. The Bollinger Bands are also indicating a potential breakout, with the price trading above the upper band. Therefore, a bullish divergence pattern is identified, and a buy decision is recommended.",
//     pattern: "Bullish Divergence",
//     created_at: "2026-02-24T15:52:20.335329Z",
//     exit_price: 5160.0,
//     exit_time: "2026-02-24T17:15:00Z",
//     accuracy_status: "Won"
//   },
//   {
//     id: 9,
//     module: "TECHNICAL",
//     signal: "BUY",
//     confidence_score: 80.0,
//     market_situation: "secure",
//     trade_entry: 5152.54,
//     trade_sl: 5106.85,
//     trade_tp: 5191.66,
//     reasoning: "The RSI is at 50.47, indicating a neutral market condition. However, the recent history log shows a series of higher highs and higher lows, indicating a bullish trend. Additionally, the price is trading above the lower band, suggesting that the market is in an uptrend. The bullish divergence pattern is confirmed by the fact that the price is making higher highs while the RSI is making lower highs, indicating that the market is due for a bounce.",
//     pattern: "Bullish Divergence",
//     created_at: "2026-02-24T15:51:17.634478Z",
//     exit_price: 5191.66,
//     exit_time: "2026-02-25T02:15:00Z",
//     accuracy_status: "Pending"
//   },
//   {
//     id: 8,
//     module: "TECHNICAL",
//     signal: "BUY",
//     confidence_score: 80.0,
//     market_situation: "secure",
//     trade_entry: 5154.05,
//     trade_sl: 5106.89,
//     trade_tp: 5191.76,
//     reasoning: "The RSI is at 51.16, indicating a potential oversold condition. The recent history log shows a series of higher lows, indicating a bullish trend. The recent support at 5100.80 and resistance at 5159.49 also suggest a potential breakout. Additionally, the Bollinger Bands are tightening, indicating increased volatility. The Bullish Divergence pattern is identified when the price makes a lower low while the RSI makes a higher low, indicating a potential reversal.",
//     pattern: "Bullish Divergence",
//     created_at: "2026-02-24T15:50:01.213912Z",
//     exit_price: 5191.76,
//     exit_time: "2026-02-25T02:15:00Z",
//     accuracy_status: "Won"
//   },
//   {
//     id: 7,
//     module: "TECHNICAL",
//     signal: "BUY",
//     confidence_score: 80.0,
//     market_situation: "secure",
//     trade_entry: 5154.09,
//     trade_sl: 5106.9,
//     trade_tp: 5191.77,
//     reasoning: "The RSI is at 51.18, indicating a potential oversold condition. The recent history log shows a series of higher lows, indicating a bullish trend. Additionally, the price is trading above the lower band, suggesting a potential breakout. The recent support level of 5100.80 is also a potential entry point. The bullish divergence pattern is identified, indicating a potential buy signal.",
//     pattern: "Bullish Divergence",
//     created_at: "2026-02-24T15:48:58.555936Z",
//     exit_price: 5191.77,
//     exit_time: "2026-02-25T02:15:00Z",
//     accuracy_status: "Won"
//   },
//   {
//     id: 6,
//     module: "TECHNICAL",
//     signal: "BUY",
//     confidence_score: 80.0,
//     market_situation: "dangerous",
//     trade_entry: 5177.9,
//     trade_sl: 5165.8,
//     trade_tp: 5190.42,
//     reasoning: "The RSI is at 44.62, indicating oversold conditions. The recent history log shows a series of higher lows, indicating a potential bullish trend. The Bullish Divergence pattern is identified when the price makes a lower low while the RSI makes a higher low. However, the price hit stop loss before moving towards the target.",
//     pattern: "Bullish Divergence",
//     created_at: "2026-02-24T05:53:22.129950Z",
//     exit_price: 5165.8,
//     exit_time: "2026-02-24T06:30:00Z",
//     accuracy_status: "Loss"
//   },
//   {
//     id: 5,
//     module: "TECHNICAL",
//     signal: "BUY",
//     confidence_score: 80.0,
//     market_situation: "dangerous",
//     trade_entry: 5177.39,
//     trade_sl: 5160.08,
//     trade_tp: 5190.38,
//     reasoning: "The RSI is at 44.26, indicating oversold conditions. The recent history log shows a series of higher lows, indicating a potential bullish trend. Market volatility triggered the stop loss prematurely.",
//     pattern: "Bullish Divergence",
//     created_at: "2026-02-24T05:52:20.689531Z",
//     exit_price: 5160.08,
//     exit_time: "2026-02-24T06:30:00Z",
//     accuracy_status: "Loss"
//   },
//   {
//     id: 4,
//     module: "TECHNICAL",
//     signal: "BUY",
//     confidence_score: 80.0,
//     market_situation: "secure",
//     trade_entry: 5234.36,
//     trade_sl: 5194.58,
//     trade_tp: 5237.62,
//     reasoning: "The RSI is at 71.72, indicating overbought conditions. However, the price is still trading above the recent support level of 5205.48. The Bullish Divergence pattern is identified when the price makes a higher high, but the RSI fails to make a new high, indicating a potential reversal.",
//     pattern: "Bullish Divergence",
//     created_at: "2026-02-23T21:11:35.037450Z",
//     exit_price: 5237.62,
//     exit_time: "2026-02-23T23:00:00Z",
//     accuracy_status: "Won"
//   },
//   {
//     id: 3,
//     module: "TECHNICAL",
//     signal: "BUY",
//     confidence_score: 80.0,
//     market_situation: "secure",
//     trade_entry: 5235.44,
//     trade_sl: 5194.41,
//     trade_tp: 5237.62,
//     reasoning: "The RSI is overbought at 72.89, but the price is still trading above the upper Bollinger Band. The recent history log shows a series of higher highs and higher lows, indicating a bullish trend. Bullish Divergence pattern confirmed.",
//     pattern: "Bullish Divergence",
//     created_at: "2026-02-23T21:10:32.488584Z",
//     exit_price: 5237.62,
//     exit_time: "2026-02-23T23:00:00Z",
//     accuracy_status: "Won"
//   },
//   {
//     id: 2,
//     module: "Ensemble Engine",
//     signal: "BUY",
//     confidence_score: 85.0,
//     market_situation: "secure",
//     trade_entry: 2050.5,
//     trade_sl: 2040.0,
//     trade_tp: 2060.0,
//     reasoning: "Testing the automated predictive loop. Ensemble agreement high on upward movement.",
//     pattern: "Bullish",
//     created_at: "2026-02-23T20:52:50.067446Z",
//     exit_price: 2060.0,
//     exit_time: "2026-02-23T21:00:00Z",
//     accuracy_status: "Won"
//   },
//   {
//     id: 1,
//     module: "Ensemble Engine",
//     signal: "BUY",
//     confidence_score: 85.0,
//     market_situation: "secure",
//     trade_entry: 2050.5,
//     trade_sl: 2040.0,
//     trade_tp: 2060.0,
//     reasoning: "Initial system test of the automated predictive loop. Confirmed winning trade on exit.",
//     pattern: "Bullish",
//     created_at: "2026-02-23T20:51:50.020957Z",
//     exit_price: 2060.0,
//     exit_time: "2026-02-23T21:00:00Z",
//     accuracy_status: "Won"
//   }
// ];

// export const AIPredictionWidget = ({ onSelectSignal }: { onSelectSignal: (signal: any) => void }) => {

//   // Prominent Date/Time helpers
//   const formatDate = (dateStr: string) => new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
//   const formatTime = (dateStr: string) => new Date(dateStr).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

//   // FIXED LOGIC: Database-ready sorting and filtering
//   const latestPrediction = useMemo(() => {
//     // 1. Array ko hamesha latest ID aur Time par sort karein (Descending)
//     const sortedData = [...dummySignals].sort((a, b) => {
//       if (b.id !== a.id) return b.id - a.id;
//       return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
//     });

//     // 2. Pehle check karein agar koi "Pending" trade hai (kyunki ye live prediction hai)
//     const pendingTrade = sortedData.find(s => s.accuracy_status === "Pending");

//     // 3. Agar Pending mil jaye toh wo, warna array ki bilkul latest trade dikhayen
//     return pendingTrade || sortedData[0];
//   }, []);

//   const stanceConfig = {
//     BUY: { icon: TrendingUp, color: "#10B981", bgColor: "bg-neon-green/10", borderColor: "border-neon-green/30" },
//     SELL: { icon: TrendingDown, color: "#F43F5E", bgColor: "bg-neon-red/10", borderColor: "border-neon-red/30" },
//     HOLD: { icon: Minus, color: "#F59E0B", bgColor: "bg-neon-amber/10", borderColor: "border-neon-amber/30" },
//   };

//   const config = stanceConfig[latestPrediction.signal as keyof typeof stanceConfig];
//   const Icon = config.icon;

//   return (
//     <div 
//       onClick={() => onSelectSignal(latestPrediction)}
//       className="glass-card p-6 gradient-border relative overflow-hidden h-full flex flex-col justify-between cursor-pointer group active:scale-[0.98] transition-all duration-300"
//     >
//       <div className="absolute -right-20 -top-20 w-40 h-40 rounded-full blur-[100px] opacity-20 transition-all" style={{ backgroundColor: config.color }} />

//       <div className="flex items-center justify-between mb-4 relative z-10">
//         <div className="flex items-center gap-3">
//           <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
//             <Brain className="w-5 h-5 text-primary" />
//           </div>
//           <h3 className="text-xs font-black text-white italic tracking-tight uppercase">Intelligence Feed</h3>
//         </div>
//         <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 border border-white/10">
//           <Zap className="w-2.5 h-2.5 text-primary animate-pulse" />
//           <span className="text-[9px] font-black text-primary uppercase italic">Live Engine</span>
//         </div>
//       </div>

//       {/* PROMINENT DATE & TIME BAR */}
//       <div className="relative z-10 flex items-center justify-between bg-white/5 border border-white/5 rounded-2xl px-5 py-3 mb-6 shadow-xl">
//         <div className="flex items-center gap-2">
//           <Calendar size={14} className="text-primary" />
//           <span className="text-[11px] font-black text-white uppercase tracking-tighter">{formatDate(latestPrediction.created_at)}</span>
//         </div>
//         <div className="flex items-center gap-2 border-l border-white/10 pl-4">
//           <Clock size={14} className="text-primary" />
//           <span className="text-[11px] font-black text-white uppercase tracking-tighter">{formatTime(latestPrediction.created_at)}</span>
//         </div>
//       </div>

//       <div className="relative z-10 flex-1 flex flex-col justify-center space-y-6">
//         <div className="text-center">
//           <div className={`inline-flex items-center gap-6 px-10 py-4 rounded-[2.5rem] border-2 transition-all ${config.bgColor} ${config.borderColor} group-hover:scale-105 shadow-2xl`}>
//             <Icon className="w-12 h-12" style={{ color: config.color }} />
//             <div className="text-left">
//               <span className="block text-[8px] text-muted-foreground uppercase font-black tracking-widest mb-1">Signal Status</span>
//               <span className="text-5xl font-black italic tracking-tighter" style={{ color: config.color }}>{latestPrediction.signal}</span>
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-2 gap-3">
//           <div className="bg-white/5 p-4 rounded-3xl border border-white/5 group-hover:border-white/10 transition-colors">
//             <span className="text-[8px] font-black text-muted-foreground uppercase block mb-1">Entry Price</span>
//             <p className="text-lg font-mono font-black text-white">${latestPrediction.trade_entry.toLocaleString()}</p>
//           </div>
//           <div className="bg-white/5 p-4 rounded-3xl border border-white/5 group-hover:border-white/10 transition-colors">
//             <span className="text-[8px] font-black text-muted-foreground uppercase block mb-1">Target Limit</span>
//             <p className="text-lg font-mono font-black text-primary">${latestPrediction.trade_tp.toLocaleString()}</p>
//           </div>
//         </div>

//         <div className="space-y-2">
//           <div className="flex justify-between items-end px-1">
//             <span className="text-[8px] font-black text-muted-foreground uppercase tracking-widest">Neural Accuracy</span>
//             <span className="text-xs font-black" style={{ color: config.color }}>{latestPrediction.confidence_score}%</span>
//           </div>
//           <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
//             <motion.div initial={{ width: 0 }} animate={{ width: `${latestPrediction.confidence_score}%` }} transition={{ duration: 1.5, ease: "easeOut" }} className="h-full rounded-full" style={{ backgroundColor: config.color, boxShadow: `0 0 10px ${config.color}` }} />
//           </div>
//         </div>
//       </div>

//       <div className="mt-4 text-center">
//          <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-[0.2em] group-hover:text-primary transition-colors italic">Analyze Signal Registry Matrix</p>
//       </div>
//     </div>
//   );
// };


import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus, Brain, Zap, Target, Clock, Calendar, CheckCircle2 } from "lucide-react";

// Interface for type safety
export interface Signal {
  id: number;
  module: string;
  signal: "BUY" | "SELL";
  confidence_score: number;
  market_situation: "secure" | "caution" | "dangerous";
  trade_entry: number;
  trade_sl: number;
  trade_tp: number;
  reasoning: string;
  pattern: string;
  created_at: string;
  exit_price?: number;
  exit_time?: string;
  accuracy_status: "Won" | "Loss" | "Pending";
}

// 1. Data ko Widget ke andar hi rakh diya taake "kuch show na hone" wala masla hal ho jaye
export const dummySignals: Signal[] = [
  {
    id: 16,
    module: "FUSION",
    signal: "BUY",
    confidence_score: 97.0,
    market_situation: "secure",
    trade_entry: 5139.3,
    trade_sl: 5120.84,
    trade_tp: 5148.09,
    reasoning: "Technical=BUY (0.80), Sentiment=BULLISH (0.80), WeightedScore=0.80 The RSI is at 49.51, indicating oversold conditions. The recent history log shows a series of small candles with a slight upward trend, indicating a potential reversal. The recent support at 5122.05 and resistance at 5145.61 also suggest a potential breakout. The Bullish Divergence pattern is identified when the RSI makes a higher low while the price makes a lower low, indicating a potential reversal.",
    pattern: "Bullish Divergence",
    created_at: "2026-03-04T22:16:35.138235Z",
    exit_price: 5148.09,
    exit_time: "2026-03-04T23:00:00Z",
    accuracy_status: "Won"
  },
  {
    id: 15,
    module: "FUSION",
    signal: "BUY",
    confidence_score: 90.0,
    market_situation: "caution",
    trade_entry: 5140.8,
    trade_sl: 5120.89,
    trade_tp: 5150.0,
    reasoning: "Technical=BUY (0.80), Sentiment=BULLISH (0.80), WeightedScore=0.80 The RSI is at 49.45, indicating oversold conditions. The recent history log shows a series of small candles with a slight upward trend, indicating a potential reversal. The recent support at 5122.05 and resistance at 5145.61 also suggest a potential breakout. The upper band is also close to the current price, indicating a potential bullish divergence.",
    pattern: "N/A",
    created_at: "2026-03-04T22:14:06.333922Z",
    exit_price: 5150.0,
    exit_time: "2026-03-04T23:00:00Z",
    accuracy_status: "Pending"
  },
  {
    id: 14,
    module: "FUSION",
    signal: "BUY",
    confidence_score: 90.0,
    market_situation: "secure",
    trade_entry: 5141.0,
    trade_sl: 5130.0,
    trade_tp: 5150.0,
    reasoning: "Technical=BUY (0.80), Sentiment=BULLISH (0.80), WeightedScore=0.80 The RSI is at 49.59, indicating oversold conditions. The recent history log shows a series of small candles with a slight upward trend, indicating a potential reversal. The recent support at 5122.05 and resistance at 5145.61 also suggest a potential breakout. The Bullish Divergence pattern is identified when the RSI makes a lower low while the price makes a higher low, indicating a potential reversal.",
    pattern: "N/A",
    created_at: "2026-03-04T22:10:26.088602Z",
    exit_price: 5150.0,
    exit_time: "2026-03-04T23:00:00Z",
    accuracy_status: "Won"
  },
  {
    id: 13,
    module: "FUSION",
    signal: "BUY",
    confidence_score: 90.0,
    market_situation: "secure",
    trade_entry: 5140.99,
    trade_sl: 5120.88,
    trade_tp: 5150.0,
    reasoning: "Technical analysis shows strong consolidation near support levels. High confidence in upward breakout.",
    pattern: "N/A",
    created_at: "2026-03-04T22:01:45.288715Z",
    exit_price: 5150.0,
    exit_time: "2026-03-04T23:00:00Z",
    accuracy_status: "Won"
  },
  {
    id: 12,
    module: "FUSION",
    signal: "BUY",
    confidence_score: 92.0,
    market_situation: "dangerous",
    trade_entry: 5203.44,
    trade_sl: 5180.7,
    trade_tp: 5210.0,
    reasoning: "Market trend shifted unexpectedly against the long position, hitting the stop loss level.",
    pattern: "N/A",
    created_at: "2026-02-25T05:48:09.178961Z",
    exit_price: 5180.7,
    exit_time: "2026-02-25T09:00:00Z",
    accuracy_status: "Loss"
  },
  {
    id: 11,
    module: "FUSION",
    signal: "BUY",
    confidence_score: 92.0,
    market_situation: "secure",
    trade_entry: 5147.64,
    trade_sl: 5130.1,
    trade_tp: 5172.48,
    reasoning: "Strong volume confirmation on the 15m chart. Automated exit at take profit target reached.",
    pattern: "N/A",
    created_at: "2026-02-24T17:05:30.697288Z",
    exit_price: 5172.48,
    exit_time: "2026-02-24T20:30:00Z",
    accuracy_status: "Won"
  },
  {
    id: 10,
    module: "TECHNICAL",
    signal: "BUY",
    confidence_score: 80.0,
    market_situation: "caution",
    trade_entry: 5149.4,
    trade_sl: 5130.0,
    trade_tp: 5160.0,
    reasoning: "The RSI is at 49.83, indicating oversold conditions. The recent history log shows a series of higher lows, indicating a potential bullish trend. The recent support at 5100.80 and resistance at 5159.49 also suggest a potential breakout. The Bollinger Bands are also indicating a potential breakout, with the price trading above the upper band. Therefore, a bullish divergence pattern is identified, and a buy decision is recommended.",
    pattern: "Bullish Divergence",
    created_at: "2026-02-24T15:52:20.335329Z",
    exit_price: 5160.0,
    exit_time: "2026-02-24T17:15:00Z",
    accuracy_status: "Won"
  },
  {
    id: 9,
    module: "TECHNICAL",
    signal: "BUY",
    confidence_score: 80.0,
    market_situation: "secure",
    trade_entry: 5152.54,
    trade_sl: 5106.85,
    trade_tp: 5191.66,
    reasoning: "The RSI is at 50.47, indicating a neutral market condition. However, the recent history log shows a series of higher highs and higher lows, indicating a bullish trend. Additionally, the price is trading above the lower band, suggesting that the market is in an uptrend. The bullish divergence pattern is confirmed by the fact that the price is making higher highs while the RSI is making lower highs, indicating that the market is due for a bounce.",
    pattern: "Bullish Divergence",
    created_at: "2026-02-24T15:51:17.634478Z",
    exit_price: 5191.66,
    exit_time: "2026-02-25T02:15:00Z",
    accuracy_status: "Pending"
  },
  {
    id: 8,
    module: "TECHNICAL",
    signal: "BUY",
    confidence_score: 80.0,
    market_situation: "secure",
    trade_entry: 5154.05,
    trade_sl: 5106.89,
    trade_tp: 5191.76,
    reasoning: "The RSI is at 51.16, indicating a potential oversold condition. The recent history log shows a series of higher lows, indicating a bullish trend. The recent support at 5100.80 and resistance at 5159.49 also suggest a potential breakout. Additionally, the Bollinger Bands are tightening, indicating increased volatility. The Bullish Divergence pattern is identified when the price makes a lower low while the RSI makes a higher low, indicating a potential reversal.",
    pattern: "Bullish Divergence",
    created_at: "2026-02-24T15:50:01.213912Z",
    exit_price: 5191.76,
    exit_time: "2026-02-25T02:15:00Z",
    accuracy_status: "Won"
  },
  {
    id: 7,
    module: "TECHNICAL",
    signal: "BUY",
    confidence_score: 80.0,
    market_situation: "secure",
    trade_entry: 5154.09,
    trade_sl: 5106.9,
    trade_tp: 5191.77,
    reasoning: "The RSI is at 51.18, indicating a potential oversold condition. The recent history log shows a series of higher lows, indicating a bullish trend. Additionally, the price is trading above the lower band, suggesting a potential breakout. The recent support level of 5100.80 is also a potential entry point. The bullish divergence pattern is identified, indicating a potential buy signal.",
    pattern: "Bullish Divergence",
    created_at: "2026-02-24T15:48:58.555936Z",
    exit_price: 5191.77,
    exit_time: "2026-02-25T02:15:00Z",
    accuracy_status: "Won"
  },
  {
    id: 6,
    module: "TECHNICAL",
    signal: "BUY",
    confidence_score: 80.0,
    market_situation: "dangerous",
    trade_entry: 5177.9,
    trade_sl: 5165.8,
    trade_tp: 5190.42,
    reasoning: "The RSI is at 44.62, indicating oversold conditions. The recent history log shows a series of higher lows, indicating a potential bullish trend. The Bullish Divergence pattern is identified when the price makes a lower low while the RSI makes a higher low. However, the price hit stop loss before moving towards the target.",
    pattern: "Bullish Divergence",
    created_at: "2026-02-24T05:53:22.129950Z",
    exit_price: 5165.8,
    exit_time: "2026-02-24T06:30:00Z",
    accuracy_status: "Loss"
  },
  {
    id: 5,
    module: "TECHNICAL",
    signal: "BUY",
    confidence_score: 80.0,
    market_situation: "dangerous",
    trade_entry: 5177.39,
    trade_sl: 5160.08,
    trade_tp: 5190.38,
    reasoning: "The RSI is at 44.26, indicating oversold conditions. The recent history log shows a series of higher lows, indicating a potential bullish trend. Market volatility triggered the stop loss prematurely.",
    pattern: "Bullish Divergence",
    created_at: "2026-02-24T05:52:20.689531Z",
    exit_price: 5160.08,
    exit_time: "2026-02-24T06:30:00Z",
    accuracy_status: "Loss"
  },
  {
    id: 4,
    module: "TECHNICAL",
    signal: "BUY",
    confidence_score: 80.0,
    market_situation: "secure",
    trade_entry: 5234.36,
    trade_sl: 5194.58,
    trade_tp: 5237.62,
    reasoning: "The RSI is at 71.72, indicating overbought conditions. However, the price is still trading above the recent support level of 5205.48. The Bullish Divergence pattern is identified when the price makes a higher high, but the RSI fails to make a new high, indicating a potential reversal.",
    pattern: "Bullish Divergence",
    created_at: "2026-02-23T21:11:35.037450Z",
    exit_price: 5237.62,
    exit_time: "2026-02-23T23:00:00Z",
    accuracy_status: "Won"
  },
  {
    id: 3,
    module: "TECHNICAL",
    signal: "BUY",
    confidence_score: 80.0,
    market_situation: "secure",
    trade_entry: 5235.44,
    trade_sl: 5194.41,
    trade_tp: 5237.62,
    reasoning: "The RSI is overbought at 72.89, but the price is still trading above the upper Bollinger Band. The recent history log shows a series of higher highs and higher lows, indicating a bullish trend. Bullish Divergence pattern confirmed.",
    pattern: "Bullish Divergence",
    created_at: "2026-02-23T21:10:32.488584Z",
    exit_price: 5237.62,
    exit_time: "2026-02-23T23:00:00Z",
    accuracy_status: "Won"
  },
  {
    id: 2,
    module: "Ensemble Engine",
    signal: "BUY",
    confidence_score: 85.0,
    market_situation: "secure",
    trade_entry: 2050.5,
    trade_sl: 2040.0,
    trade_tp: 2060.0,
    reasoning: "Testing the automated predictive loop. Ensemble agreement high on upward movement.",
    pattern: "Bullish",
    created_at: "2026-02-23T20:52:50.067446Z",
    exit_price: 2060.0,
    exit_time: "2026-02-23T21:00:00Z",
    accuracy_status: "Won"
  },
  {
    id: 1,
    module: "Ensemble Engine",
    signal: "BUY",
    confidence_score: 85.0,
    market_situation: "secure",
    trade_entry: 2050.5,
    trade_sl: 2040.0,
    trade_tp: 2060.0,
    reasoning: "Initial system test of the automated predictive loop. Confirmed winning trade on exit.",
    pattern: "Bullish",
    created_at: "2026-02-23T20:51:50.020957Z",
    exit_price: 2060.0,
    exit_time: "2026-02-23T21:00:00Z",
    accuracy_status: "Won"
  }
];

export const AIPredictionWidget = ({ onSelectSignal }: { onSelectSignal: (signal: Signal) => void }) => {
  const navigate = useNavigate();

  // Date & Time formatting
  // Prominent Date formatting (Date wahi rahegi jo data mein hai)
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      timeZone: 'UTC' // Isse conversion nahi hogi
    });
  };

  // Fixed Time formatting (22:16 ko 10:16 PM dikhaye ga)
  const formatTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZone: 'UTC' // Isse UTC conversion force hogi
    });
  };

  // 2. Logic: Hamesha sab se latest entry uthayega (ID ke hisaab se)
  const latestPrediction = useMemo(() => {
    if (!dummySignals || dummySignals.length === 0) return null;
    return [...dummySignals].sort((a, b) => b.id - a.id)[0];
  }, []);

  if (!latestPrediction) {
    return <div className="text-white p-4">Initializing Neural Feed...</div>;
  }

  const stanceConfig = {
    BUY: { icon: TrendingUp, color: "#10B981", bgColor: "bg-neon-green/10", borderColor: "border-neon-green/30" },
    SELL: { icon: TrendingDown, color: "#F43F5E", bgColor: "bg-neon-red/10", borderColor: "border-neon-red/30" },
    HOLD: { icon: Minus, color: "#F59E0B", bgColor: "bg-neon-amber/10", borderColor: "border-neon-amber/30" },
  };

  const config = stanceConfig[latestPrediction.signal as keyof typeof stanceConfig];
  const Icon = config.icon;

  return (
    <div
      onClick={() => onSelectSignal(latestPrediction)}
      className="glass-card p-6 gradient-border relative overflow-hidden h-full flex flex-col justify-between cursor-pointer group active:scale-[0.98] transition-all duration-300"
    >
      {/* Background Glow */}
      <div className="absolute -right-20 -top-20 w-40 h-40 rounded-full blur-[100px] opacity-20 transition-all" style={{ backgroundColor: config.color }} />

      {/* Header */}
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
            <Brain className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-xs font-black text-white italic tracking-tight uppercase">Neural Engine v2</h3>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 border border-white/10">
          <Zap className={`w-2.5 h-2.5 text-primary ${latestPrediction.accuracy_status === 'Pending' ? 'animate-pulse' : ''}`} />
          <span className="text-[9px] font-black text-primary tracking-tighter uppercase italic">
            {latestPrediction.accuracy_status === 'Pending' ? 'Live' : 'Last Signal'}
          </span>
        </div>
      </div>

      {/* Date Bar */}
      <div className="relative z-10 flex items-center justify-between bg-white/5 border border-white/5 rounded-2xl px-5 py-3 mb-6 shadow-xl">
        <div className="flex items-center gap-2">
          <Calendar size={14} className="text-primary" />
          <span className="text-[11px] font-black text-white uppercase tracking-tighter">{formatDate(latestPrediction.created_at)}</span>
        </div>
        <div className="flex items-center gap-2 border-l border-white/10 pl-4">
          <Clock size={14} className="text-primary" />
          <span className="text-[11px] font-black text-white uppercase tracking-tighter">{formatTime(latestPrediction.created_at)}</span>
        </div>
      </div>

      {/* Signal Action */}
      <div className="relative z-10 flex-1 flex flex-col justify-center space-y-6">
        <div className="text-center">
          <div className={`inline-flex items-center gap-6 px-10 py-4 rounded-[2.5rem] border-2 transition-all ${config.bgColor} ${config.borderColor} group-hover:scale-105 shadow-2xl`}>
            <Icon className="w-12 h-12" style={{ color: config.color }} />
            <div className="text-left">
              <span className="block text-[8px] text-muted-foreground uppercase font-black tracking-widest mb-1">AI Recommendation</span>
              <span className="text-5xl font-black italic tracking-tighter" style={{ color: config.color }}>{latestPrediction.signal}</span>
            </div>
          </div>
        </div>

        {/* Dynamic Prices */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/5 p-4 rounded-3xl border border-white/5 group-hover:border-white/10 transition-colors">
            <span className="text-[8px] font-black text-muted-foreground uppercase block mb-1">Entry Price</span>
            <p className="text-lg font-mono font-black text-white">${latestPrediction.trade_entry.toLocaleString()}</p>
          </div>
          <div className="bg-white/5 p-4 rounded-3xl border border-white/5 group-hover:border-white/10 transition-colors">
            <span className={`text-[8px] font-black uppercase block mb-1 ${latestPrediction.accuracy_status === "Pending" ? "text-primary" : "text-muted-foreground"
              }`}>
              {latestPrediction.accuracy_status === "Pending" ? "Target TP" : "Exit Price"}
            </span>
            <p className={`text-lg font-mono font-black ${latestPrediction.accuracy_status === "Won" ? "text-neon-green" :
              latestPrediction.accuracy_status === "Loss" ? "text-neon-red" : "text-primary"
              }`}>
              ${(latestPrediction.exit_price || latestPrediction.trade_tp).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Resolution Timeline */}
        {latestPrediction.exit_time && (
          <div className="flex items-center justify-center gap-2 py-1 bg-white/5 rounded-xl border border-white/5 border-dashed">
            <CheckCircle2 size={12} className="text-muted-foreground" />
            <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest italic">
              Resolved @ {formatTime(latestPrediction.exit_time)}
            </span>
          </div>
        )}
      </div>
    </div >
  );
};