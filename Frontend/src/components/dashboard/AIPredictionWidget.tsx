import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, TrendingDown, Minus, Brain, Sparkles, ChevronDown, Loader2 } from "lucide-react";

type Stance = "BUY" | "SELL" | "HOLD";
type Asset = "XAU/USD" | "BTC/USD" | "ETH/USD";

interface AssetData {
  price: string;
  change: number;
  stance: Stance;
  confidence: number;
}

const assetDataMap: Record<Asset, AssetData> = {
  "XAU/USD": { price: "$2,648.50", change: 1.24, stance: "BUY", confidence: 87 },
  "BTC/USD": { price: "$67,890.00", change: -2.15, stance: "SELL", confidence: 72 },
  "ETH/USD": { price: "$3,420.00", change: 3.42, stance: "BUY", confidence: 81 },
};

export const AIPredictionWidget = () => {
  const [selectedAsset, setSelectedAsset] = useState<Asset>("XAU/USD");
  const [isLoading, setIsLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentData, setCurrentData] = useState<AssetData>(assetDataMap["XAU/USD"]);

  const handleAssetChange = (asset: Asset) => {
    if (asset === selectedAsset) {
      setIsDropdownOpen(false);
      return;
    }

    setIsDropdownOpen(false);
    setIsLoading(true);
    setSelectedAsset(asset);

    // Simulate AI processing
    setTimeout(() => {
      setCurrentData(assetDataMap[asset]);
      setIsLoading(false);
    }, 1500);
  };

  const stanceConfig = {
    BUY: {
      icon: TrendingUp,
      color: "text-neon-green",
      bgColor: "bg-neon-green/20",
      borderColor: "border-neon-green/50",
      glowClass: "neon-glow-green",
      textGlow: "neon-text-green",
    },
    SELL: {
      icon: TrendingDown,
      color: "text-neon-red",
      bgColor: "bg-neon-red/20",
      borderColor: "border-neon-red/50",
      glowClass: "neon-glow-red",
      textGlow: "neon-text-red",
    },
    HOLD: {
      icon: Minus,
      color: "text-neon-amber",
      bgColor: "bg-neon-amber/20",
      borderColor: "border-neon-amber/50",
      glowClass: "neon-glow-amber",
      textGlow: "neon-text-amber",
    },
  };

  const config = stanceConfig[currentData.stance];
  const Icon = config.icon;

  return (
    <div className="glass-card p-6 gradient-border">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Brain className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">AI Prediction</h3>
        </div>
        <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 border border-primary/30">
          <Sparkles className="w-3 h-3 text-primary" />
          <span className="text-xs text-primary font-medium">Live</span>
        </div>
      </div>

      <div className="text-center py-4">
        {/* Asset Selector */}
        <div className="mb-4 relative inline-block">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-secondary/50 border border-border/50 rounded-lg hover:bg-secondary transition-colors"
          >
            <span className="font-medium">{selectedAsset}</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
          </button>

          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-xl z-20 overflow-hidden"
              >
                {(["XAU/USD", "BTC/USD", "ETH/USD"] as Asset[]).map((asset) => (
                  <button
                    key={asset}
                    onClick={() => handleAssetChange(asset)}
                    className={`w-full px-4 py-2 text-left text-sm hover:bg-secondary/50 transition-colors ${
                      asset === selectedAsset ? "bg-primary/10 text-primary" : ""
                    }`}
                  >
                    {asset}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Price Display */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-12 flex flex-col items-center gap-4"
            >
              <Loader2 className="w-12 h-12 text-primary animate-spin" />
              <span className="text-sm text-muted-foreground">AI Processing...</span>
            </motion.div>
          ) : (
            <motion.div
              key={selectedAsset}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="mb-4">
                <div className="flex items-center justify-center gap-2 mt-2">
                  <span className="text-3xl font-mono font-bold">{currentData.price}</span>
                  <span className={`text-sm font-medium ${currentData.change >= 0 ? "text-neon-green" : "text-neon-red"}`}>
                    {currentData.change >= 0 ? "+" : ""}{currentData.change.toFixed(2)}%
                  </span>
                </div>
              </div>

              <div className="py-4">
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Current Stance</span>
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 15 }}
                  className={`mt-4 inline-flex items-center gap-4 px-8 py-4 rounded-2xl ${config.bgColor} border ${config.borderColor} ${config.glowClass}`}
                >
                  <Icon className={`w-10 h-10 ${config.color}`} />
                  <span className={`text-5xl font-black tracking-tight ${config.color} ${config.textGlow}`}>
                    {currentData.stance}
                  </span>
                </motion.div>
              </div>

              <p className="text-sm text-muted-foreground mt-4">
                {currentData.stance === "BUY" && "Strong upward momentum detected. Consider entering long positions."}
                {currentData.stance === "SELL" && "Bearish signals confirmed. Consider closing longs or entering shorts."}
                {currentData.stance === "HOLD" && "No clear direction. Wait for stronger confirmation signals."}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
