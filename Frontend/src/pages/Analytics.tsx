import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart3, TrendingUp, TrendingDown, Activity, PieChart, Zap, Target, BrainCircuit, Clock, X } from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart as RechartsPie, Pie, Cell,
} from "recharts";

// Interface and dummySignals should be imported or kept here
// Interface for type safety
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

export const Analytics = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // FIXED: UTC forced for consistent market time across analytics
  const formatDateTimeStandard = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZone: 'UTC' // Prevent local browser conversion
    });
  };

  // Stats Logic
  const stats = useMemo(() => {
    const completed = dummySignals.filter(s => s.accuracy_status !== "Pending");
    const won = completed.filter(s => s.accuracy_status === "Won").length;
    const loss = completed.filter(s => s.accuracy_status === "Loss").length;
    const pending = dummySignals.filter(s => s.accuracy_status === "Pending").length;
    const winRate = completed.length > 0 ? ((won / completed.length) * 100).toFixed(1) : "0";
    return { total: dummySignals.length, won, loss, pending, winRate };
  }, []);

  // Filtered Data for Modal Registry
  const filteredData = useMemo(() => {
    if (!activeCategory) return [];
    const mapping: Record<string, any> = {
      "Total Analysis": dummySignals,
      "Trades Won": dummySignals.filter(s => s.accuracy_status === "Won"),
      "Trades Lost": dummySignals.filter(s => s.accuracy_status === "Loss"),
      "Pending Trades": dummySignals.filter(s => s.accuracy_status === "Pending")
    };
    return mapping[activeCategory] || [];
  }, [activeCategory]);

  return (
    <div className="space-y-8 p-4 relative">
      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; }
      `}} />

      {/* Header same rahega */}
      <div className="flex items-center gap-4">
        <div className="p-3 bg-primary/20 rounded-xl border border-primary/30">
          <Activity className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-black tracking-tight text-white uppercase italic">Neural Analytics</h1>
          <p className="text-xs font-bold text-muted-foreground tracking-widest uppercase italic opacity-60">System Efficiency Audit</p>
        </div>
      </div>

      {/* 4 Interactive Blocks */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Total Analysis", value: stats.total, icon: BrainCircuit, color: "text-blue-400" },
          { label: "Trades Won", value: stats.won, icon: TrendingUp, color: "text-neon-green" },
          { label: "Trades Lost", value: stats.loss, icon: TrendingDown, color: "text-neon-red" },
          { label: "Pending Trades", value: stats.pending, icon: Clock, color: "text-neon-amber" },
        ].map((item, i) => (
          <motion.div 
            key={i} whileHover={{ y: -5 }} whileTap={{ scale: 0.95 }}
            onClick={() => setActiveCategory(item.label)}
            className="bg-[#0d0d0d] border border-white/5 p-7 rounded-[2rem] shadow-2xl cursor-pointer hover:border-primary/40 transition-all group overflow-hidden"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">{item.label}</span>
              <item.icon className={`w-5 h-5 ${item.color}`} />
            </div>
            <div className="text-4xl font-black text-white italic tracking-tighter">{item.value}</div>
            <p className="text-[8px] text-primary mt-3 font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity italic">Open Registry →</p>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 bg-[#0d0d0d] border border-white/5 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden text-center">
          <h3 className="text-sm font-black uppercase tracking-widest text-white mb-8 flex items-center justify-center gap-2">
            <PieChart size={16} className="text-primary" /> Success Efficiency
          </h3>
          <div className="h-64 relative mx-auto">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPie>
                <Pie data={[{ name: "Won", value: stats.won }, { name: "Loss", value: stats.loss }]} innerRadius={75} outerRadius={95} paddingAngle={10} dataKey="value" stroke="none">
                  <Cell fill="#00ff88" /><Cell fill="#ff4444" />
                </Pie>
                <Tooltip />
              </RechartsPie>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-4xl font-black text-white italic tracking-tighter">{stats.winRate}%</span>
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Accuracy</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-[#0d0d0d] border border-white/5 p-8 rounded-[2.5rem] shadow-2xl">
          <h3 className="text-sm font-black uppercase tracking-widest text-white mb-8 flex items-center gap-2">
            <Zap size={16} className="text-neon-amber" /> Neural Confidence History
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={[...dummySignals].reverse()}>
                <defs><linearGradient id="colorConf" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#0077ff" stopOpacity={0.3}/><stop offset="95%" stopColor="#0077ff" stopOpacity={0}/></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                <XAxis dataKey="id" hide /><YAxis stroke="#444" fontSize={10} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #333', borderRadius: '15px' }} />
                <Area type="monotone" dataKey="confidence_score" stroke="#0077ff" fill="url(#colorConf)" strokeWidth={4} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Detail Registry Modal with Fixed Logic */}
      <AnimatePresence>
        {activeCategory && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md pt-20" onClick={() => setActiveCategory(null)}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
              className="bg-[#0a0a0a] border border-white/10 w-full max-w-4xl max-h-[85vh] rounded-[3rem] overflow-hidden flex flex-col shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/5">
                <div><h2 className="text-2xl font-black text-white uppercase italic tracking-tight">{activeCategory}</h2></div>
                <button onClick={() => setActiveCategory(null)} className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-colors"><X className="text-white" /></button>
              </div>

              <div className="p-8 overflow-y-auto custom-scrollbar flex-1 space-y-4">
                {filteredData.map((trade: any) => (
                  <div key={trade.id} className="bg-white/5 border border-white/5 p-6 rounded-[2rem] transition-all">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
                      <div className="space-y-1"><span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Prediction Unit</span><div className="text-sm font-bold text-white flex items-center gap-2">{trade.module} <span className="text-[10px] opacity-40">#{trade.id}</span></div></div>
                      <div className="space-y-1"><span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Entry</span><p className="text-xs font-mono text-white font-bold tracking-tighter">${trade.trade_entry.toLocaleString()}</p><p className="text-[10px] text-muted-foreground font-bold uppercase tracking-tighter">{formatDateTimeStandard(trade.created_at)}</p></div>
                      
                      {/* FIXED EXIT/TARGET LOGIC */}
                      <div className="space-y-1">
                        <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">
                          {trade.accuracy_status === "Pending" ? "Target Objective" : "Execution Result"}
                        </span>
                        <p className={`text-xs font-mono font-bold tracking-tighter ${trade.accuracy_status === 'Won' ? 'text-neon-green' : trade.accuracy_status === 'Loss' ? 'text-neon-red' : 'text-blue-400'}`}>
                          {trade.accuracy_status === 'Pending' ? `$${trade.trade_tp.toLocaleString()}` : `$${(trade.exit_price || trade.trade_tp).toLocaleString()}`}
                        </p>
                        <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-tighter">
                          {trade.exit_time ? formatDateTimeStandard(trade.exit_time) : "Position Open"}
                        </p>
                      </div>
                      
                      <div className="flex justify-end"><div className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-tighter border ${trade.accuracy_status === 'Won' ? 'bg-neon-green/10 text-neon-green border-neon-green/20' : trade.accuracy_status === 'Loss' ? 'bg-neon-red/10 text-neon-red border-neon-red/20' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'}`}>{trade.accuracy_status}</div></div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};