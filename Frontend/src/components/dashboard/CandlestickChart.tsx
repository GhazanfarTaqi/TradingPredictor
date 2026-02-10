import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LineChart, RefreshCw, TrendingUp, TrendingDown } from "lucide-react";
import {
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
} from "recharts";

interface ChartDataPoint {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

const generateInitialData = (): ChartDataPoint[] => {
  const data: ChartDataPoint[] = [];
  let basePrice = 2640;
  
  for (let i = 0; i < 24; i++) {
    const change = (Math.random() - 0.48) * 15;
    const open = basePrice;
    const close = basePrice + change;
    const high = Math.max(open, close) + Math.random() * 5;
    const low = Math.min(open, close) - Math.random() * 5;
    
    data.push({
      time: `${i.toString().padStart(2, "0")}:00`,
      open,
      high,
      low,
      close,
      volume: Math.floor(Math.random() * 1000) + 500,
    });
    
    basePrice = close;
  }
  
  return data;
};

export const CandlestickChart = () => {
  const [data, setData] = useState<ChartDataPoint[]>(generateInitialData);
  const [isLive, setIsLive] = useState(true);

  // Add new data point every 3 seconds
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      setData((prevData) => {
        const lastPoint = prevData[prevData.length - 1];
        const change = (Math.random() - 0.48) * 10;
        const open = lastPoint.close;
        const close = open + change;
        const high = Math.max(open, close) + Math.random() * 3;
        const low = Math.min(open, close) - Math.random() * 3;
        
        const hour = parseInt(lastPoint.time.split(":")[0]);
        const newHour = (hour + 1) % 24;
        
        const newPoint: ChartDataPoint = {
          time: `${newHour.toString().padStart(2, "0")}:00`,
          open,
          high,
          low,
          close,
          volume: Math.floor(Math.random() * 1000) + 500,
        };
        
        return [...prevData.slice(1), newPoint];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isLive]);

  const lastPrice = data[data.length - 1]?.close || 0;
  const firstPrice = data[0]?.open || 0;
  const priceChange = lastPrice - firstPrice;
  const percentChange = ((priceChange / firstPrice) * 100).toFixed(2);
  const isPositive = priceChange >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 h-full"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <LineChart className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Price Action</h3>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            {isPositive ? (
              <TrendingUp className="w-4 h-4 text-neon-green" />
            ) : (
              <TrendingDown className="w-4 h-4 text-neon-red" />
            )}
            <span className={`font-mono font-bold ${isPositive ? "text-neon-green" : "text-neon-red"}`}>
              {isPositive ? "+" : ""}{percentChange}%
            </span>
          </div>
          <button
            onClick={() => setIsLive(!isLive)}
            className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium transition-all ${
              isLive
                ? "bg-primary/20 text-primary border border-primary/50"
                : "bg-secondary/50 text-muted-foreground border border-border/50"
            }`}
          >
            <RefreshCw className={`w-3 h-3 ${isLive ? "animate-spin" : ""}`} style={{ animationDuration: "3s" }} />
            {isLive ? "Live" : "Paused"}
          </button>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-mono font-bold">${lastPrice.toFixed(2)}</span>
          <span className="text-sm text-muted-foreground">XAU/USD</span>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.5} />
            <XAxis 
              dataKey="time" 
              stroke="hsl(var(--muted-foreground))" 
              fontSize={10}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))" 
              fontSize={10}
              tickLine={false}
              axisLine={false}
              domain={["auto", "auto"]}
              tickFormatter={(value) => `$${value.toFixed(0)}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
              }}
              labelStyle={{ color: "hsl(var(--foreground))" }}
              formatter={(value: number, name: string) => [`$${value.toFixed(2)}`, name]}
            />
            {/* Price area */}
            <Area
              type="monotone"
              dataKey="close"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              fill="url(#colorGradient)"
              dot={false}
              activeDot={{
                r: 6,
                fill: "hsl(var(--primary))",
                stroke: "hsl(var(--background))",
                strokeWidth: 2,
              }}
            />
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
            </defs>
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Timeframe Buttons */}
      <div className="flex gap-2 mt-4 pt-4 border-t border-border/30">
        {["1H", "4H", "1D", "1W", "1M"].map((tf, index) => (
          <button
            key={tf}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
              index === 2
                ? "bg-primary/20 text-primary border border-primary/50"
                : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
            }`}
          >
            {tf}
          </button>
        ))}
      </div>
    </motion.div>
  );
};
