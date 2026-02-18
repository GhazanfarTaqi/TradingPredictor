import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, TrendingDown, Minus, Brain, Sparkles, Loader2, Target, Zap } from "lucide-react";

type Stance = "BUY" | "SELL" | "HOLD";
type Asset = "XAU/USD"; // Abhi focus sirf Gold par hai

interface AssetData {
  price: string;
  change: number;
  stance: Stance;
  confidence: number;
}

const goldData: AssetData = { price: "$2,648.50", change: 1.24, stance: "BUY", confidence: 87 };

export const AIPredictionWidget = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentData, setCurrentData] = useState<AssetData>(goldData);

  // Simulation: Har 30 second baad AI "re-analyze" karta hai
  useEffect(() => {
    const interval = setInterval(() => {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const stanceConfig = {
    BUY: {
      icon: TrendingUp,
      color: "#10B981", // Your Neon Green
      bgColor: "bg-neon-green/10",
      borderColor: "border-neon-green/30",
      shadow: "0 0 30px -5px rgba(16, 185, 129, 0.3)",
      text: "Bullish Outlook"
    },
    SELL: {
      icon: TrendingDown,
      color: "#F43F5E", // Neon Red
      bgColor: "bg-neon-red/10",
      borderColor: "border-neon-red/30",
      shadow: "0 0 30px -5px rgba(244, 63, 94, 0.3)",
      text: "Bearish Outlook"
    },
    HOLD: {
      icon: Minus,
      color: "#F59E0B", // Amber
      bgColor: "bg-neon-amber/10",
      borderColor: "border-neon-amber/30",
      shadow: "0 0 30px -5px rgba(245, 158, 11, 0.3)",
      text: "Neutral Zone"
    },
  };

  const config = stanceConfig[currentData.stance];
  const Icon = config.icon;

  return (
    <div className="glass-card p-6 gradient-border relative overflow-hidden h-full flex flex-col justify-between">
      {/* Background Ambient Glow */}
      <div 
        className="absolute -right-20 -top-20 w-40 h-40 rounded-full blur-[100px] transition-all duration-1000"
        style={{ backgroundColor: config.color }}
      />

      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Brain className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground tracking-tight">Neural Engine v2</h3>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">XAU/USD Analysis</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 border border-white/10">
          <Zap className="w-3 h-3 text-primary animate-pulse" />
          <span className="text-[10px] font-bold text-primary tracking-tighter">AI LIVE</span>
        </div>
      </div>

      <div className="relative z-10 flex-1 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-10 flex flex-col items-center gap-4"
            >
              <Loader2 className="w-10 h-10 text-primary animate-spin" />
              <p className="text-xs text-muted-foreground font-mono animate-pulse">Calculating Market Delta...</p>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              {/* Stance Hero Section */}
              <div className="text-center">
                <div 
                  className={`inline-flex items-center gap-4 px-10 py-5 rounded-3xl border-2 transition-all duration-500 ${config.bgColor} ${config.borderColor}`}
                  style={{ boxShadow: config.shadow }}
                >
                  <Icon className="w-12 h-12" style={{ color: config.color }} />
                  <div>
                    <span className="block text-[10px] text-muted-foreground uppercase font-bold text-left">Signal</span>
                    <span className="text-5xl font-black tracking-tighter" style={{ color: config.color }}>
                      {currentData.stance}
                    </span>
                  </div>
                </div>
              </div>

              {/* Confidence Bar */}
              <div className="space-y-2">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">AI Confidence</span>
                  <span className="text-sm font-black" style={{ color: config.color }}>{currentData.confidence}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${currentData.confidence}%` }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: config.color, boxShadow: `0 0 10px ${config.color}` }}
                  />
                </div>
              </div>

              {/* Summary Text */}
              <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                <p className="text-[11px] text-muted-foreground leading-relaxed italic text-center">
                  "Neural patterns confirm <span className="text-foreground font-bold">{config.text}</span>. Institutional flow aligns with current price action at {currentData.price}."
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};