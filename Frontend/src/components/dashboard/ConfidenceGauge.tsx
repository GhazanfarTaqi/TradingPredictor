import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Target, TrendingUp } from "lucide-react";

// Aapka Dummy Data yahan define ho raha hai
const dummySignals = [
  { id: 16, confidence_score: 90.0, accuracy_status: "Won" },
  { id: 15, confidence_score: 90.0, accuracy_status: "Pending" },
  { id: 14, confidence_score: 90.0, accuracy_status: "Won" },
  { id: 13, confidence_score: 90.0, accuracy_status: "Won" },
  { id: 12, confidence_score: 92.0, accuracy_status: "Loss" },
  { id: 11, confidence_score: 92.0, accuracy_status: "Won" },
  { id: 10, confidence_score: 80.0, accuracy_status: "Won" },
  { id: 9, confidence_score: 80.0, accuracy_status: "Pending" },
  { id: 8, confidence_score: 80.0, accuracy_status: "Won" },
  { id: 7, confidence_score: 80.0, accuracy_status: "Won" },
  { id: 6, confidence_score: 80.0, accuracy_status: "Loss" },
  { id: 5, confidence_score: 80.0, accuracy_status: "Loss" },
  { id: 4, confidence_score: 80.0, accuracy_status: "Won" },
  { id: 3, confidence_score: 80.0, accuracy_status: "Won" },
  { id: 2, confidence_score: 85.0, accuracy_status: "Won" },
  { id: 1, confidence_score: 85.0, accuracy_status: "Won" }
];

export const ConfidenceGauge = () => {
  // Calculations based on dummy data
  const stats = useMemo(() => {
    const total = dummySignals.length;
    
    // Sirf completed trades (Won/Loss) ka win rate nikalte hain
    const completedTrades = dummySignals.filter(s => s.accuracy_status !== "Pending");
    const wonTrades = completedTrades.filter(s => s.accuracy_status === "Won");
    
    const winRate = completedTrades.length > 0 
      ? Math.round((wonTrades.length / completedTrades.length) * 100) 
      : 0;

    // Last signal ka confidence score
    const currentConfidence = dummySignals[0]?.confidence_score || 0;

    return { winRate, total, currentConfidence };
  }, []);

  const [animatedPercentage, setAnimatedPercentage] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedPercentage(stats.currentConfidence);
    }, 100);
    return () => clearTimeout(timer);
  }, [stats.currentConfidence]);

  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedPercentage / 100) * circumference;

  const getColor = (value: number) => {
    if (value >= 85) return "text-neon-green";
    if (value >= 70) return "text-neon-amber";
    return "text-neon-red";
  };

  const getStrokeColor = (value: number) => {
    if (value >= 85) return "hsl(var(--neon-green))";
    if (value >= 70) return "hsl(var(--neon-amber))";
    return "hsl(var(--neon-red))";
  };

  return (
    <div className="glass-card p-6 gradient-border">
      <div className="flex items-center gap-2 mb-4">
        <Target className="w-4 h-4 text-primary" />
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">AI Analysis Status</h3>
      </div>

      <div className="flex flex-col items-center py-4">
        <div className="relative w-44 h-44">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
            <circle cx="80" cy="80" r={radius} fill="none" stroke="hsl(var(--secondary))" strokeWidth="12" />
            <motion.circle
              cx="80" cy="80" r={radius} fill="none" strokeWidth="12" strokeLinecap="round"
              stroke={getStrokeColor(stats.currentConfidence)}
              initial={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1.5, ease: "circOut" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span
              key={stats.currentConfidence}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-4xl font-black ${getColor(stats.currentConfidence)}`}
            >
              {stats.currentConfidence}%
            </motion.span>
            <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">AI Confidence</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full mt-6 pt-4 border-t border-border/30">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <TrendingUp className="w-3 h-3 text-neon-green" />
              <span className="text-lg font-bold text-neon-green">{stats.winRate}%</span>
            </div>
            <span className="text-[10px] text-muted-foreground uppercase font-bold">Historical Accuracy</span>
          </div>
          <div className="text-center">
            <span className="text-lg font-bold text-white">{stats.total}</span>
            <span className="text-[10px] text-muted-foreground block uppercase font-bold">Total Processed</span>
          </div>
        </div>
      </div>
    </div>
  );
};