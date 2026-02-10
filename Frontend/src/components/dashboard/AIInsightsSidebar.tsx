import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, ArrowUp, Clock, Sparkles, TrendingUp, X, Brain, Target, AlertTriangle, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Signal {
  id: string;
  asset: string;
  type: "BUY" | "SELL";
  entryPrice: string;
  stopLoss: string;
  takeProfit: string;
  timestamp: string;
  status: "active" | "hit" | "stopped";
  reasoning: string;
  indicators: string[];
}

const signals: Signal[] = [
  {
    id: "1",
    asset: "XAU/USD",
    type: "BUY",
    entryPrice: "4,920.00",
    stopLoss: "4,890.00",
    takeProfit: "4,980.00",
    timestamp: "2 min ago",
    status: "active",
    reasoning: "Strong bullish divergence detected on the 4H RSI combined with a break above the 50 EMA.",
    indicators: ["RSI Divergence", "EMA Crossover"],
  },
  {
    id: "2",
    asset: "BTC/USD",
    type: "SELL",
    entryPrice: "97,450.00",
    stopLoss: "98,200.00",
    takeProfit: "95,800.00",
    timestamp: "15 min ago",
    status: "active",
    reasoning: "Double top pattern confirmed at resistance zone with bearish MACD crossover.",
    indicators: ["Double Top", "MACD Bearish"],
  },
  {
    id: "3",
    asset: "EUR/USD",
    type: "BUY",
    entryPrice: "1.1782",
    stopLoss: "1.1750",
    takeProfit: "1.1850",
    timestamp: "32 min ago",
    status: "hit",
    reasoning: "Ascending triangle breakout with strong volume confirmation.",
    indicators: ["Triangle Breakout", "Volume"],
  },
  {
    id: "4",
    asset: "SOL/USD",
    type: "BUY",
    entryPrice: "228.45",
    stopLoss: "220.00",
    takeProfit: "245.00",
    timestamp: "1 hr ago",
    status: "active",
    reasoning: "Support zone bounce with oversold RSI on 4H timeframe.",
    indicators: ["Support Bounce", "Oversold RSI"],
  },
  {
    id: "5",
    asset: "ETH/USD",
    type: "SELL",
    entryPrice: "3,865.00",
    stopLoss: "3,920.00",
    takeProfit: "3,750.00",
    timestamp: "2 hrs ago",
    status: "stopped",
    reasoning: "Bearish engulfing at resistance failed due to unexpected news catalyst.",
    indicators: ["Bearish Engulfing", "Fundamentals"],
  },
];

export const AIInsightsSidebar = () => {
  const [selectedSignal, setSelectedSignal] = useState<Signal | null>(null);
  const navigate = useNavigate();

  return (
    <>
      <div className="glass-card p-4 gradient-border h-full flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">AI Signals</h3>
          </div>
          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-neon-green/10 border border-neon-green/30">
            <div className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
            <span className="text-xs text-neon-green font-medium">5 Active</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto space-y-3 pr-1 custom-scrollbar">
          {signals.map((signal) => (
            <motion.div
              key={signal.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedSignal(signal)}
              className={`p-3 rounded-xl border transition-all cursor-pointer hover:bg-secondary/30 ${
                signal.status === "hit"
                  ? "bg-neon-green/5 border-neon-green/30"
                  : signal.status === "stopped"
                  ? "bg-neon-red/5 border-neon-red/30"
                  : "bg-secondary/20 border-border/50"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm">{signal.asset}</span>
                  <span
                    className={`flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${
                      signal.type === "BUY"
                        ? "bg-neon-green/20 text-neon-green"
                        : "bg-neon-red/20 text-neon-red"
                    }`}
                  >
                    {signal.type === "BUY" ? (
                      <ArrowUp className="w-3 h-3" />
                    ) : (
                      <ArrowDown className="w-3 h-3" />
                    )}
                    {signal.type}
                  </span>
                </div>
                {signal.status === "hit" && (
                  <TrendingUp className="w-4 h-4 text-neon-green" />
                )}
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs">
                <div>
                  <span className="text-muted-foreground block">Entry</span>
                  <span className="font-mono">${signal.entryPrice}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block">SL</span>
                  <span className="font-mono text-neon-red">${signal.stopLoss}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block">TP</span>
                  <span className="font-mono text-neon-green">${signal.takeProfit}</span>
                </div>
              </div>

              <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                <span>{signal.timestamp}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="pt-4 mt-4 border-t border-border/30">
          <button 
            onClick={() => navigate("/signals")}
            className="w-full py-2.5 rounded-xl bg-primary/20 hover:bg-primary/30 text-primary text-sm font-medium transition-colors"
          >
            View All Signals
          </button>
        </div>
      </div>

      {/* Signal Modal */}
      <AnimatePresence>
        {selectedSignal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedSignal(null)}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md"
            >
              <div className="glass-card-strong p-6 mx-4 gradient-border">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        selectedSignal.type === "BUY" ? "bg-neon-green/20 neon-glow-green" : "bg-neon-red/20 neon-glow-red"
                      }`}
                    >
                      {selectedSignal.type === "BUY" ? (
                        <ArrowUp className="w-6 h-6 text-neon-green" />
                      ) : (
                        <ArrowDown className="w-6 h-6 text-neon-red" />
                      )}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">{selectedSignal.asset}</h2>
                      <span className={`text-lg font-bold ${selectedSignal.type === "BUY" ? "text-neon-green" : "text-neon-red"}`}>
                        {selectedSignal.type} Signal
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedSignal(null)}
                    className="w-8 h-8 rounded-lg bg-secondary/50 flex items-center justify-center hover:bg-secondary transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="text-center p-4 bg-secondary/30 rounded-xl border border-border/50">
                    <Target className="w-5 h-5 text-primary mx-auto mb-2" />
                    <span className="text-xs text-muted-foreground block mb-1">Entry</span>
                    <span className="text-lg font-mono font-bold">${selectedSignal.entryPrice}</span>
                  </div>
                  <div className="text-center p-4 bg-neon-red/10 rounded-xl border border-neon-red/30">
                    <AlertTriangle className="w-5 h-5 text-neon-red mx-auto mb-2" />
                    <span className="text-xs text-neon-red block mb-1">Stop Loss</span>
                    <span className="text-lg font-mono font-bold">${selectedSignal.stopLoss}</span>
                  </div>
                  <div className="text-center p-4 bg-neon-green/10 rounded-xl border border-neon-green/30">
                    <CheckCircle className="w-5 h-5 text-neon-green mx-auto mb-2" />
                    <span className="text-xs text-neon-green block mb-1">Take Profit</span>
                    <span className="text-lg font-mono font-bold">${selectedSignal.takeProfit}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Brain className="w-4 h-4 text-primary" />
                    <span className="text-sm font-semibold">AI Reasoning</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed bg-secondary/30 p-4 rounded-xl">
                    {selectedSignal.reasoning}
                  </p>
                </div>

                <div>
                  <span className="text-sm font-semibold mb-3 block">Key Indicators</span>
                  <div className="flex flex-wrap gap-2">
                    {selectedSignal.indicators.map((indicator) => (
                      <span
                        key={indicator}
                        className="px-3 py-1.5 bg-primary/10 border border-primary/30 rounded-full text-xs font-medium text-primary"
                      >
                        {indicator}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-border/50 text-center">
                  <span className="text-xs text-muted-foreground">Signal generated {selectedSignal.timestamp}</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
