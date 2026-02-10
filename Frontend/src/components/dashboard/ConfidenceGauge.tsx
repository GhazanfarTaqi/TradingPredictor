import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Target, TrendingUp } from "lucide-react";

export const ConfidenceGauge = () => {
  const [percentage, setPercentage] = useState(85);
  const [accuracy, setAccuracy] = useState(76);
  const [trades, setTrades] = useState(1247);
  const [animatedPercentage, setAnimatedPercentage] = useState(0);

  useEffect(() => {
    // Animate the percentage on mount
    const timer = setTimeout(() => {
      setAnimatedPercentage(percentage);
    }, 100);
    return () => clearTimeout(timer);
  }, [percentage]);

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPercentage((prev) => {
        const change = Math.random() * 6 - 3; // -3 to +3
        return Math.max(50, Math.min(99, Math.round(prev + change)));
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setAnimatedPercentage(percentage);
  }, [percentage]);

  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedPercentage / 100) * circumference;

  const getColor = (value: number) => {
    if (value >= 75) return "text-neon-green";
    if (value >= 50) return "text-neon-amber";
    return "text-neon-red";
  };

  const getStrokeColor = (value: number) => {
    if (value >= 75) return "hsl(var(--neon-green))";
    if (value >= 50) return "hsl(var(--neon-amber))";
    return "hsl(var(--neon-red))";
  };

  const getGlowColor = (value: number) => {
    if (value >= 75) return "neon-green";
    if (value >= 50) return "neon-amber";
    return "neon-red";
  };

  return (
    <div className="glass-card p-6 gradient-border">
      <div className="flex items-center gap-2 mb-4">
        <Target className="w-4 h-4 text-primary" />
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Success Probability</h3>
      </div>

      <div className="flex flex-col items-center py-4">
        {/* Circular Gauge */}
        <div className="relative w-44 h-44">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
            {/* Background circle */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              fill="none"
              stroke="hsl(var(--secondary))"
              strokeWidth="12"
            />
            {/* Progress circle */}
            <motion.circle
              cx="80"
              cy="80"
              r={radius}
              fill="none"
              strokeWidth="12"
              strokeLinecap="round"
              stroke={getStrokeColor(percentage)}
              initial={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1, ease: "easeOut" }}
              style={{
                filter: `drop-shadow(0 0 10px hsl(var(--${getGlowColor(percentage)}) / 0.5))`,
              }}
            />
          </svg>
          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span
              key={percentage}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`text-4xl font-black ${getColor(percentage)}`}
            >
              {percentage}%
            </motion.span>
            <span className="text-xs text-muted-foreground">Confidence</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 w-full mt-6 pt-4 border-t border-border/30">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <TrendingUp className="w-3 h-3 text-neon-green" />
              <span className="text-lg font-bold text-neon-green">{accuracy}%</span>
            </div>
            <span className="text-xs text-muted-foreground">Win Rate</span>
          </div>
          <div className="text-center">
            <span className="text-lg font-bold">{trades.toLocaleString()}</span>
            <span className="text-xs text-muted-foreground block">Total Signals</span>
          </div>
        </div>
      </div>
    </div>
  );
};
