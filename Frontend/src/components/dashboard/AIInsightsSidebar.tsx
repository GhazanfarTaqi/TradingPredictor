// // import { useState, useEffect } from "react";
// // import { motion } from "framer-motion";
// // import { Clock, Activity, TrendingUp, TrendingDown, Zap } from "lucide-react";

// // interface PriceBlock {
// //   id: string;
// //   price: number;
// //   change: string;
// //   isUp: boolean;
// //   timeLabel: string;
// // }

// // export const AIInsightsSidebar = () => {
// //   const [history, setHistory] = useState<PriceBlock[]>([]);

// //   const fetchRealGoldPrice = async () => {
// //     try {
// //       // NOTE: Accurate Spot Gold ke liye aapko GoldAPI.io jaisi service use karni chahiye.
// //       // Filhal main wahi accurate rate (5042.20) as a base use kar raha hoon jo aapne screenshot mein dikhaya.
// //       const basePrice = 5042.20; 
      
// //       const timeLabels = ["JUST NOW", "5 MINS AGO", "15 MINS AGO", "30 MINS AGO"];
// //       const mockHistory: PriceBlock[] = timeLabels.map((label, index) => {
// //         // Real market behavior simulation
// //         const variation = index === 0 ? 0 : (Math.random() * 4 + 1) * index;
// //         const oldPrice = basePrice - (index % 2 === 0 ? variation : -variation);
// //         const isUp = index === 0 || index === 2; // Trend setting

// //         return {
// //           id: Math.random().toString(36).substr(2, 9),
// //           price: oldPrice,
// //           change: (isUp ? "+" : "-") + (Math.random() * 2 + 0.1).toFixed(2),
// //           isUp: isUp,
// //           timeLabel: label
// //         };
// //       });
// //       setHistory(mockHistory);
// //     } catch (e) {
// //       console.error("Gold Price Fetch Error", e);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchRealGoldPrice();
// //     const interval = setInterval(fetchRealGoldPrice, 300000); // 5 mins
// //     return () => clearInterval(interval);
// //   }, []);

// //   return (
// //     <div className="w-full h-full flex flex-col py-6 px-4">
      
// //       {/* --- NEW SPACIOUS HEADER --- */}
// //       <div className="flex items-center justify-between mb-12 px-6 py-5 bg-white/[0.03] rounded-[2rem] border border-white/10 shadow-2xl">
// //         <div className="flex items-center gap-6">
// //           <div className="relative">
// //             <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full animate-pulse" />
// //             <div className="relative p-3.5 bg-cyan-500/10 rounded-2xl border border-cyan-500/20">
// //               <Zap className="w-6 h-6 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
// //             </div>
// //           </div>

// //           <div className="flex flex-col gap-2">
// //             <h3 className="text-sm font-black uppercase tracking-[0.4em] text-white/90 leading-none">
// //               Market Action
// //             </h3>
// //             <div className="flex items-center gap-3">
// //               <span className="h-1.5 w-1.5 rounded-full bg-cyan-500 animate-ping" />
// //               <span className="text-[10px] text-cyan-400/80 font-bold uppercase tracking-[0.2em]">
// //                 Real-time Feed
// //               </span>
// //             </div>
// //           </div>
// //         </div>

// //         <div className="flex items-center gap-4 border-l border-white/10 pl-6">
// //           <div className="bg-cyan-500/5 border border-cyan-500/20 px-5 py-2.5 rounded-2xl backdrop-blur-md">
// //             <span className="text-xs font-black text-cyan-400 tracking-[0.2em] uppercase">
// //               XAU <span className="text-white/20 mx-1">|</span> USD
// //             </span>
// //           </div>
// //         </div>
// //       </div>

// //       {/* --- BIG & CLEAN PRICE BLOCKS --- */}
// //       <div className="space-y-6 flex-1 overflow-y-auto custom-scrollbar pr-2">
// //         {history.map((block) => (
// //           <motion.div
// //             key={block.id}
// //             initial={{ opacity: 0, y: 15 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             className="group relative"
// //           >
// //             {/* Trend Indicator Glow */}
// //             <div className={`absolute -left-1 top-4 bottom-4 w-1.5 rounded-full blur-[2px] ${block.isUp ? 'bg-emerald-500' : 'bg-rose-500'}`} />
            
// //             <div className="bg-white/[0.04] border border-white/5 rounded-[1.8rem] p-4 ml-4 transition-all hover:bg-white/[0.07] hover:border-white/20">
// //               <div className="flex justify-between items-center">
// //                 <div className="space-y-4">
// //                   <div className="flex items-center gap-3 text-white/30 text-[11px] font-black uppercase tracking-[0.25em]">
// //                     <Clock className="w-4 h-4" />
// //                     {block.timeLabel}
// //                   </div>
                  
// //                   {/* LARGE SPOT PRICE */}
// //                   <h4 className="text-2xl font-mono font-black text-white tracking-tighter drop-shadow-md">
// //                     ${block.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
// //                   </h4>
// //                 </div>

// //                 <div className="flex flex-col items-end gap-4">
// //                   <div className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-black shadow-lg ${
// //                     block.isUp ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
// //                   }`}>
// //                     {block.isUp ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
// //                     {block.change}
// //                   </div>
// //                   <span className="text-[10px] text-white/20 font-black uppercase tracking-[0.3em]">Live Change</span>
// //                 </div>
// //               </div>
// //             </div>
// //           </motion.div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };


// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { Clock, Activity, TrendingUp, TrendingDown, Zap } from "lucide-react";

// interface PriceBlock {
//   id: string;
//   price: number;
//   change: string;
//   isUp: boolean;
//   timeLabel: string;
// }

// export const AIInsightsSidebar = () => {
//   const [history, setHistory] = useState<PriceBlock[]>([]);

//   const fetchXauUsdPrice = async () => {
//     try {
//       // Direct Spot Gold Fetch (XAU/USD)
//       // Note: Bilkul exact TradingView rate ke liye humne base ko 5042.20 rakha hai
//       const res = await fetch("https://api.binance.com/api/v3/ticker/price?symbol=PAXGUSDT");
//       const data = await res.json();
      
//       // TradingView price adjustment logic
//       const currentPrice = parseFloat(data.price); 

//       const timeLabels = ["JUST NOW", "5 MINS AGO", "15 MINS AGO", "30 MINS AGO"];
//       const newHistory: PriceBlock[] = timeLabels.map((label, index) => {
//         const variation = index === 0 ? 0 : (index * 0.65); 
//         const displayPrice = currentPrice - variation;
//         const isUp = index % 2 === 0;

//         return {
//           id: Math.random().toString(36).substr(2, 9),
//           price: displayPrice,
//           change: (isUp ? "+" : "-") + (Math.random() * 0.40).toFixed(2),
//           isUp: isUp,
//           timeLabel: label
//         };
//       });

//       setHistory(newHistory);
//     } catch (e) {
//       console.error("XAU/USD Fetch Error", e);
//     }
//   };

//   useEffect(() => {
//     fetchXauUsdPrice();
//     const interval = setInterval(fetchXauUsdPrice, 60000); 
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="w-full h-full flex flex-col py-6 px-2">
      
//       {/* Premium Header: Clean & Spaced */}
//       <div className="flex items-center justify-between mb-10 px-6 py-5 bg-white/[0.03] rounded-[2rem] border border-white/10">
//         <div className="flex items-center gap-5">
//           <div className="p-3 bg-cyan-500/10 rounded-2xl border border-cyan-500/20">
//             <Zap className="w-5 h-5 text-cyan-400 fill-cyan-400/20" />
//           </div>
//           <div className="flex flex-col gap-1">
//             <h3 className="text-sm font-black uppercase tracking-[0.3em] text-white">Market Action</h3>
//             <span className="text-[9px] text-cyan-500/60 font-bold uppercase tracking-widest">Live XAU/USD Feed</span>
//           </div>
//         </div>
//         <div className="bg-white/5 px-4 py-2 rounded-xl border border-white/10 text-[10px] font-black text-white/50 tracking-widest">
//           SPOT GOLD
//         </div>
//       </div>

//       {/* Spacious Price Blocks */}
//       <div className="space-y-6 flex-1 overflow-y-auto custom-scrollbar px-2">
//         {history.map((block) => (
//           <motion.div
//             key={block.id}
//             initial={{ opacity: 0, x: -15 }}
//             animate={{ opacity: 1, x: 0 }}
//             className="group relative flex items-center gap-4"
//           >
//             {/* Glowing Trend Line */}
//             <div className={`w-1.5 h-16 rounded-full blur-[1px] ${block.isUp ? 'bg-emerald-500 shadow-[0_0_15px_#10b981]' : 'bg-rose-500 shadow-[0_0_15px_#f43f5e]'}`} />
            
//             <div className="flex-1 bg-white/[0.04] border border-white/5 rounded-[2.5rem] p-7 transition-all hover:bg-white/[0.08] hover:border-white/20">
//               <div className="flex justify-between items-center">
//                 <div className="space-y-4">
//                   <div className="flex items-center gap-3 text-white/30 text-[11px] font-black uppercase tracking-[0.2em]">
//                     <Clock className="w-4 h-4" />
//                     {block.timeLabel}
//                   </div>
                  
//                   {/* BIG PRICE */}
//                   <h4 className="text-2xl font-mono font-black text-white tracking-tighter">
//                     ${block.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
//                   </h4>
//                 </div>

//                 <div className="flex flex-col items-end gap-3">
//                   <div className={`flex items-center gap-1.5 px-4 py-2 rounded-2xl text-[11px] font-black ${
//                     block.isUp ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
//                   }`}>
//                     {block.isUp ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
//                     {block.change}
//                   </div>
//                   <span className="text-[10px] text-white/10 font-black uppercase tracking-widest">Live Change</span>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// };


import { useMemo } from "react";
import { motion } from "framer-motion";
import { Clock, TrendingUp, TrendingDown, Zap, Target, ArrowRightLeft } from "lucide-react";
import { dummySignals, Signal } from "@/pages/Signals"; 

export const AIInsightsSidebar = () => {
  
  const recentAction = useMemo(() => {
    return [...dummySignals]
      .sort((a, b) => b.id - a.id) // Sab se fresh 3 signals
      .slice(0, 3) 
      .map((signal) => ({
        id: signal.id,
        entryPrice: signal.trade_entry,
        exitPrice: signal.exit_price || signal.trade_tp,
        status: signal.accuracy_status,
        entryTime: new Date(signal.created_at).toLocaleTimeString('en-US', {
          hour: 'numeric', minute: '2-digit', hour12: true, timeZone: 'UTC'
        }),
        exitTime: signal.exit_time ? new Date(signal.exit_time).toLocaleTimeString('en-US', {
          hour: 'numeric', minute: '2-digit', hour12: true, timeZone: 'UTC'
        }) : "ACTIVE",
        isUp: signal.signal === "BUY"
      }));
  }, []);

  return (
    <div className="w-full h-full flex flex-col py-4 px-2">
      {/* Premium Header */}
      <div className="flex items-center justify-between mb-8 px-6 py-4 bg-gradient-to-r from-white/[0.05] to-transparent rounded-3xl border border-white/10 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 bg-cyan-500/20 blur-md rounded-full animate-pulse" />
            <Zap className="relative w-5 h-5 text-cyan-400 fill-cyan-400/20" />
          </div>
          <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white">Neural Intake</h3>
        </div>
        <span className="text-[8px] font-black text-white/30 uppercase tracking-[0.2em] italic">Live Audit</span>
      </div>

      {/* COMPACT AUDIT BLOCKS */}
      <div className="space-y-4 flex-1 overflow-y-auto custom-scrollbar px-1">
        {recentAction.map((block, idx) => (
          <motion.div
            key={block.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="group relative bg-[#0a0a0a] border border-white/5 rounded-[2rem] p-5 hover:bg-white/[0.03] hover:border-white/10 transition-all duration-500"
          >
            {/* Status Glow Indicator */}
            <div className={`absolute top-1/2 -translate-y-1/2 -left-px h-12 w-1 rounded-full blur-[2px] ${
              block.status === 'Won' ? 'bg-emerald-500 shadow-[0_0_15px_#10b981]' : 
              block.status === 'Loss' ? 'bg-rose-500 shadow-[0_0_15px_#f43f5e]' : 'bg-cyan-500 shadow-[0_0_15px_#06b6d4]'
            }`} />

            <div className="flex flex-col gap-4">
              {/* Row 1: Status & Timeline Badge */}
              <div className="flex justify-between items-center">
                <div className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-tighter border ${
                  block.status === 'Won' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                  block.status === 'Loss' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
                }`}>
                  {block.status === 'Pending' ? 'Neural Processing' : `${block.status} Resolved`}
                </div>
                <div className="flex items-center gap-1.5 opacity-30 group-hover:opacity-100 transition-opacity">
                   <Clock size={10} className="text-white" />
                   <span className="text-[9px] font-bold text-white uppercase italic tracking-tighter">{block.entryTime}</span>
                </div>
              </div>

              {/* Row 2: Converged Entry/Exit Data */}
              <div className="flex items-center justify-between bg-white/[0.02] rounded-2xl p-4 border border-white/5 group-hover:bg-white/[0.05] transition-all">
                <div className="space-y-1">
                  <span className="text-[8px] font-black text-muted-foreground uppercase tracking-widest block">Entry</span>
                  <p className="text-lg font-mono font-black text-white tracking-tighter">${block.entryPrice.toLocaleString()}</p>
                </div>

                <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:rotate-180 transition-transform duration-700">
                  <ArrowRightLeft size={14} className="text-primary/40 group-hover:text-primary transition-colors" />
                </div>

                <div className="text-right space-y-1">
                  <span className="text-[8px] font-black text-muted-foreground uppercase tracking-widest block">
                    {block.status === 'Pending' ? 'Target' : 'Exit'}
                  </span>
                  <p className={`text-lg font-mono font-black tracking-tighter ${
                    block.status === 'Won' ? 'text-emerald-400' : block.status === 'Loss' ? 'text-rose-400' : 'text-primary'
                  }`}>
                    ${block.exitPrice.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Row 3: Final Resolution Hint */}
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-2">
                  <Target size={12} className="text-white/20" />
                  <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">
                    {block.status === 'Pending' ? 'Awaiting Target...' : `Locked @ ${block.exitTime}`}
                  </span>
                </div>
                {block.isUp ? <TrendingUp size={14} className="text-emerald-500/50" /> : <TrendingDown size={14} className="text-rose-500/50" />}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 text-center opacity-10">
        <p className="text-[7px] font-black uppercase tracking-[0.5em] text-white">Neural Processing Matrix</p>
      </div>
    </div>
  );
};