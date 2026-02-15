// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { TrendingUp, TrendingDown, Minus, Brain, Sparkles, ChevronDown, Loader2 } from "lucide-react";

// type Stance = "BUY" | "SELL" | "HOLD";
// type Asset = "XAU/USD" | "BTC/USD" | "ETH/USD";

// interface AssetData {
//   price: string;
//   change: number;
//   stance: Stance;
//   confidence: number;
// }

// const assetDataMap: Record<Asset, AssetData> = {
//   "XAU/USD": { price: "$2,648.50", change: 1.24, stance: "BUY", confidence: 87 },
//   "BTC/USD": { price: "$67,890.00", change: -2.15, stance: "SELL", confidence: 72 },
//   "ETH/USD": { price: "$3,420.00", change: 3.42, stance: "BUY", confidence: 81 },
// };

// export const AIPredictionWidget = () => {
//   const [selectedAsset, setSelectedAsset] = useState<Asset>("XAU/USD");
//   const [isLoading, setIsLoading] = useState(false);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [currentData, setCurrentData] = useState<AssetData>(assetDataMap["XAU/USD"]);

//   const handleAssetChange = (asset: Asset) => {
//     if (asset === selectedAsset) {
//       setIsDropdownOpen(false);
//       return;
//     }

//     setIsDropdownOpen(false);
//     setIsLoading(true);
//     setSelectedAsset(asset);

//     // Simulate AI processing
//     setTimeout(() => {
//       setCurrentData(assetDataMap[asset]);
//       setIsLoading(false);
//     }, 1500);
//   };

//   const stanceConfig = {
//     BUY: {
//       icon: TrendingUp,
//       color: "text-neon-green",
//       bgColor: "bg-neon-green/20",
//       borderColor: "border-neon-green/50",
//       glowClass: "neon-glow-green",
//       textGlow: "neon-text-green",
//     },
//     SELL: {
//       icon: TrendingDown,
//       color: "text-neon-red",
//       bgColor: "bg-neon-red/20",
//       borderColor: "border-neon-red/50",
//       glowClass: "neon-glow-red",
//       textGlow: "neon-text-red",
//     },
//     HOLD: {
//       icon: Minus,
//       color: "text-neon-amber",
//       bgColor: "bg-neon-amber/20",
//       borderColor: "border-neon-amber/50",
//       glowClass: "neon-glow-amber",
//       textGlow: "neon-text-amber",
//     },
//   };

//   const config = stanceConfig[currentData.stance];
//   const Icon = config.icon;

//   return (
//     <div className="glass-card p-6 gradient-border">
//       <div className="flex items-center justify-between mb-4">
//         <div className="flex items-center gap-2">
//           <Brain className="w-4 h-4 text-primary" />
//           <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">AI Prediction</h3>
//         </div>
//         <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 border border-primary/30">
//           <Sparkles className="w-3 h-3 text-primary" />
//           <span className="text-xs text-primary font-medium">Live</span>
//         </div>
//       </div>

//       <div className="text-center py-4">
//         {/* Asset Selector */}
//         <div className="mb-4 relative inline-block">
//           <button
//             onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//             className="flex items-center gap-2 px-4 py-2 bg-secondary/50 border border-border/50 rounded-lg hover:bg-secondary transition-colors"
//           >
//             <span className="font-medium">{selectedAsset}</span>
//             <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
//           </button>

//           <AnimatePresence>
//             {isDropdownOpen && (
//               <motion.div
//                 initial={{ opacity: 0, y: -10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -10 }}
//                 className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-xl z-20 overflow-hidden"
//               >
//                 {(["XAU/USD", "BTC/USD", "ETH/USD"] as Asset[]).map((asset) => (
//                   <button
//                     key={asset}
//                     onClick={() => handleAssetChange(asset)}
//                     className={`w-full px-4 py-2 text-left text-sm hover:bg-secondary/50 transition-colors ${
//                       asset === selectedAsset ? "bg-primary/10 text-primary" : ""
//                     }`}
//                   >
//                     {asset}
//                   </button>
//                 ))}
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>

//         {/* Price Display */}
//         <AnimatePresence mode="wait">
//           {isLoading ? (
//             <motion.div
//               key="loading"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="py-12 flex flex-col items-center gap-4"
//             >
//               <Loader2 className="w-12 h-12 text-primary animate-spin" />
//               <span className="text-sm text-muted-foreground">AI Processing...</span>
//             </motion.div>
//           ) : (
//             <motion.div
//               key={selectedAsset}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//             >
//               <div className="mb-4">
//                 <div className="flex items-center justify-center gap-2 mt-2">
//                   <span className="text-3xl font-mono font-bold">{currentData.price}</span>
//                   <span className={`text-sm font-medium ${currentData.change >= 0 ? "text-neon-green" : "text-neon-red"}`}>
//                     {currentData.change >= 0 ? "+" : ""}{currentData.change.toFixed(2)}%
//                   </span>
//                 </div>
//               </div>

//               <div className="py-4">
//                 <span className="text-xs text-muted-foreground uppercase tracking-wider">Current Stance</span>
//                 <motion.div
//                   initial={{ scale: 0.8 }}
//                   animate={{ scale: 1 }}
//                   transition={{ type: "spring", damping: 15 }}
//                   className={`mt-4 inline-flex items-center gap-4 px-8 py-4 rounded-2xl ${config.bgColor} border ${config.borderColor} ${config.glowClass}`}
//                 >
//                   <Icon className={`w-10 h-10 ${config.color}`} />
//                   <span className={`text-5xl font-black tracking-tight ${config.color} ${config.textGlow}`}>
//                     {currentData.stance}
//                   </span>
//                 </motion.div>
//               </div>

//               <p className="text-sm text-muted-foreground mt-4">
//                 {currentData.stance === "BUY" && "Strong upward momentum detected. Consider entering long positions."}
//                 {currentData.stance === "SELL" && "Bearish signals confirmed. Consider closing longs or entering shorts."}
//                 {currentData.stance === "HOLD" && "No clear direction. Wait for stronger confirmation signals."}
//               </p>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// };



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