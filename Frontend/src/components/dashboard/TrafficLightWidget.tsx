import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Shield, XOctagon, Zap, ZapOff } from "lucide-react";

type MarketCondition = "dangerous" | "caution" | "secure";

export const TrafficLightWidget = () => {
  const [condition, setCondition] = useState<MarketCondition>("secure");
  const [isSimulating, setIsSimulating] = useState(false);

  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      const conditions: MarketCondition[] = ["dangerous", "caution", "secure"];
      const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
      setCondition(randomCondition);
    }, 10000);

    return () => clearInterval(interval);
  }, [isSimulating]);

  const conditionConfig = {
    dangerous: {
      title: "High Risk Zone",
      description: "Extreme volatility detected. Markets are highly unpredictable. Avoid new entries and consider reducing exposure.",
      icon: XOctagon,
    },
    caution: {
      title: "Proceed with Caution",
      description: "Moderate market fluctuations observed. Enter at your own risk with strict stop-loss orders in place.",
      icon: AlertTriangle,
    },
    secure: {
      title: "Favorable Conditions",
      description: "Low volatility environment. Market conditions are stable with strong directional signals from AI analysis.",
      icon: Shield,
    },
  };

  const config = conditionConfig[condition];
  const Icon = config.icon;

  return (
    <div className="glass-card p-6 gradient-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Market Entry Signal</h3>
        <button
          onClick={() => setIsSimulating(!isSimulating)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
            isSimulating
              ? "bg-primary/20 text-primary border border-primary/50"
              : "bg-secondary/50 text-muted-foreground border border-border/50 hover:bg-secondary"
          }`}
        >
          {isSimulating ? (
            <>
              <Zap className="w-3 h-3 animate-pulse" />
              Live Feed
            </>
          ) : (
            <>
              <ZapOff className="w-3 h-3" />
              Simulate
            </>
          )}
        </button>
      </div>

      <div className="flex items-center gap-6 mb-6">
        {/* Traffic Lights */}
        <div className="flex flex-col gap-3 p-4 rounded-2xl bg-background/50 border border-border/30">
          {/* Red Light */}
          <motion.div
            animate={{
              scale: condition === "dangerous" ? [1, 1.05, 1] : 1,
              boxShadow: condition === "dangerous" 
                ? ["0 0 20px hsl(var(--neon-red) / 0.4)", "0 0 40px hsl(var(--neon-red) / 0.6)", "0 0 20px hsl(var(--neon-red) / 0.4)"]
                : "none",
            }}
            transition={{ repeat: condition === "dangerous" ? Infinity : 0, duration: 2 }}
            className={`traffic-light ${
              condition === "dangerous"
                ? "bg-neon-red neon-glow-red"
                : "bg-neon-red/20 border border-neon-red/30"
            }`}
          >
            {condition === "dangerous" && <XOctagon className="w-8 h-8 text-white" />}
          </motion.div>

          {/* Yellow Light */}
          <div
            className={`traffic-light ${
              condition === "caution"
                ? "bg-neon-amber neon-glow-amber"
                : "bg-neon-amber/20 border border-neon-amber/30"
            }`}
          >
            {condition === "caution" && <AlertTriangle className="w-8 h-8 text-white" />}
          </div>

          {/* Green Light */}
          <motion.div
            animate={{
              boxShadow: condition === "secure" 
                ? ["0 0 20px hsl(var(--neon-green) / 0.4)", "0 0 40px hsl(var(--neon-green) / 0.8)", "0 0 20px hsl(var(--neon-green) / 0.4)"]
                : "none",
            }}
            transition={{ repeat: condition === "secure" ? Infinity : 0, duration: 2 }}
            className={`traffic-light ${
              condition === "secure"
                ? "bg-neon-green neon-glow-green"
                : "bg-neon-green/20 border border-neon-green/30"
            }`}
          >
            {condition === "secure" && <Shield className="w-8 h-8 text-white" />}
          </motion.div>
        </div>

        {/* Status Info */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <motion.div
              key={condition}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                condition === "dangerous"
                  ? "bg-neon-red/20"
                  : condition === "caution"
                  ? "bg-neon-amber/20"
                  : "bg-neon-green/20"
              }`}
            >
              <Icon
                className={`w-6 h-6 ${
                  condition === "dangerous"
                    ? "text-neon-red"
                    : condition === "caution"
                    ? "text-neon-amber"
                    : "text-neon-green"
                }`}
              />
            </motion.div>
            <motion.h4
              key={`title-${condition}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={`text-xl font-bold ${
                condition === "dangerous"
                  ? "text-neon-red neon-text-red"
                  : condition === "caution"
                  ? "text-neon-amber neon-text-amber"
                  : "text-neon-green neon-text-green"
              }`}
            >
              {config.title}
            </motion.h4>
          </div>
          <motion.p
            key={`desc-${condition}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-muted-foreground leading-relaxed"
          >
            {config.description}
          </motion.p>
        </div>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-3 gap-2 pt-4 border-t border-border/30">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-neon-red" />
          <span className="text-xs text-muted-foreground">Dangerous</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-neon-amber" />
          <span className="text-xs text-muted-foreground">Caution</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-neon-green" />
          <span className="text-xs text-muted-foreground">Secure</span>
        </div>
      </div>
    </div>
  );
};
