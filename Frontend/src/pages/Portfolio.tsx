import { motion } from "framer-motion";
import { Wallet, TrendingUp, TrendingDown, DollarSign, Percent, BarChart3, PieChart } from "lucide-react";
import { PieChart as RechartsPie, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

const holdings = [
  { asset: "XAU/USD", allocation: 35, value: "$34,580", pnl: "+$2,340", pnlPercent: 7.25, positive: true },
  { asset: "BTC/USD", allocation: 25, value: "$24,890", pnl: "+$4,120", pnlPercent: 19.83, positive: true },
  { asset: "ETH/USD", allocation: 20, value: "$19,420", pnl: "-$890", pnlPercent: -4.38, positive: false },
  { asset: "EUR/USD", allocation: 12, value: "$11,940", pnl: "+$340", pnlPercent: 2.93, positive: true },
  { asset: "Cash", allocation: 8, value: "$7,820", pnl: "$0", pnlPercent: 0, positive: true },
];

const allocationData = holdings.map((h, i) => ({
  name: h.asset,
  value: h.allocation,
  color: ["hsl(var(--neon-green))", "hsl(var(--neon-amber))", "hsl(var(--neon-cyan))", "hsl(var(--primary))", "hsl(var(--muted))"][i],
}));

const portfolioHistory = [
  { date: "Jan", value: 85000 },
  { date: "Feb", value: 87500 },
  { date: "Mar", value: 92000 },
  { date: "Apr", value: 88000 },
  { date: "May", value: 95000 },
  { date: "Jun", value: 98650 },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const Portfolio = () => {
  const totalValue = 98650;
  const totalPnl = 5910;
  const totalPnlPercent = 6.37;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
          <Wallet className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Portfolio</h1>
          <p className="text-sm text-muted-foreground">Your trading positions and allocation</p>
        </div>
      </motion.div>

      {/* Summary Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="glass-card p-5 gradient-border"
        >
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Total Value</span>
          </div>
          <div className="text-3xl font-bold">${totalValue.toLocaleString()}</div>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} className="glass-card p-5">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-neon-green" />
            <span className="text-sm text-muted-foreground">Total P&L</span>
          </div>
          <div className="text-2xl font-bold text-neon-green">+${totalPnl.toLocaleString()}</div>
          <span className="text-sm text-neon-green">+{totalPnlPercent}%</span>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} className="glass-card p-5">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="w-4 h-4 text-neon-cyan" />
            <span className="text-sm text-muted-foreground">Active Positions</span>
          </div>
          <div className="text-2xl font-bold">4</div>
          <span className="text-sm text-muted-foreground">across 4 assets</span>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} className="glass-card p-5">
          <div className="flex items-center gap-2 mb-2">
            <Percent className="w-4 h-4 text-neon-amber" />
            <span className="text-sm text-muted-foreground">Win Rate</span>
          </div>
          <div className="text-2xl font-bold">76%</div>
          <span className="text-sm text-muted-foreground">last 30 days</span>
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Portfolio Value Chart */}
        <motion.div variants={itemVariants} className="lg:col-span-2 glass-card p-6">
          <h3 className="text-lg font-semibold mb-4">Portfolio Growth</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={portfolioHistory}>
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, "Value"]}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--primary))", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Allocation Pie */}
        <motion.div variants={itemVariants} className="glass-card p-6">
          <h3 className="text-lg font-semibold mb-4">Allocation</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPie>
                <Pie
                  data={allocationData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {allocationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
              </RechartsPie>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-4">
            {allocationData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span>{item.name}</span>
                </div>
                <span className="font-medium">{item.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Holdings Table */}
      <motion.div variants={itemVariants} className="glass-card overflow-hidden">
        <div className="p-4 border-b border-border/50">
          <h3 className="text-lg font-semibold">Holdings</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Asset</th>
                <th className="text-right p-4 text-sm font-medium text-muted-foreground">Allocation</th>
                <th className="text-right p-4 text-sm font-medium text-muted-foreground">Value</th>
                <th className="text-right p-4 text-sm font-medium text-muted-foreground">P&L</th>
                <th className="text-right p-4 text-sm font-medium text-muted-foreground">%</th>
              </tr>
            </thead>
            <tbody>
              {holdings.map((holding, index) => (
                <motion.tr
                  key={holding.asset}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-b border-border/30 hover:bg-secondary/30 transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                        <PieChart className="w-4 h-4 text-primary" />
                      </div>
                      <span className="font-medium">{holding.asset}</span>
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-16 bg-secondary rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-primary"
                          style={{ width: `${holding.allocation}%` }}
                        />
                      </div>
                      <span className="text-sm">{holding.allocation}%</span>
                    </div>
                  </td>
                  <td className="p-4 text-right font-mono">{holding.value}</td>
                  <td className={`p-4 text-right font-mono ${holding.positive ? "text-neon-green" : "text-neon-red"}`}>
                    {holding.pnl}
                  </td>
                  <td className={`p-4 text-right ${holding.positive ? "text-neon-green" : "text-neon-red"}`}>
                    {holding.pnlPercent > 0 ? "+" : ""}{holding.pnlPercent}%
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
};
