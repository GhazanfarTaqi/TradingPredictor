// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { AlertTriangle, Shield, XOctagon, Zap, ZapOff } from "lucide-react";

// type MarketCondition = "dangerous" | "caution" | "secure";

// export const TrafficLightWidget = () => {
//   const [condition, setCondition] = useState<MarketCondition>("secure");
//   const [isSimulating, setIsSimulating] = useState(false);

//   useEffect(() => {
//     if (!isSimulating) return;

//     const interval = setInterval(() => {
//       const conditions: MarketCondition[] = ["dangerous", "caution", "secure"];
//       const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
//       setCondition(randomCondition);
//     }, 10000);

//     return () => clearInterval(interval);
//   }, [isSimulating]);

//   const conditionConfig = {
//     dangerous: {
//       title: "High Risk Zone",
//       description: "Extreme volatility detected. Markets are highly unpredictable. Avoid new entries and consider reducing exposure.",
//       icon: XOctagon,
//     },
//     caution: {
//       title: "Proceed with Caution",
//       description: "Moderate market fluctuations observed. Enter at your own risk with strict stop-loss orders in place.",
//       icon: AlertTriangle,
//     },
//     secure: {
//       title: "Favorable Conditions",
//       description: "Low volatility environment. Market conditions are stable with strong directional signals from AI analysis.",
//       icon: Shield,
//     },
//   };

//   const config = conditionConfig[condition];
//   const Icon = config.icon;

//   return (
//     <div className="glass-card p-6 gradient-border">
//       <div className="flex items-center justify-between mb-4">
//         <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Market Entry Signal</h3>
//         <button
//           onClick={() => setIsSimulating(!isSimulating)}
//           className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
//             isSimulating
//               ? "bg-primary/20 text-primary border border-primary/50"
//               : "bg-secondary/50 text-muted-foreground border border-border/50 hover:bg-secondary"
//           }`}
//         >
//           {isSimulating ? (
//             <>
//               <Zap className="w-3 h-3 animate-pulse" />
//               Live Feed
//             </>
//           ) : (
//             <>
//               <ZapOff className="w-3 h-3" />
//               Simulate
//             </>
//           )}
//         </button>
//       </div>

//       <div className="flex items-center gap-6 mb-6">
//         {/* Traffic Lights */}
//         <div className="flex flex-col gap-3 p-4 rounded-2xl bg-background/50 border border-border/30">
//           {/* Red Light */}
//           <motion.div
//             animate={{
//               scale: condition === "dangerous" ? [1, 1.05, 1] : 1,
//               boxShadow: condition === "dangerous" 
//                 ? ["0 0 20px hsl(var(--neon-red) / 0.4)", "0 0 40px hsl(var(--neon-red) / 0.6)", "0 0 20px hsl(var(--neon-red) / 0.4)"]
//                 : "none",
//             }}
//             transition={{ repeat: condition === "dangerous" ? Infinity : 0, duration: 2 }}
//             className={`traffic-light ${
//               condition === "dangerous"
//                 ? "bg-neon-red neon-glow-red"
//                 : "bg-neon-red/20 border border-neon-red/30"
//             }`}
//           >
//             {condition === "dangerous" && <XOctagon className="w-8 h-8 text-white" />}
//           </motion.div>

//           {/* Yellow Light */}
//           <div
//             className={`traffic-light ${
//               condition === "caution"
//                 ? "bg-neon-amber neon-glow-amber"
//                 : "bg-neon-amber/20 border border-neon-amber/30"
//             }`}
//           >
//             {condition === "caution" && <AlertTriangle className="w-8 h-8 text-white" />}
//           </div>

//           {/* Green Light */}
//           <motion.div
//             animate={{
//               boxShadow: condition === "secure" 
//                 ? ["0 0 20px hsl(var(--neon-green) / 0.4)", "0 0 40px hsl(var(--neon-green) / 0.8)", "0 0 20px hsl(var(--neon-green) / 0.4)"]
//                 : "none",
//             }}
//             transition={{ repeat: condition === "secure" ? Infinity : 0, duration: 2 }}
//             className={`traffic-light ${
//               condition === "secure"
//                 ? "bg-neon-green neon-glow-green"
//                 : "bg-neon-green/20 border border-neon-green/30"
//             }`}
//           >
//             {condition === "secure" && <Shield className="w-8 h-8 text-white" />}
//           </motion.div>
//         </div>

//         {/* Status Info */}
//         <div className="flex-1">
//           <div className="flex items-center gap-3 mb-3">
//             <motion.div
//               key={condition}
//               initial={{ scale: 0.8, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               className={`w-12 h-12 rounded-xl flex items-center justify-center ${
//                 condition === "dangerous"
//                   ? "bg-neon-red/20"
//                   : condition === "caution"
//                   ? "bg-neon-amber/20"
//                   : "bg-neon-green/20"
//               }`}
//             >
//               <Icon
//                 className={`w-6 h-6 ${
//                   condition === "dangerous"
//                     ? "text-neon-red"
//                     : condition === "caution"
//                     ? "text-neon-amber"
//                     : "text-neon-green"
//                 }`}
//               />
//             </motion.div>
//             <motion.h4
//               key={`title-${condition}`}
//               initial={{ opacity: 0, x: -10 }}
//               animate={{ opacity: 1, x: 0 }}
//               className={`text-xl font-bold ${
//                 condition === "dangerous"
//                   ? "text-neon-red neon-text-red"
//                   : condition === "caution"
//                   ? "text-neon-amber neon-text-amber"
//                   : "text-neon-green neon-text-green"
//               }`}
//             >
//               {config.title}
//             </motion.h4>
//           </div>
//           <motion.p
//             key={`desc-${condition}`}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="text-sm text-muted-foreground leading-relaxed"
//           >
//             {config.description}
//           </motion.p>
//         </div>
//       </div>

//       {/* Legend */}
//       <div className="grid grid-cols-3 gap-2 pt-4 border-t border-border/30">
//         <div className="flex items-center gap-2">
//           <div className="w-3 h-3 rounded-full bg-neon-red" />
//           <span className="text-xs text-muted-foreground">Dangerous</span>
//         </div>
//         <div className="flex items-center gap-2">
//           <div className="w-3 h-3 rounded-full bg-neon-amber" />
//           <span className="text-xs text-muted-foreground">Caution</span>
//         </div>
//         <div className="flex items-center gap-2">
//           <div className="w-3 h-3 rounded-full bg-neon-green" />
//           <span className="text-xs text-muted-foreground">Secure</span>
//         </div>
//       </div>
//     </div>
//   );
// };



import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, AlertCircle, StopCircle, Activity, Globe } from "lucide-react";

type MarketCondition = "dangerous" | "caution" | "secure";

export const TrafficLightWidget = () => {
  const [condition, setCondition] = useState<MarketCondition>("secure");
  const [isLive, setIsLive] = useState(true);

  const statusMap = {
    dangerous: {
      label: "High Risk",
      color: "text-red-500",
      bg: "bg-red-500/5",
      border: "border-red-500/20",
      dot: "bg-red-500",
      icon: StopCircle,
      desc: "Volatility spike detected. Neutralize positions."
    },
    caution: {
      label: "Caution",
      color: "text-amber-500",
      bg: "bg-amber-500/5",
      border: "border-amber-500/20",
      dot: "bg-amber-500",
      icon: AlertCircle,
      desc: "Market uncertainty. Tighten stop-loss levels."
    },
    secure: {
      label: "Optimal",
      color: "text-emerald-500",
      bg: "bg-emerald-500/5",
      border: "border-emerald-500/20",
      dot: "bg-emerald-500",
      icon: Shield,
      desc: "Stable trend confirmed. Safe for entry."
    }
  };

  const current = statusMap[condition];

  return (
    <div className="w-full max-w-md bg-[#0c0c0c] border border-white/10 rounded-3xl p-6 shadow-xl font-sans">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-white/5 rounded-lg">
            <Activity className="w-4 h-4 text-primary" />
          </div>
          <span className="text-xs font-bold tracking-widest text-white/50 uppercase">Sentinel Node</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-bold text-emerald-500 uppercase">Live Engine</span>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Minimalist Vertical Lights */}
        <div className="flex flex-col gap-3 p-1.5 bg-white/[0.03] border border-white/5 rounded-2xl">
          {(Object.keys(statusMap) as MarketCondition[]).map((type) => (
            <button
              key={type}
              onClick={() => setCondition(type)}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                condition === type 
                ? `${statusMap[type].bg} border border-white/10 shadow-lg` 
                : "opacity-20 hover:opacity-40"
              }`}
            >
              <div className={`w-2.5 h-2.5 rounded-full ${statusMap[type].dot}`} />
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={condition}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-2 mb-1">
                <current.icon className={`w-4 h-4 ${current.color}`} />
                <span className={`text-sm font-black uppercase tracking-tight ${current.color}`}>
                  {current.label}
                </span>
              </div>
              <h4 className="text-2xl font-bold text-white mb-2 tracking-tight">
                {condition === 'secure' ? 'Strong Buy Signal' : condition === 'caution' ? 'Wait for Confirm' : 'Avoid Market'}
              </h4>
              <p className="text-xs text-white/40 leading-relaxed font-medium">
                {current.desc}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-8 pt-4 border-t border-white/5 flex justify-between items-center">
        <div className="flex items-center gap-2 text-white/30">
          <Globe className="w-3 h-3" />
          <span className="text-[10px] font-medium uppercase">Global Sentiment: 74%</span>
        </div>
        <button className="text-[10px] font-bold text-white/60 hover:text-white transition-colors uppercase tracking-widest">
          View Report →
        </button>
      </div>
    </div>
  );
};