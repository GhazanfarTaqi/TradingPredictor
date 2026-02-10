import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Radio, TrendingUp, TrendingDown, Filter, Search, ChevronDown } from "lucide-react";
import { SignalModal } from "@/components/dashboard/SignalModal";

export interface Signal {
  id: string;
  asset: string;
  type: "BUY" | "SELL";
  entry: string;
  stopLoss: string;
  takeProfit: string;
  confidence: number;
  timestamp: string;
  status: "active" | "hit_tp" | "hit_sl" | "pending";
  reasoning: string;
  indicators: string[];
}

const signals: Signal[] = [
  {
    id: "1",
    asset: "XAU/USD",
    type: "BUY",
    entry: "$2,645.50",
    stopLoss: "$2,620.00",
    takeProfit: "$2,695.00",
    confidence: 87,
    timestamp: "2 min ago",
    status: "active",
    reasoning: "Strong bullish divergence detected on the 4H RSI with price making lower lows while RSI forms higher lows. Combined with a break above the 50 EMA and increased volume, this suggests a reversal is imminent.",
    indicators: ["RSI Divergence", "EMA Crossover", "Volume Spike"],
  },
  {
    id: "2",
    asset: "BTC/USD",
    type: "SELL",
    entry: "$67,890.00",
    stopLoss: "$69,500.00",
    takeProfit: "$64,200.00",
    confidence: 72,
    timestamp: "15 min ago",
    status: "active",
    reasoning: "Double top pattern confirmed at resistance zone. MACD showing bearish crossover on daily timeframe with declining momentum. Funding rates extremely positive indicating overleveraged longs.",
    indicators: ["Double Top", "MACD Bearish", "Funding Rate"],
  },
  {
    id: "3",
    asset: "ETH/USD",
    type: "BUY",
    entry: "$3,420.00",
    stopLoss: "$3,320.00",
    takeProfit: "$3,650.00",
    confidence: 81,
    timestamp: "32 min ago",
    status: "hit_tp",
    reasoning: "Ascending triangle breakout with strong volume confirmation. ETH/BTC ratio showing relative strength. On-chain metrics indicate accumulation by large wallets.",
    indicators: ["Triangle Breakout", "Volume", "On-chain"],
  },
  {
    id: "4",
    asset: "EUR/USD",
    type: "SELL",
    entry: "$1.0875",
    stopLoss: "$1.0920",
    takeProfit: "$1.0780",
    confidence: 68,
    timestamp: "1 hr ago",
    status: "pending",
    reasoning: "Bearish engulfing candle at weekly resistance. Dollar Index showing strength with breakout above 104.50. ECB dovish comments adding pressure.",
    indicators: ["Bearish Engulfing", "DXY Strength", "Fundamentals"],
  },
  {
    id: "5",
    asset: "GBP/USD",
    type: "BUY",
    entry: "$1.2650",
    stopLoss: "$1.2580",
    takeProfit: "$1.2780",
    confidence: 75,
    timestamp: "2 hrs ago",
    status: "hit_sl",
    reasoning: "Support zone bounce with hammer candle formation. Oversold on 4H timeframe. However, unexpected BOE statement caused sharp reversal.",
    indicators: ["Support Bounce", "Oversold RSI", "Hammer Pattern"],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

export const Signals = () => {
  const [selectedSignal, setSelectedSignal] = useState<Signal | null>(null);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSignals = signals.filter((signal) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "active" && (signal.status === "active" || signal.status === "pending")) ||
      (filter === "completed" && (signal.status === "hit_tp" || signal.status === "hit_sl"));
    const matchesSearch = signal.asset.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusBadge = (status: Signal["status"]) => {
    const configs = {
      active: { label: "Active", className: "bg-neon-green/20 text-neon-green border-neon-green/50" },
      hit_tp: { label: "TP Hit", className: "bg-neon-green/20 text-neon-green border-neon-green/50" },
      hit_sl: { label: "SL Hit", className: "bg-neon-red/20 text-neon-red border-neon-red/50" },
      pending: { label: "Pending", className: "bg-neon-amber/20 text-neon-amber border-neon-amber/50" },
    };
    return configs[status];
  };

  return (
    <>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <Radio className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">AI Signals</h1>
              <p className="text-sm text-muted-foreground">Real-time trading signals from NeuralTrade AI</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search assets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-secondary/50 border border-border/50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            {/* Filter */}
            <div className="relative">
              <button className="flex items-center gap-2 px-4 py-2 bg-secondary/50 border border-border/50 rounded-lg text-sm hover:bg-secondary transition-colors">
                <Filter className="w-4 h-4" />
                <span className="capitalize">{filter}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-full right-0 mt-2 w-40 bg-card border border-border rounded-lg shadow-xl z-10 hidden group-focus-within:block">
                {["all", "active", "completed"].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f as typeof filter)}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-secondary/50 capitalize"
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div variants={itemVariants} className="flex gap-2">
          {(["all", "active", "completed"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === f
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/50 text-muted-foreground hover:text-foreground"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </motion.div>

        {/* Signals Grid */}
        <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredSignals.map((signal) => {
              const statusBadge = getStatusBadge(signal.status);
              return (
                <motion.div
                  key={signal.id}
                  variants={itemVariants}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedSignal(signal)}
                  className="glass-card p-5 cursor-pointer hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          signal.type === "BUY" ? "bg-neon-green/20" : "bg-neon-red/20"
                        }`}
                      >
                        {signal.type === "BUY" ? (
                          <TrendingUp className="w-5 h-5 text-neon-green" />
                        ) : (
                          <TrendingDown className="w-5 h-5 text-neon-red" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold">{signal.asset}</h3>
                        <span className="text-xs text-muted-foreground">{signal.timestamp}</span>
                      </div>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium border ${statusBadge.className}`}
                    >
                      {statusBadge.label}
                    </span>
                  </div>

                  <div
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg mb-4 ${
                      signal.type === "BUY"
                        ? "bg-neon-green/20 border border-neon-green/50"
                        : "bg-neon-red/20 border border-neon-red/50"
                    }`}
                  >
                    <span
                      className={`text-lg font-bold ${
                        signal.type === "BUY" ? "text-neon-green" : "text-neon-red"
                      }`}
                    >
                      {signal.type}
                    </span>
                    <span className="text-sm text-muted-foreground">@ {signal.entry}</span>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="text-center p-2 bg-secondary/30 rounded-lg">
                      <span className="text-xs text-muted-foreground block">Entry</span>
                      <span className="text-sm font-mono font-medium">{signal.entry}</span>
                    </div>
                    <div className="text-center p-2 bg-neon-red/10 rounded-lg">
                      <span className="text-xs text-neon-red block">SL</span>
                      <span className="text-sm font-mono font-medium">{signal.stopLoss}</span>
                    </div>
                    <div className="text-center p-2 bg-neon-green/10 rounded-lg">
                      <span className="text-xs text-neon-green block">TP</span>
                      <span className="text-sm font-mono font-medium">{signal.takeProfit}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-full bg-secondary rounded-full h-2 w-20">
                        <div
                          className="h-2 rounded-full bg-primary"
                          style={{ width: `${signal.confidence}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{signal.confidence}%</span>
                    </div>
                    <span className="text-xs text-muted-foreground">Click for details</span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      <SignalModal signal={selectedSignal} onClose={() => setSelectedSignal(null)} />
    </>
  );
};
