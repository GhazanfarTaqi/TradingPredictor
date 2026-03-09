import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Radio, TrendingUp, TrendingDown, Search, Clock, Target, ShieldAlert, CheckCircle2 } from "lucide-react";
import { SignalModal } from "@/components/dashboard/SignalModal";

export interface Signal {
  id: number;
  module: string;
  signal: "BUY" | "SELL";
  market_situation: "secure" | "caution" | "dangerous";
  confidence_score: number;
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

// FIXED: UTC forced for consistent market time
const formatFullDateTime = (dateStr: string) => {
  return new Date(dateStr).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'UTC' // Conversion block kar di hai
  });
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(price);
};

// --- DUMMY DATA ---
export const dummySignals: Signal[] = [
  {
    id: 16,
    module: "FUSION",
    signal: "BUY",
    confidence_score: 90.0,
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

export const Signals = ({ signals = dummySignals }: { signals?: Signal[] }) => {
  const [selectedSignal, setSelectedSignal] = useState<Signal | null>(null);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSignals = signals.filter((s) => {
    const matchesFilter = 
      filter === "all" || 
      (filter === "active" && s.accuracy_status === "Pending") || 
      (filter === "completed" && (s.accuracy_status === "Won" || s.accuracy_status === "Loss"));
    const matchesSearch = s.module.toLowerCase().includes(searchQuery.toLowerCase()) || s.pattern.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusConfig = (status: Signal["accuracy_status"]) => {
    switch (status) {
      case "Won": return { label: "Won", className: "bg-neon-green/10 text-neon-green border-neon-green/30" };
      case "Loss": return { label: "Lost", className: "bg-neon-red/10 text-neon-red border-neon-red/30" };
      default: return { label: "Active", className: "bg-blue-500/10 text-blue-400 border-blue-500/30" };
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 space-y-10">
      {/* Header same rahega */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-5">
          <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20">
            <Radio className="w-8 h-8 text-primary animate-pulse" />
          </div>
          <div>
            <h1 className="text-4xl font-black italic text-white uppercase">AI Signals</h1>
            <p className="text-xs font-bold text-muted-foreground tracking-[0.3em] uppercase">Live Prediction Engine</p>
          </div>
        </div>
        <div className="relative w-full md:w-80 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input type="text" placeholder="Search Assets..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-secondary/30 border border-white/5 rounded-2xl text-white" />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex p-1.5 bg-secondary/20 border border-white/5 rounded-2xl w-fit backdrop-blur-xl">
        {(["all", "active", "completed"] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`px-8 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${filter === f ? "bg-primary text-white" : "text-muted-foreground hover:text-white"}`}>{f}</button>
        ))}
      </div>

      {/* Signals Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredSignals.map((signal) => {
            const statusStyle = getStatusConfig(signal.accuracy_status);
            return (
              <motion.div key={signal.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} whileHover={{ y: -8 }} onClick={() => setSelectedSignal(signal)} className="glass-card group relative p-8 cursor-pointer border border-white/5 rounded-[2rem] bg-[#0d0d0d] overflow-hidden" >
                <div className={`absolute -right-16 -top-16 w-32 h-32 blur-[80px] opacity-20 ${signal.signal === "BUY" ? "bg-neon-green" : "bg-neon-red"}`} />
                
                <div className="flex justify-between items-start mb-8 relative z-10">
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${signal.signal === "BUY" ? "bg-neon-green/10" : "bg-neon-red/10"}`}>
                      {signal.signal === "BUY" ? <TrendingUp className="text-neon-green w-7 h-7" /> : <TrendingDown className="text-neon-red w-7 h-7" />}
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-white italic">{signal.module}</h3>
                      <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase">
                        <Clock size={12} /> {formatFullDateTime(signal.created_at)}
                      </div>
                    </div>
                  </div>
                  <div className={`px-4 py-1.5 rounded-full text-[10px] font-black border uppercase tracking-widest ${statusStyle.className}`}>
                    {statusStyle.label}
                  </div>
                </div>

                <div className="space-y-2 mb-8 relative z-10">
                  <div className="flex items-baseline gap-3">
                    <span className={`text-4xl font-black italic tracking-tighter ${signal.signal === "BUY" ? "text-neon-green" : "text-neon-red"}`}>{signal.signal}</span>
                    <span className="text-muted-foreground font-mono text-lg tracking-tighter">@ {formatPrice(signal.trade_entry)}</span>
                  </div>
                  <p className="text-xs font-bold text-primary tracking-[0.2em] uppercase opacity-70">{signal.pattern}</p>
                </div>

                {/* FIXED: Conditional Labels (Target vs Exit) */}
                <div className="grid grid-cols-2 gap-4 mb-8 relative z-10">
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                    <div className="flex items-center gap-2 mb-1 text-muted-foreground">
                       <Target size={12} className={signal.accuracy_status === "Pending" ? "text-primary" : "text-neon-green"} />
                       <span className="text-[9px] font-black uppercase tracking-widest">
                        {signal.accuracy_status === "Pending" ? "Target TP" : "Exit Price"}
                       </span>
                    </div>
                    <p className={`text-base font-mono font-bold ${signal.accuracy_status === "Won" ? "text-neon-green" : signal.accuracy_status === "Loss" ? "text-neon-red" : "text-white"}`}>
                      {formatPrice(signal.exit_price || signal.trade_tp)}
                    </p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                    <div className="flex items-center gap-2 mb-1 text-muted-foreground">
                       <ShieldAlert size={12} className="text-neon-red" />
                       <span className="text-[9px] font-black uppercase tracking-widest">Stop Loss</span>
                    </div>
                    <p className="text-base font-mono font-bold text-neon-red">{formatPrice(signal.trade_sl)}</p>
                  </div>
                </div>

                {/* FIXED: Exit Time Display */}
                {signal.exit_time && (
                  <div className="flex items-center gap-2 mb-6 text-[9px] font-bold text-muted-foreground uppercase bg-white/5 w-fit px-3 py-1.5 rounded-lg border border-dashed border-white/10">
                    <CheckCircle2 size={10} className="text-neon-green" /> Resolved: {formatFullDateTime(signal.exit_time)}
                  </div>
                )}

                {/* Progress bar logic same rahegi */}
                <div className="space-y-3 relative z-10">
                  <div className="flex justify-between text-xs font-black uppercase tracking-widest">
                    <span className="text-muted-foreground">Confidence</span>
                    <span className="text-white">{signal.confidence_score}%</span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${signal.confidence_score}%` }} className={`h-full rounded-full ${signal.confidence_score > 85 ? 'bg-neon-green shadow-[0_0_10px_#00ff88]' : 'bg-primary shadow-[0_0_10px_#0077ff]'}`} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <SignalModal signal={selectedSignal} onClose={() => setSelectedSignal(null)} />
    </div>
  );
};