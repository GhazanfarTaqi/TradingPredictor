import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { LineChart, TrendingUp } from "lucide-react";

export const CandlestickChart = () => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // TradingView Widget Script create karna
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.type = "text/javascript";
    script.async = true;
    script.onload = () => {
      if (container.current && window.TradingView) {
        new window.TradingView.widget({
          "autosize": true,
          "symbol": "OANDA:XAUUSD", // Actual Gold Price
          "interval": "D",
          "timezone": "Etc/UTC",
          "theme": "dark",
          "style": "1", // Candlestick style
          "locale": "en",
          "toolbar_bg": "#f1f3f6",
          "enable_publishing": false,
          "hide_top_toolbar": false,
          "hide_legend": false,
          "save_image": false,
          "container_id": "tradingview_gold_chart",
          "backgroundColor": "rgba(2, 6, 23, 1)", // Dashboard dark color
          "gridColor": "rgba(30, 41, 59, 0.1)",
        });
      }
    };
    container.current?.appendChild(script);

    return () => {
      // Cleanup script on unmount
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      // glass-card aur bg-slate-950 ko ensure karein
      className="glass-card p-4 h-full min-h-[550px] flex flex-col bg-[#020617]" 
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <LineChart className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Real-Time Gold Action (XAU/USD)
          </h3>
        </div>
        {/* Live indicator waisa hi rahe ga */}
      </div>

      {/* Chart Area - Iska background bhi match kar dia hai */}
      <div className="flex-1 w-full rounded-xl overflow-hidden border border-white/5 bg-[#10B981] relative">
        <div id="tradingview_gold_chart" ref={container} className="absolute inset-0 h-full w-full" />
      </div>
    </motion.div>
  );
};