import { Activity, Bell, Settings, User, Zap } from "lucide-react";
import { NavLink } from "@/components/NavLink";

interface HeaderProps {
  marketStatus: "open" | "closed" | "pre-market";
}

export const Header = ({ marketStatus }: HeaderProps) => {
  const statusConfig = {
    open: { label: "Market Open", color: "bg-neon-green", textClass: "text-neon-green" },
    closed: { label: "Market Closed", color: "bg-neon-red", textClass: "text-neon-red" },
    "pre-market": { label: "Pre-Market", color: "bg-neon-amber", textClass: "text-neon-amber" },
  };

  const status = statusConfig[marketStatus];

  const navItems = [
    { to: "/", label: "Dashboard" },
    { to: "/analytics", label: "Analytics" },
    { to: "/signals", label: "Signals" },
    { to: "/portfolio", label: "Portfolio" },
  ];

  return (
    <header className="glass-card-strong px-6 py-4 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <NavLink to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
            <Zap className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Neural<span className="text-primary">Trade</span></h1>
            <p className="text-xs text-muted-foreground">AI Prediction Engine</p>
          </div>
        </NavLink>
      </div>

      <nav className="hidden md:flex items-center gap-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground rounded-lg transition-colors"
            activeClassName="bg-primary/10 text-primary font-medium"
            end={item.to === "/"}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/50 border border-border/50">
          <div className={`w-2 h-2 rounded-full ${status.color} animate-pulse`} />
          <span className={`text-xs font-medium ${status.textClass}`}>{status.label}</span>
        </div>

        <div className="flex items-center gap-2">
          <button className="w-9 h-9 rounded-lg bg-secondary/50 flex items-center justify-center hover:bg-secondary transition-colors">
            <Bell className="w-4 h-4 text-muted-foreground" />
          </button>
          <button className="w-9 h-9 rounded-lg bg-secondary/50 flex items-center justify-center hover:bg-secondary transition-colors">
            <Settings className="w-4 h-4 text-muted-foreground" />
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-neon-cyan flex items-center justify-center">
              <User className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-sm font-medium hidden sm:block">Trader</span>
          </button>
        </div>
      </div>
    </header>
  );
};
