import { motion } from "framer-motion";
import { BarChart3, TrendingUp, TrendingDown, Activity, PieChart, LineChart } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart as RechartsPie,
  Pie,
  Cell,
} from "recharts";

const performanceData = [
  { month: "Jan", profit: 2400, loss: -400 },
  { month: "Feb", profit: 1398, loss: -210 },
  { month: "Mar", profit: 9800, loss: -290 },
  { month: "Apr", profit: 3908, loss: -200 },
  { month: "May", profit: 4800, loss: -181 },
  { month: "Jun", profit: 3800, loss: -250 },
];

const winRateData = [
  { name: "Wins", value: 76, color: "hsl(var(--neon-green))" },
  { name: "Losses", value: 24, color: "hsl(var(--neon-red))" },
];

const assetPerformance = [
  { asset: "XAU/USD", return: 15.8 },
  { asset: "BTC/USD", return: 23.4 },
  { asset: "ETH/USD", return: 18.2 },
  { asset: "EUR/USD", return: 5.6 },
  { asset: "GBP/USD", return: 8.1 },
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

export const Analytics = () => {
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
          <BarChart3 className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Analytics</h1>
          <p className="text-sm text-muted-foreground">Performance metrics and insights</p>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total Profit", value: "$24,580", change: "+18.2%", positive: true, icon: TrendingUp },
          { label: "Win Rate", value: "76%", change: "+4.5%", positive: true, icon: Activity },
          { label: "Max Drawdown", value: "-8.4%", change: "-2.1%", positive: false, icon: TrendingDown },
          { label: "Avg Trade", value: "$342", change: "+12.8%", positive: true, icon: LineChart },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">{stat.label}</span>
              <stat.icon className={`w-4 h-4 ${stat.positive ? "text-neon-green" : "text-neon-red"}`} />
            </div>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className={`text-sm mt-1 ${stat.positive ? "text-neon-green" : "text-neon-red"}`}>
              {stat.change} vs last month
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profit/Loss Chart */}
        <motion.div variants={itemVariants} className="lg:col-span-2 glass-card p-6">
          <h3 className="text-lg font-semibold mb-4">Monthly Performance</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="profit"
                  stackId="1"
                  stroke="hsl(var(--neon-green))"
                  fill="hsl(var(--neon-green) / 0.3)"
                />
                <Area
                  type="monotone"
                  dataKey="loss"
                  stackId="2"
                  stroke="hsl(var(--neon-red))"
                  fill="hsl(var(--neon-red) / 0.3)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Win Rate Pie */}
        <motion.div variants={itemVariants} className="glass-card p-6">
          <h3 className="text-lg font-semibold mb-4">Win Rate</h3>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPie>
                <Pie
                  data={winRateData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {winRateData.map((entry, index) => (
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
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-neon-green" />
              <span className="text-sm">Wins (76%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-neon-red" />
              <span className="text-sm">Losses (24%)</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Asset Performance */}
      <motion.div variants={itemVariants} className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-4">Asset Performance</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={assetPerformance} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis dataKey="asset" type="category" stroke="hsl(var(--muted-foreground))" fontSize={12} width={80} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="return" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </motion.div>
  );
};
