import { motion, AnimatePresence } from "framer-motion";
import { X, TrendingUp, TrendingDown, Brain, Target, AlertTriangle, CheckCircle } from "lucide-react";
import type { Signal } from "@/pages/Signals";

interface SignalModalProps {
  signal: Signal | null;
  onClose: () => void;
}

export const SignalModal = ({ signal, onClose }: SignalModalProps) => {
  if (!signal) return null;

  return (
    <AnimatePresence>
      {signal && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg"
          >
            <div className="glass-card-strong p-6 mx-4 gradient-border">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      signal.type === "BUY" ? "bg-neon-green/20 neon-glow-green" : "bg-neon-red/20 neon-glow-red"
                    }`}
                  >
                    {signal.type === "BUY" ? (
                      <TrendingUp className="w-6 h-6 text-neon-green" />
                    ) : (
                      <TrendingDown className="w-6 h-6 text-neon-red" />
                    )}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{signal.asset}</h2>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-lg font-bold ${
                          signal.type === "BUY" ? "text-neon-green" : "text-neon-red"
                        }`}
                      >
                        {signal.type}
                      </span>
                      <span className="text-muted-foreground">Signal</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-lg bg-secondary/50 flex items-center justify-center hover:bg-secondary transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Price Levels */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="text-center p-4 bg-secondary/30 rounded-xl border border-border/50">
                  <Target className="w-5 h-5 text-primary mx-auto mb-2" />
                  <span className="text-xs text-muted-foreground block mb-1">Entry</span>
                  <span className="text-lg font-mono font-bold">{signal.entry}</span>
                </div>
                <div className="text-center p-4 bg-neon-red/10 rounded-xl border border-neon-red/30">
                  <AlertTriangle className="w-5 h-5 text-neon-red mx-auto mb-2" />
                  <span className="text-xs text-neon-red block mb-1">Stop Loss</span>
                  <span className="text-lg font-mono font-bold">{signal.stopLoss}</span>
                </div>
                <div className="text-center p-4 bg-neon-green/10 rounded-xl border border-neon-green/30">
                  <CheckCircle className="w-5 h-5 text-neon-green mx-auto mb-2" />
                  <span className="text-xs text-neon-green block mb-1">Take Profit</span>
                  <span className="text-lg font-mono font-bold">{signal.takeProfit}</span>
                </div>
              </div>

              {/* Confidence */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">AI Confidence</span>
                  <span className="text-lg font-bold text-primary">{signal.confidence}%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${signal.confidence}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-3 rounded-full bg-gradient-to-r from-primary to-neon-cyan"
                  />
                </div>
              </div>

              {/* Reasoning */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Brain className="w-4 h-4 text-primary" />
                  <span className="text-sm font-semibold">AI Reasoning</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed bg-secondary/30 p-4 rounded-xl">
                  {signal.reasoning}
                </p>
              </div>

              {/* Indicators */}
              <div>
                <span className="text-sm font-semibold mb-3 block">Key Indicators</span>
                <div className="flex flex-wrap gap-2">
                  {signal.indicators.map((indicator) => (
                    <span
                      key={indicator}
                      className="px-3 py-1.5 bg-primary/10 border border-primary/30 rounded-full text-xs font-medium text-primary"
                    >
                      {indicator}
                    </span>
                  ))}
                </div>
              </div>

              {/* Timestamp */}
              <div className="mt-6 pt-4 border-t border-border/50 text-center">
                <span className="text-xs text-muted-foreground">Signal generated {signal.timestamp}</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
