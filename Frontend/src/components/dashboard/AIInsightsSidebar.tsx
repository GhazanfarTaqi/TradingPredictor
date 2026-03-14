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