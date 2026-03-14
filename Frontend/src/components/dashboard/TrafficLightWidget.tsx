// // import { useState, useEffect } from "react";
// // import { motion } from "framer-motion";
// // import { AlertTriangle, Shield, XOctagon, Zap, ZapOff } from "lucide-react";

// // type MarketCondition = "dangerous" | "caution" | "secure";

// // export const TrafficLightWidget = () => {
// //   const [condition, setCondition] = useState<MarketCondition>("secure");
// //   const [isSimulating, setIsSimulating] = useState(false);

// //   useEffect(() => {
// //     if (!isSimulating) return;

// //     const interval = setInterval(() => {
// //       const conditions: MarketCondition[] = ["dangerous", "caution", "secure"];
// //       const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
// //       setCondition(randomCondition);
// //     }, 10000);

// //     return () => clearInterval(interval);
// //   }, [isSimulating]);

// //   const conditionConfig = {
// //     dangerous: {
// //       title: "High Risk Zone",
// //       description: "Extreme volatility detected. Markets are highly unpredictable. Avoid new entries and consider reducing exposure.",
// //       icon: XOctagon,
// //     },
// //     caution: {
// //       title: "Proceed with Caution",
// //       description: "Moderate market fluctuations observed. Enter at your own risk with strict stop-loss orders in place.",
// //       icon: AlertTriangle,
// //     },
// //     secure: {
// //       title: "Favorable Conditions",
// //       description: "Low volatility environment. Market conditions are stable with strong directional signals from AI analysis.",
// //       icon: Shield,
// //     },
// //   };

// //   const config = conditionConfig[condition];
// //   const Icon = config.icon;

// //   return (
// //     <div className="glass-card p-6 gradient-border">
// //       <div className="flex items-center justify-between mb-4">
// //         <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Market Entry Signal</h3>
// //         <button
// //           onClick={() => setIsSimulating(!isSimulating)}
// //           className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
// //             isSimulating
// //               ? "bg-primary/20 text-primary border border-primary/50"
// //               : "bg-secondary/50 text-muted-foreground border border-border/50 hover:bg-secondary"
// //           }`}
// //         >
// //           {isSimulating ? (
// //             <>
// //               <Zap className="w-3 h-3 animate-pulse" />
// //               Live Feed
// //             </>
// //           ) : (
// //             <>
// //               <ZapOff className="w-3 h-3" />
// //               Simulate
// //             </>
// //           )}
// //         </button>
// //       </div>

// //       <div className="flex items-center gap-6 mb-6">
// //         {/* Traffic Lights */}
// //         <div className="flex flex-col gap-3 p-4 rounded-2xl bg-background/50 border border-border/30">
// //           {/* Red Light */}
// //           <motion.div
// //             animate={{
// //               scale: condition === "dangerous" ? [1, 1.05, 1] : 1,
// //               boxShadow: condition === "dangerous" 
// //                 ? ["0 0 20px hsl(var(--neon-red) / 0.4)", "0 0 40px hsl(var(--neon-red) / 0.6)", "0 0 20px hsl(var(--neon-red) / 0.4)"]
// //                 : "none",
// //             }}
// //             transition={{ repeat: condition === "dangerous" ? Infinity : 0, duration: 2 }}
// //             className={`traffic-light ${
// //               condition === "dangerous"
// //                 ? "bg-neon-red neon-glow-red"
// //                 : "bg-neon-red/20 border border-neon-red/30"
// //             }`}
// //           >
// //             {condition === "dangerous" && <XOctagon className="w-8 h-8 text-white" />}
// //           </motion.div>

// //           {/* Yellow Light */}
// //           <div
// //             className={`traffic-light ${
// //               condition === "caution"
// //                 ? "bg-neon-amber neon-glow-amber"
// //                 : "bg-neon-amber/20 border border-neon-amber/30"
// //             }`}
// //           >
// //             {condition === "caution" && <AlertTriangle className="w-8 h-8 text-white" />}
// //           </div>

// //           {/* Green Light */}
// //           <motion.div
// //             animate={{
// //               boxShadow: condition === "secure" 
// //                 ? ["0 0 20px hsl(var(--neon-green) / 0.4)", "0 0 40px hsl(var(--neon-green) / 0.8)", "0 0 20px hsl(var(--neon-green) / 0.4)"]
// //                 : "none",
// //             }}
// //             transition={{ repeat: condition === "secure" ? Infinity : 0, duration: 2 }}
// //             className={`traffic-light ${
// //               condition === "secure"
// //                 ? "bg-neon-green neon-glow-green"
// //                 : "bg-neon-green/20 border border-neon-green/30"
// //             }`}
// //           >
// //             {condition === "secure" && <Shield className="w-8 h-8 text-white" />}
// //           </motion.div>
// //         </div>

// //         {/* Status Info */}
// //         <div className="flex-1">
// //           <div className="flex items-center gap-3 mb-3">
// //             <motion.div
// //               key={condition}
// //               initial={{ scale: 0.8, opacity: 0 }}
// //               animate={{ scale: 1, opacity: 1 }}
// //               className={`w-12 h-12 rounded-xl flex items-center justify-center ${
// //                 condition === "dangerous"
// //                   ? "bg-neon-red/20"
// //                   : condition === "caution"
// //                   ? "bg-neon-amber/20"
// //                   : "bg-neon-green/20"
// //               }`}
// //             >
// //               <Icon
// //                 className={`w-6 h-6 ${
// //                   condition === "dangerous"
// //                     ? "text-neon-red"
// //                     : condition === "caution"
// //                     ? "text-neon-amber"
// //                     : "text-neon-green"
// //                 }`}
// //               />
// //             </motion.div>
// //             <motion.h4
// //               key={`title-${condition}`}
// //               initial={{ opacity: 0, x: -10 }}
// //               animate={{ opacity: 1, x: 0 }}
// //               className={`text-xl font-bold ${
// //                 condition === "dangerous"
// //                   ? "text-neon-red neon-text-red"
// //                   : condition === "caution"
// //                   ? "text-neon-amber neon-text-amber"
// //                   : "text-neon-green neon-text-green"
// //               }`}
// //             >
// //               {config.title}
// //             </motion.h4>
// //           </div>
// //           <motion.p
// //             key={`desc-${condition}`}
// //             initial={{ opacity: 0 }}
// //             animate={{ opacity: 1 }}
// //             className="text-sm text-muted-foreground leading-relaxed"
// //           >
// //             {config.description}
// //           </motion.p>
// //         </div>
// //       </div>

// //       {/* Legend */}
// //       <div className="grid grid-cols-3 gap-2 pt-4 border-t border-border/30">
// //         <div className="flex items-center gap-2">
// //           <div className="w-3 h-3 rounded-full bg-neon-red" />
// //           <span className="text-xs text-muted-foreground">Dangerous</span>
// //         </div>
// //         <div className="flex items-center gap-2">
// //           <div className="w-3 h-3 rounded-full bg-neon-amber" />
// //           <span className="text-xs text-muted-foreground">Caution</span>
// //         </div>
// //         <div className="flex items-center gap-2">
// //           <div className="w-3 h-3 rounded-full bg-neon-green" />
// //           <span className="text-xs text-muted-foreground">Secure</span>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };



// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Shield, AlertCircle, StopCircle, Activity, Globe } from "lucide-react";

// type MarketCondition = "dangerous" | "caution" | "secure";

// export const TrafficLightWidget = () => {
//   const [condition, setCondition] = useState<MarketCondition>("secure");
//   const [isLive, setIsLive] = useState(true);

//   const statusMap = {
//     dangerous: {
//       label: "High Risk",
//       color: "text-red-500",
//       bg: "bg-red-500/5",
//       border: "border-red-500/20",
//       dot: "bg-red-500",
//       icon: StopCircle,
//       desc: "Volatility spike detected. Neutralize positions."
//     },
//     caution: {
//       label: "Caution",
//       color: "text-amber-500",
//       bg: "bg-amber-500/5",
//       border: "border-amber-500/20",
//       dot: "bg-amber-500",
//       icon: AlertCircle,
//       desc: "Market uncertainty. Tighten stop-loss levels."
//     },
//     secure: {
//       label: "Optimal",
//       color: "text-emerald-500",
//       bg: "bg-emerald-500/5",
//       border: "border-emerald-500/20",
//       dot: "bg-emerald-500",
//       icon: Shield,
//       desc: "Stable trend confirmed. Safe for entry."
//     }
//   };

//   const current = statusMap[condition];

//   return (
//     <div className="w-full max-w-md bg-[#0c0c0c] border border-white/10 rounded-3xl p-6 shadow-xl font-sans">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-8">
//         <div className="flex items-center gap-2">
//           <div className="p-2 bg-white/5 rounded-lg">
//             <Activity className="w-4 h-4 text-primary" />
//           </div>
//           <span className="text-xs font-bold tracking-widest text-white/50 uppercase">Sentinel Node</span>
//         </div>
//         <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
//           <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
//           <span className="text-[10px] font-bold text-emerald-500 uppercase">Live Engine</span>
//         </div>
//       </div>

//       <div className="flex gap-6">
//         {/* Minimalist Vertical Lights */}
//         <div className="flex flex-col gap-3 p-1.5 bg-white/[0.03] border border-white/5 rounded-2xl">
//           {(Object.keys(statusMap) as MarketCondition[]).map((type) => (
//             <button
//               key={type}
//               onClick={() => setCondition(type)}
//               className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
//                 condition === type 
//                 ? `${statusMap[type].bg} border border-white/10 shadow-lg` 
//                 : "opacity-20 hover:opacity-40"
//               }`}
//             >
//               <div className={`w-2.5 h-2.5 rounded-full ${statusMap[type].dot}`} />
//             </button>
//           ))}
//         </div>

//         {/* Content Area */}
//         <div className="flex-1 flex flex-col justify-center">
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={condition}
//               initial={{ opacity: 0, x: 10 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: -10 }}
//               transition={{ duration: 0.2 }}
//             >
//               <div className="flex items-center gap-2 mb-1">
//                 <current.icon className={`w-4 h-4 ${current.color}`} />
//                 <span className={`text-sm font-black uppercase tracking-tight ${current.color}`}>
//                   {current.label}
//                 </span>
//               </div>
//               <h4 className="text-2xl font-bold text-white mb-2 tracking-tight">
//                 {condition === 'secure' ? 'Strong Buy Signal' : condition === 'caution' ? 'Wait for Confirm' : 'Avoid Market'}
//               </h4>
//               <p className="text-xs text-white/40 leading-relaxed font-medium">
//                 {current.desc}
//               </p>
//             </motion.div>
//           </AnimatePresence>
//         </div>
//       </div>

//       {/* Footer Info */}
//       <div className="mt-8 pt-4 border-t border-white/5 flex justify-between items-center">
//         <div className="flex items-center gap-2 text-white/30">
//           <Globe className="w-3 h-3" />
//           <span className="text-[10px] font-medium uppercase">Global Sentiment: 74%</span>
//         </div>
//         <button className="text-[10px] font-bold text-white/60 hover:text-white transition-colors uppercase tracking-widest">
//           View Report →
//         </button>
//       </div>
//     </div>
//   );
// };


import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, AlertCircle, StopCircle, Activity, Globe, Zap } from "lucide-react";
import { dummySignals, Signal } from "@/pages/Signals"; // dummySignals import kiya

type MarketCondition = "dangerous" | "caution" | "secure";

export const TrafficLightWidget = () => {
  
  // FIXED LOGIC: Hamesha latest signal (ID 16) ki situation pick karega
  const latestSituation = useMemo(() => {
    if (!dummySignals || dummySignals.length === 0) return "secure";
    
    // Data ko ID ke mutabiq sort karke sab se top entry uthayi
    const sorted = [...dummySignals].sort((a, b) => b.id - a.id);
    return sorted[0].market_situation as MarketCondition;
  }, []);

  const statusMap = {
    dangerous: {
      label: "Critical Risk",
      color: "text-red-500",
      bg: "bg-red-500/10",
      glow: "shadow-[0_0_25px_rgba(239,68,68,0.4)]",
      dot: "bg-red-500",
      icon: StopCircle,
      desc: "Neural sensors detect extreme volatility. Neutralize all open positions.",
      headline: "Avoid Entry"
    },
    caution: {
      label: "Caution Zone",
      color: "text-amber-500",
      bg: "bg-amber-500/10",
      glow: "shadow-[0_0_25px_rgba(245,158,11,0.4)]",
      dot: "bg-amber-500",
      icon: AlertCircle,
      desc: "Market uncertainty rising. Tighten stop-loss levels immediately.",
      headline: "Wait for Confirm"
    },
    secure: {
      label: "Optimal Flow",
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      glow: "shadow-[0_0_25px_rgba(16,185,129,0.4)]",
      dot: "bg-emerald-500",
      icon: Shield,
      desc: "Stable trend confirmed by AI. Market environment favorable for entry.",
      headline: "Strong Signal"
    }
  };

  const current = statusMap[latestSituation];

  return (
    <div className="w-full max-w-md bg-[#080808] border border-white/5 rounded-[3rem] p-8 shadow-2xl relative overflow-hidden group">
      
      {/* Dynamic Background Glow */}
      <div className={`absolute -right-20 -top-20 w-48 h-48 rounded-full blur-[110px] opacity-10 transition-all duration-1000 ${current.dot.replace('bg-', 'bg-')}`} />

      {/* Header Row */}
      <div className="flex items-center justify-between mb-10 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-white/5 rounded-2xl border border-white/10 group-hover:border-primary/30 transition-all">
            <Activity className="w-5 h-5 text-primary" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-black tracking-[0.3em] text-white/30 uppercase leading-none mb-1">Sentinel Node</span>
            <span className="text-[9px] font-bold text-primary uppercase tracking-widest italic">Neural Risk Audit</span>
          </div>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-black/50 border border-white/5 rounded-2xl">
          <Zap className="w-3 h-3 text-primary animate-pulse" />
          <span className="text-[9px] font-black text-white/50 uppercase tracking-tighter">Live Engine</span>
        </div>
      </div>

      <div className="flex gap-8 items-center relative z-10">
        {/* Industrial Traffic Console */}
        <div className="flex flex-col gap-5 p-2.5 bg-black border border-white/5 rounded-[2rem] shadow-inner">
          {(["dangerous", "caution", "secure"] as MarketCondition[]).map((type) => (
            <div
              key={type}
              className={`w-14 h-14 rounded-[1.2rem] flex items-center justify-center transition-all duration-700 ${
                latestSituation === type 
                ? `${statusMap[type].bg} border border-white/10 ${statusMap[type].glow}` 
                : "opacity-5 grayscale"
              }`}
            >
              <div className={`w-3.5 h-3.5 rounded-full ${statusMap[type].dot} ${latestSituation === type ? 'shadow-[0_0_15px_currentColor]' : ''}`} />
            </div>
          ))}
        </div>

        {/* Detailed Status Panel */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={latestSituation}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: "circOut" }}
              className="space-y-3"
            >
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10`}>
                 <current.icon className={`w-3 h-3 ${current.color}`} />
                 <span className={`text-[9px] font-black uppercase tracking-widest ${current.color}`}>{current.label}</span>
              </div>
              
              <h4 className="text-3xl font-black text-white italic tracking-tighter uppercase leading-none">
                {current.headline}
              </h4>
              
              <p className="text-[11px] text-muted-foreground leading-relaxed font-medium italic opacity-70 border-l-2 border-white/5 pl-3">
                "{current.desc}"
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Footer Connectivity Bar */}
      <div className="mt-10 pt-6 border-t border-white/5 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-2 text-white/20">
          <Globe className="w-3.5 h-3.5" />
          <span className="text-[9px] font-black uppercase tracking-[0.2em]">Global Liquidity: High</span>
        </div>
        <div className="flex gap-1.5">
           {[1,2,3].map(i => (
             <motion.div 
               key={i} 
               animate={{ opacity: [0.2, 0.5, 0.2] }} 
               transition={{ repeat: Infinity, duration: 2, delay: i * 0.3 }}
               className={`w-1.5 h-1.5 rounded-full ${latestSituation === 'secure' ? 'bg-emerald-500' : 'bg-white'}`} 
             />
           ))}
        </div>
      </div>
    </div>
  );
};