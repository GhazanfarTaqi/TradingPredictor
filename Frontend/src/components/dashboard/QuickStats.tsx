// import { ArrowDownRight, ArrowUpRight, DollarSign, Percent, Target, TrendingUp } from "lucide-react";

// interface StatCardProps {
//   title: string;
//   value: string;
//   change: number;
//   icon: React.ReactNode;
// }

// const StatCard = ({ title, value, change, icon }: StatCardProps) => {
//   const isPositive = change >= 0;

//   return (
//     <div className="glass-card p-4 gradient-border">
//       <div className="flex items-start justify-between">
//         <div>
//           <p className="text-xs text-muted-foreground mb-1">{title}</p>
//           <p className="text-2xl font-bold">{value}</p>
//         </div>
//         <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
//           {icon}
//         </div>
//       </div>
//       <div className="flex items-center gap-1 mt-2">
//         {isPositive ? (
//           <ArrowUpRight className="w-4 h-4 text-neon-green" />
//         ) : (
//           <ArrowDownRight className="w-4 h-4 text-neon-red" />
//         )}
//         <span className={`text-sm font-medium ${isPositive ? "text-neon-green" : "text-neon-red"}`}>
//           {isPositive ? "+" : ""}{change}%
//         </span>
//         <span className="text-xs text-muted-foreground">vs last week</span>
//       </div>
//     </div>
//   );
// };

// export const QuickStats = () => {
//   return (
//     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//       <StatCard
//         title="Portfolio Value"
//         value="$128,450"
//         change={12.5}
//         icon={<DollarSign className="w-5 h-5 text-primary" />}
//       />
//       <StatCard
//         title="Today's P/L"
//         value="+$2,340"
//         change={8.2}
//         icon={<TrendingUp className="w-5 h-5 text-primary" />}
//       />
//       <StatCard
//         title="Win Rate"
//         value="76.4%"
//         change={3.1}
//         icon={<Percent className="w-5 h-5 text-primary" />}
//       />
//       <StatCard
//         title="Active Trades"
//         value="7"
//         change={-2.4}
//         icon={<Target className="w-5 h-5 text-primary" />}
//       />
//     </div>
//   );
// };


import { motion } from "framer-motion";
import { Newspaper, TrendingUp, Zap, Globe } from "lucide-react";

// QuickStats.tsx ke NewsCard component mein ye tabdeeli karein:

const NewsCard = ({ title, source, time, colorClass }: { title: string, source: string, time: string, colorClass: string }) => (
  <div className="glass-card p-4 gradient-border flex flex-col justify-between min-h-[120px] h-full hover:bg-white/5 transition-all">
    <div className="flex items-center justify-between mb-3">
      <div className={`flex items-center gap-2 px-2 py-0.5 rounded-full bg-white/5 border border-white/10`}>
        <Globe className="w-3 h-3 text-primary" />
        <span className="text-[10px] font-medium text-muted-foreground uppercase">{source}</span>
      </div>
      <span className="text-[10px] text-muted-foreground">{time}</span>
    </div>

    {/* line-clamp-2 ko hata dia taake text na katay */}
    <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
      {title}
    </h4>

    <div className="mt-3 flex items-center gap-1">
      <div className={`w-1.5 h-1.5 rounded-full ${colorClass} animate-pulse`} />
      <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Live Impact</span>
    </div>
  </div>
);

export const QuickStats = () => {
  // QuickStats.tsx ke andar newsUpdates array ko is se replace karein:

  const newsUpdates = [
    {
      title: "XAU/USD Technical Analysis: Gold holds steady above $2,640 support level as geopolitical tensions rise.",
      source: "Reuters",
      time: "2 mins ago",
      color: "bg-neon-green"
    },
    {
      title: "Central Banks Gold Reserves: New data shows steady accumulation of physical gold by Asian banks.",
      source: "Bloomberg",
      time: "15 mins ago",
      color: "bg-primary"
    },
    {
      title: "Gold Price Volatility: Upcoming US Labor Market data expected to drive sharp XAU/USD movements.",
      source: "CNBC",
      time: "Just Now",
      color: "bg-neon-red"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {newsUpdates.map((news, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <NewsCard
            title={news.title}
            source={news.source}
            time={news.time}
            colorClass={news.color}
          />
        </motion.div>
      ))}
    </div>
  );
};