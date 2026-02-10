import { ArrowDownRight, ArrowUpRight, DollarSign, Percent, Target, TrendingUp } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
}

const StatCard = ({ title, value, change, icon }: StatCardProps) => {
  const isPositive = change >= 0;

  return (
    <div className="glass-card p-4 gradient-border">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-muted-foreground mb-1">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          {icon}
        </div>
      </div>
      <div className="flex items-center gap-1 mt-2">
        {isPositive ? (
          <ArrowUpRight className="w-4 h-4 text-neon-green" />
        ) : (
          <ArrowDownRight className="w-4 h-4 text-neon-red" />
        )}
        <span className={`text-sm font-medium ${isPositive ? "text-neon-green" : "text-neon-red"}`}>
          {isPositive ? "+" : ""}{change}%
        </span>
        <span className="text-xs text-muted-foreground">vs last week</span>
      </div>
    </div>
  );
};

export const QuickStats = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <StatCard
        title="Portfolio Value"
        value="$128,450"
        change={12.5}
        icon={<DollarSign className="w-5 h-5 text-primary" />}
      />
      <StatCard
        title="Today's P/L"
        value="+$2,340"
        change={8.2}
        icon={<TrendingUp className="w-5 h-5 text-primary" />}
      />
      <StatCard
        title="Win Rate"
        value="76.4%"
        change={3.1}
        icon={<Percent className="w-5 h-5 text-primary" />}
      />
      <StatCard
        title="Active Trades"
        value="7"
        change={-2.4}
        icon={<Target className="w-5 h-5 text-primary" />}
      />
    </div>
  );
};
