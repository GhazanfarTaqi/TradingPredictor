// // import { motion, AnimatePresence } from "framer-motion";
// // import { X, BrainCircuit, Activity, Info, BarChart3, AlertTriangle, Bolt, Zap } from "lucide-react";
// // import { Signal } from "@/pages/Signals";

// // export const SignalModal = ({ signal, onClose }: { signal: Signal | null, onClose: () => void }) => {
// //   if (!signal) return null;

// //   return (
// //     <AnimatePresence>
// //       <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
// //         <motion.div 
// //           initial={{ opacity: 0, scale: 0.9, y: 30 }}
// //           animate={{ opacity: 1, scale: 1, y: 0 }}
// //           exit={{ opacity: 0, scale: 0.9, y: 30 }}
// //           className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden"
// //         >
// //           {/* Top Decorative Bar */}
// //           <div className={`h-2 w-full ${signal.signal === "BUY" ? "bg-neon-green" : "bg-neon-red"}`} />

// //           <div className="p-8 md:p-12">
// //             <div className="flex justify-between items-start mb-10">
// //               <div className="flex items-center gap-4">
// //                 <div className="p-3 bg-primary/10 rounded-xl">
// //                   <BrainCircuit className="text-primary w-6 h-6" />
// //                 </div>
// //                 <div>
// //                   <h2 className="text-3xl font-black text-white tracking-tighter uppercase">{signal.module} <span className="text-primary opacity-50">ANALYSIS</span></h2>
// //                   <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest italic">{signal.pattern} Identified</p>
// //                 </div>
// //               </div>
// //               <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors text-muted-foreground hover:text-white">
// //                 <X size={28} />
// //               </button>
// //             </div>

// //             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
// //               <div className="p-5 bg-white/5 rounded-2xl border border-white/5">
// //                 <div className="flex items-center gap-2 mb-2 text-muted-foreground uppercase text-[10px] font-black">
// //                   <Activity size={14} className="text-primary" /> Entry Level
// //                 </div>
// //                 <p className="text-xl font-mono font-bold text-white">${signal.trade_entry.toLocaleString()}</p>
// //               </div>
// //               <div className="p-5 bg-white/5 rounded-2xl border border-white/5">
// //                 <div className="flex items-center gap-2 mb-2 text-muted-foreground uppercase text-[10px] font-black">
// //                   <BarChart3 size={14} className="text-neon-green" /> Take Profit
// //                 </div>
// //                 <p className="text-xl font-mono font-bold text-neon-green">${signal.trade_tp.toLocaleString()}</p>
// //               </div>
// //               <div className="p-5 bg-white/5 rounded-2xl border border-white/5">
// //                 <div className="flex items-center gap-2 mb-2 text-muted-foreground uppercase text-[10px] font-black">
// //                   <AlertTriangle size={14} className="text-neon-red" /> Stop Loss
// //                 </div>
// //                 <p className="text-xl font-mono font-bold text-neon-red">${signal.trade_sl.toLocaleString()}</p>
// //               </div>
// //             </div>

// //             <div className="space-y-6">
// //               <div className="flex items-center gap-3">
// //                 <Info size={18} className="text-primary" />
// //                 <h3 className="text-sm font-black uppercase tracking-widest text-white">Execution Reasoning</h3>
// //               </div>
// //               <div className="bg-secondary/20 p-6 rounded-[1.5rem] border border-white/5 relative overflow-hidden">
// //                 <div className="absolute top-0 left-0 w-1 h-full bg-primary/30" />
// //                 <p className="text-sm leading-relaxed text-slate-300 italic font-medium">
// //                   "{signal.reasoning}"
// //                 </p>
// //               </div>
// //             </div>

// //             <div className="mt-10 pt-8 border-t border-white/5 flex items-center justify-between">
// //               <div className="flex items-center gap-3">
// //                 <Zap className="text-neon-amber w-5 h-5 fill-neon-amber" />
// //                 <span className="text-xs font-black text-muted-foreground uppercase">Neural Confidence: {signal.confidence_score}%</span>
// //               </div>
// //               <p className="text-[10px] font-mono text-muted-foreground uppercase opacity-50">Signal ID: NT-{signal.id}</p>
// //             </div>
// //           </div>
// //         </motion.div>
// //       </div>
// //     </AnimatePresence>
// //   );
// // };

// // import { motion, AnimatePresence } from "framer-motion";
// // import { X, BrainCircuit, Activity, Info, BarChart3, AlertTriangle, Clock, Zap, Target, TrendingUp, TrendingDown } from "lucide-react";
// // import { Signal } from "@/pages/Signals";

// // export const SignalModal = ({ signal, onClose }: { signal: Signal | null, onClose: () => void }) => {
// //   if (!signal) return null;

// //   const isCompleted = signal.accuracy_status === "Won" || signal.accuracy_status === "Loss";

// //   return (
// //     <AnimatePresence>
// //       <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl">
// //         <motion.div 
// //           initial={{ opacity: 0, scale: 0.9, y: 30 }}
// //           animate={{ opacity: 1, scale: 1, y: 0 }}
// //           exit={{ opacity: 0, scale: 0.9, y: 30 }}
// //           className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden"
// //         >
// //           {/* Top Direction Indicator Bar */}
// //           <div className={`h-2 w-full ${signal.signal === "BUY" ? "bg-neon-green" : "bg-neon-red"}`} />

// //           <div className="p-8 md:p-12">
// //             {/* Header Section */}
// //             <div className="flex justify-between items-start mb-10">
// //               <div className="flex items-center gap-5">
// //                 <div className={`p-4 rounded-2xl ${signal.signal === "BUY" ? "bg-neon-green/10" : "bg-neon-red/10"}`}>
// //                   {signal.signal === "BUY" ? <TrendingUp className="text-neon-green w-8 h-8" /> : <TrendingDown className="text-neon-red w-8 h-8" />}
// //                 </div>
// //                 <div>
// //                   <div className="flex items-center gap-2">
// //                     <h2 className={`text-4xl font-black italic tracking-tighter ${signal.signal === "BUY" ? "text-neon-green" : "text-neon-red"}`}>
// //                       {signal.signal}
// //                     </h2>
// //                     <span className="text-white/20 text-2xl font-light">/</span>
// //                     <h2 className="text-2xl font-bold text-white tracking-tight">{signal.module}</h2>
// //                   </div>
// //                   <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.3em]">{signal.pattern}</p>
// //                 </div>
// //               </div>
// //               <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors text-muted-foreground hover:text-white">
// //                 <X size={28} />
// //               </button>
// //             </div>

// //             {/* Trade Levels Grid */}
// //             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
// //               <div className="p-5 bg-white/5 rounded-2xl border border-white/5">
// //                 <span className="text-[9px] font-black uppercase text-muted-foreground block mb-1 tracking-widest text-center">Entry Price</span>
// //                 <p className="text-xl font-mono font-bold text-white text-center">${signal.trade_entry.toLocaleString()}</p>
// //               </div>
// //               <div className="p-5 bg-white/5 rounded-2xl border border-white/5">
// //                 <span className="text-[9px] font-black uppercase text-neon-green/70 block mb-1 tracking-widest text-center">Take Profit</span>
// //                 <p className="text-xl font-mono font-bold text-neon-green text-center">${signal.trade_tp.toLocaleString()}</p>
// //               </div>
// //               <div className="p-5 bg-white/5 rounded-2xl border border-white/5">
// //                 <span className="text-[9px] font-black uppercase text-neon-red/70 block mb-1 tracking-widest text-center">Stop Loss</span>
// //                 <p className="text-xl font-mono font-bold text-neon-red text-center">${signal.trade_sl.toLocaleString()}</p>
// //               </div>
// //             </div>

// //             {/* Completed Trade Details (Exit Info) */}
// //             {isCompleted && (
// //               <motion.div 
// //                 initial={{ opacity: 0, y: 10 }}
// //                 animate={{ opacity: 1, y: 0 }}
// //                 className="mb-8 p-6 bg-primary/5 rounded-2xl border border-primary/20 flex flex-col md:flex-row justify-between items-center gap-6"
// //               >
// //                 <div className="flex items-center gap-4">
// //                   <div className="p-3 bg-primary/10 rounded-xl">
// //                     <Target className="text-primary w-5 h-5" />
// //                   </div>
// //                   <div>
// //                     <span className="text-[10px] font-black uppercase text-muted-foreground block">Exit Price</span>
// //                     <p className="text-lg font-mono font-bold text-white">${signal.exit_price?.toLocaleString() || "N/A"}</p>
// //                   </div>
// //                 </div>
// //                 <div className="flex items-center gap-4">
// //                   <div className="p-3 bg-primary/10 rounded-xl">
// //                     <Clock className="text-primary w-5 h-5" />
// //                   </div>
// //                   <div>
// //                     <span className="text-[10px] font-black uppercase text-muted-foreground block">Exit Time</span>
// //                     <p className="text-sm font-bold text-white">
// //                       {signal.exit_time ? new Date(signal.exit_time).toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true, month: 'short', day: 'numeric' }) : "N/A"}
// //                     </p>
// //                   </div>
// //                 </div>
// //               </motion.div>
// //             )}

// //             {/* AI Reasoning Section */}
// //             <div className="space-y-4 mb-10">
// //               <div className="flex items-center gap-3">
// //                 <BrainCircuit size={18} className="text-primary" />
// //                 <h3 className="text-xs font-black uppercase tracking-widest text-white">Neural Logic Breakdown</h3>
// //               </div>
// //               <div className="bg-[#121212] p-6 rounded-[1.5rem] border border-white/5 relative group">
// //                 <div className={`absolute top-0 left-0 w-1 h-full transition-colors ${signal.signal === "BUY" ? "bg-neon-green/50" : "bg-neon-red/50"}`} />
// //                 <p className="text-sm leading-relaxed text-slate-300 italic font-medium">
// //                   {signal.reasoning || "No detailed technical reasoning provided for this trade execution."}
// //                 </p>
// //               </div>
// //             </div>

// //             {/* Animated Confidence Section */}
// //             <div className="space-y-4">
// //               <div className="flex justify-between items-center">
// //                 <div className="flex items-center gap-2">
// //                   <Zap size={16} className="text-neon-amber animate-pulse fill-neon-amber" />
// //                   <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">AI Confidence Level</span>
// //                 </div>
// //                 <span className="text-sm font-black text-white">{signal.confidence_score}%</span>
// //               </div>

// //               <div className="relative h-3 w-full bg-white/5 rounded-full overflow-hidden">
// //                 {/* Glow Layer */}
// //                 <motion.div 
// //                   initial={{ width: 0 }}
// //                   animate={{ width: `${signal.confidence_score}%` }}
// //                   transition={{ duration: 1, ease: "easeOut" }}
// //                   className={`absolute top-0 left-0 h-full blur-sm opacity-50 ${signal.confidence_score > 85 ? 'bg-neon-green' : 'bg-primary'}`}
// //                 />
// //                 {/* Main Bar Layer */}
// //                 <motion.div 
// //                   initial={{ width: 0 }}
// //                   animate={{ width: `${signal.confidence_score}%` }}
// //                   transition={{ duration: 1, ease: "easeOut" }}
// //                   className={`absolute top-0 left-0 h-full rounded-full ${signal.confidence_score > 85 ? 'bg-neon-green shadow-[0_0_15px_#00ff88]' : 'bg-primary shadow-[0_0_15px_#0077ff]'}`}
// //                 >
// //                   {/* Line Animation Effect */}
// //                   <motion.div 
// //                     animate={{ x: ['-100%', '200%'] }}
// //                     transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
// //                     className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
// //                   />
// //                 </motion.div>
// //               </div>
// //             </div>
// //           </div>
// //         </motion.div>
// //       </div>
// //     </AnimatePresence>
// //   );
// // };

// import { motion, AnimatePresence } from "framer-motion";
// import { X, BrainCircuit, Activity, Info, BarChart3, AlertTriangle, Clock, Target, Zap, TrendingUp, TrendingDown } from "lucide-react";
// import { Signal } from "@/pages/Signals";

// export const SignalModal = ({ signal, onClose }: { signal: Signal | null, onClose: () => void }) => {
//   if (!signal) return null;

//   const isCompleted = signal.accuracy_status === "Won" || signal.accuracy_status === "Loss";

//   // Date formatting helper
//   const formatDateTime = (dateStr: string) => {
//     return new Date(dateStr).toLocaleString('en-US', {
//       month: 'short',
//       day: 'numeric',
//       hour: 'numeric',
//       minute: '2-digit',
//       hour12: true
//     });
//   };

//   return (
//     <AnimatePresence>
//       <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl" onClick={onClose}>
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9, y: 30 }}
//           animate={{ opacity: 1, scale: 1, y: 0 }}
//           exit={{ opacity: 0, scale: 0.9, y: 30 }}
//           className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden"
//           onClick={(e) => e.stopPropagation()}
//         >
//           {/* Top Decorative Bar */}
//           <div className={`h-2 w-full ${signal.signal === "BUY" ? "bg-neon-green" : "bg-neon-red"}`} />

//           <div className="p-8 md:p-12">
//             {/* Header with Type (Buy/Sell) */}
//             <div className="flex justify-between items-start mb-8">
//               <div className="flex items-center gap-5">
//                 <div className={`p-4 rounded-2xl ${signal.signal === "BUY" ? "bg-neon-green/10" : "bg-neon-red/10"}`}>
//                   {signal.signal === "BUY" ? <TrendingUp className="text-neon-green w-8 h-8" /> : <TrendingDown className="text-neon-red w-8 h-8" />}
//                 </div>
//                 <div>
//                   <div className="flex items-center gap-2">
//                     <h2 className={`text-4xl font-black italic tracking-tighter ${signal.signal === "BUY" ? "text-neon-green" : "text-neon-red"}`}>
//                       {signal.signal}
//                     </h2>
//                     <span className="text-white/20 text-2xl font-light">/</span>
//                     <h2 className="text-2xl font-bold text-white tracking-tight">{signal.module}</h2>
//                   </div>
//                   <div className="flex items-center gap-2 mt-1">
//                     <Clock size={12} className="text-muted-foreground" />
//                     <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
//                       Opened: {formatDateTime(signal.created_at)}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//               <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors text-muted-foreground hover:text-white">
//                 <X size={28} />
//               </button>
//             </div>

//             {/* Price Levels Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
//               <div className="p-5 bg-white/5 rounded-2xl border border-white/5 text-center">
//                 <span className="text-[9px] font-black uppercase text-muted-foreground block mb-1 tracking-widest">Entry Price</span>
//                 <p className="text-xl font-mono font-bold text-white">${signal.trade_entry.toLocaleString()}</p>
//               </div>
//               <div className="p-5 bg-white/5 rounded-2xl border border-white/5 text-center">
//                 <span className="text-[9px] font-black uppercase text-neon-green/70 block mb-1 tracking-widest">Take Profit</span>
//                 <p className="text-xl font-mono font-bold text-neon-green">${signal.trade_tp.toLocaleString()}</p>
//               </div>
//               <div className="p-5 bg-white/5 rounded-2xl border border-white/5 text-center">
//                 <span className="text-[9px] font-black uppercase text-neon-red/70 block mb-1 tracking-widest">Stop Loss</span>
//                 <p className="text-xl font-mono font-bold text-neon-red">${signal.trade_sl.toLocaleString()}</p>
//               </div>
//             </div>

//             {/* Exit Details for Completed Trades */}
//             {isCompleted && (
//               <div className="mb-8 p-6 bg-primary/5 rounded-2xl border border-primary/20 flex flex-col md:flex-row justify-between items-center gap-6">
//                 <div className="flex items-center gap-4">
//                   <div className="p-3 bg-primary/10 rounded-xl"><Target className="text-primary w-5 h-5" /></div>
//                   <div>
//                     <span className="text-[10px] font-black uppercase text-muted-foreground block">Exit Price</span>
//                     <p className="text-lg font-mono font-bold text-white">${signal.exit_price?.toLocaleString() || "N/A"}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-4">
//                   <div className="p-3 bg-primary/10 rounded-xl"><Clock className="text-primary w-5 h-5" /></div>
//                   <div>
//                     <span className="text-[10px] font-black uppercase text-muted-foreground block">Exit Time</span>
//                     <p className="text-sm font-bold text-white">{signal.exit_time ? formatDateTime(signal.exit_time) : "N/A"}</p>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* AI Reasoning Section */}
//             <div className="space-y-4 mb-10">
//               <div className="flex items-center gap-3">
//                 <BrainCircuit size={18} className="text-primary" />
//                 <h3 className="text-sm font-black uppercase tracking-widest text-white">Neural Logic Breakdown</h3>
//               </div>
//               <div className="bg-[#121212] p-6 rounded-[1.5rem] border border-white/5 relative">
//                 <div className={`absolute top-0 left-0 w-1 h-full ${signal.signal === "BUY" ? "bg-neon-green/40" : "bg-neon-red/40"}`} />
//                 <p className="text-sm leading-relaxed text-slate-300 italic font-medium">
//                   {signal.reasoning || "No detailed reasoning provided."}
//                 </p>
//               </div>
//             </div>

//             {/* Animated Confidence Level */}
//             <div className="space-y-4">
//               <div className="flex justify-between items-center">
//                 <div className="flex items-center gap-2">
//                   <Zap size={16} className="text-neon-amber animate-pulse fill-neon-amber" />
//                   <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Neural Confidence</span>
//                 </div>
//                 <span className="text-sm font-black text-white">{signal.confidence_score}%</span>
//               </div>

//               <div className="relative h-3 w-full bg-white/5 rounded-full overflow-hidden">
//                 {/* Glow layer */}
//                 <motion.div
//                   initial={{ width: 0 }}
//                   animate={{ width: `${signal.confidence_score}%` }}
//                   transition={{ duration: 1, ease: "easeOut" }}
//                   className={`absolute top-0 left-0 h-full blur-sm opacity-50 ${signal.confidence_score > 85 ? 'bg-neon-green' : 'bg-primary'}`}
//                 />
//                 {/* Main progress bar container*/}
//                 <motion.div
//                   initial={{ width: 0 }}
//                   animate={{ width: `${signal.confidence_score}%` }}
//                   transition={{ duration: 1.2, ease: "easeOut" }}
//                   className={`absolute top-0 left-0 h-full rounded-full ${signal.confidence_score > 85 ? 'bg-neon-green shadow-[0_0_15px_#00ff88]' : 'bg-primary shadow-[0_0_15px_#0077ff]'
//                     }`}
//                 >
//                   {/* Scanning line animation*/}
//                   <motion.div
//                     animate={{ x: ['-100%', '200%'] }}
//                     transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
//                     className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
//                   />
//               </motion.div>
//             </div>
//           </div>
//       </div>
//     </motion.div>
//       </div >
//     </AnimatePresence >
//   );
// };

import { motion, AnimatePresence } from "framer-motion";
import { X, BrainCircuit, Target, ShieldAlert, Clock, Zap, TrendingUp, TrendingDown, BarChart3 } from "lucide-react";
import { Signal } from "@/pages/Signals";

export const SignalModal = ({ signal, onClose }: { signal: Signal | null, onClose: () => void }) => {
  if (!signal) return null;

  const isCompleted = signal.accuracy_status === "Won" || signal.accuracy_status === "Loss";

  const formatDateTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl" onClick={onClose}>
        
        <style dangerouslySetInnerHTML={{ __html: `
          .custom-scrollbar::-webkit-scrollbar { width: 6px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
          .custom-scrollbar::-webkit-scrollbar-thumb { 
            background: #333; 
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #444; }
        `}} />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Decorative Bar */}
          <div className={`h-2 w-full shrink-0 ${signal.signal === "BUY" ? "bg-neon-green" : "bg-neon-red"}`} />

          <div className="p-8 md:p-12 overflow-y-auto custom-scrollbar flex-1">
            
            {/* Header */}
            <div className="flex justify-between items-start mb-8">
              <div className="flex items-center gap-5">
                <div className={`p-4 rounded-2xl ${signal.signal === "BUY" ? "bg-neon-green/10" : "bg-neon-red/10"}`}>
                  {signal.signal === "BUY" ? <TrendingUp className="text-neon-green w-8 h-8" /> : <TrendingDown className="text-neon-red w-8 h-8" />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className={`text-4xl font-black italic tracking-tighter ${signal.signal === "BUY" ? "text-neon-green" : "text-neon-red"}`}>
                      {signal.signal}
                    </h2>
                    <span className="text-white/20 text-2xl font-light">/</span>
                    <h2 className="text-2xl font-bold text-white tracking-tight">{signal.module}</h2>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock size={12} className="text-muted-foreground" />
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                      Opened: {formatDateTime(signal.created_at)}
                    </p>
                  </div>
                </div>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors text-muted-foreground hover:text-white">
                <X size={28} />
              </button>
            </div>

            {/* Price Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="p-5 bg-white/5 rounded-2xl border border-white/5 text-center">
                <span className="text-[9px] font-black uppercase text-muted-foreground block mb-1 tracking-widest">Entry Price</span>
                <p className="text-xl font-mono font-bold text-white">${signal.trade_entry.toLocaleString()}</p>
              </div>
              <div className="p-5 bg-white/5 rounded-2xl border border-white/5 text-center">
                <span className="text-[9px] font-black uppercase text-neon-green/70 block mb-1 tracking-widest">Take Profit</span>
                <p className="text-xl font-mono font-bold text-neon-green">${signal.trade_tp.toLocaleString()}</p>
              </div>
              <div className="p-5 bg-white/5 rounded-2xl border border-white/5 text-center">
                <span className="text-[9px] font-black uppercase text-neon-red/70 block mb-1 tracking-widest">Stop Loss</span>
                <p className="text-xl font-mono font-bold text-neon-red">${signal.trade_sl.toLocaleString()}</p>
              </div>
            </div>

            {/* Exit Details */}
            {isCompleted && (
              <div className="mb-8 p-6 bg-primary/5 rounded-2xl border border-primary/20 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-xl"><BarChart3 className="text-primary w-5 h-5" /></div>
                  <div>
                    <span className="text-[10px] font-black uppercase text-muted-foreground block">Exit Price</span>
                    <p className="text-lg font-mono font-bold text-white">${signal.exit_price?.toLocaleString() || "N/A"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-xl"><Clock className="text-primary w-5 h-5" /></div>
                  <div>
                    <span className="text-[10px] font-black uppercase text-muted-foreground block">Exit Time</span>
                    <p className="text-sm font-bold text-white">{signal.exit_time ? formatDateTime(signal.exit_time) : "N/A"}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Neural Logic */}
            <div className="space-y-4 mb-10">
              <div className="flex items-center gap-3">
                <BrainCircuit size={18} className="text-primary" />
                <h3 className="text-sm font-black uppercase tracking-widest text-white">Neural Logic Breakdown</h3>
              </div>
              <div className="bg-[#121212] p-6 rounded-[1.5rem] border border-white/5 relative">
                <div className={`absolute top-0 left-0 w-1 h-full ${signal.signal === "BUY" ? "bg-neon-green/40" : "bg-neon-red/40"}`} />
                <p className="text-sm leading-relaxed text-slate-300 italic font-medium whitespace-pre-wrap">
                  {signal.reasoning || "No detailed reasoning provided."}
                </p>
              </div>
            </div>

            {/* Animated Confidence - FIXED ERROR HERE */}
            <div className="space-y-4 pb-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Zap size={16} className="text-neon-amber animate-pulse fill-neon-amber" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Neural Confidence</span>
                </div>
                <span className="text-sm font-black text-white">{signal.confidence_score}%</span>
              </div>

              <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden relative">
                {/* Progress Bar Body */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${signal.confidence_score}%` }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className={`absolute top-0 left-0 h-full rounded-full ${
                    signal.confidence_score > 85 ? 'bg-neon-green shadow-[0_0_15px_#00ff88]' : 'bg-primary shadow-[0_0_15px_#0077ff]'
                  }`}
                />
                
                {/* Scanning Effect - FIXED: Separated from progress body to avoid relative/absolute conflict */}
                <motion.div
                  initial={{ left: "-100%" }}
                  animate={{ left: "200%" }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
                  className="absolute top-0 h-full w-24 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 z-10"
                />
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};