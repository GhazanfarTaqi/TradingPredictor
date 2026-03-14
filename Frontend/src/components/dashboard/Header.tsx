import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion"; // FIXED: Missing imports
import { Activity, Bell, Settings, User, Zap, Menu, X, ShieldAlert } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { dummySignals } from "@/pages/Signals"; 

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // REAL LOGIC: Latest Signal se market status
  const marketInfo = useMemo(() => {
    const latest = [...dummySignals].sort((a, b) => b.id - a.id)[0];
    const situation = latest?.market_situation || "secure";
    
    const configs = {
      dangerous: { label: "High Risk", color: "bg-neon-red", text: "text-neon-red" },
      caution: { label: "Caution", color: "bg-neon-amber", text: "text-neon-amber" },
      secure: { label: "Secure", color: "bg-neon-green", text: "text-neon-green" },
    };
    return configs[situation as keyof typeof configs];
  }, []);

  // Dummy News for Notification
  const newsUpdates = [
    { title: "XAU/USD holds steady above $5,120.", source: "Reuters", time: "2m ago" },
    { title: "Central Banks increasing gold reserves.", source: "Bloomberg", time: "15m ago" },
    { title: "US data driving market volatility.", source: "CNBC", time: "Just Now" }
  ];

  const navItems = [
    { to: "/", label: "Dashboard" },
    { to: "/analytics", label: "Analytics" },
    { to: "/signals", label: "Signals" }
  ];

  return (
    <header className="glass-card-strong px-6 py-4 flex items-center justify-between sticky top-0 z-50 border-b border-white/5">
      {/* Logo Section */}
      <div className="flex items-center gap-4">
        <NavLink to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/30">
            <Zap className="w-6 h-6 text-primary" />
          </div>
          <div className="hidden xs:block">
            <h1 className="text-xl font-bold tracking-tight text-white">Neural<span className="text-primary">Trade</span></h1>
            <p className="text-[10px] text-muted-foreground uppercase font-medium">AI Prediction Engine</p>
          </div>
        </NavLink>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className="px-4 py-2 text-sm text-muted-foreground hover:text-white transition-colors"
            activeClassName="bg-primary/10 text-primary rounded-lg font-medium"
            end={item.to === "/"}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="flex items-center gap-3">
        {/* Market Status Pill */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/50 border border-border/50">
          <div className={`w-2 h-2 rounded-full ${marketInfo.color} animate-pulse`} />
          <span className={`text-xs font-medium ${marketInfo.text}`}>{marketInfo.label}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${showNotifications ? 'bg-primary/20 border border-primary' : 'bg-secondary/50 hover:bg-secondary'}`}
          >
            <Bell className={`w-4 h-4 ${showNotifications ? 'text-primary' : 'text-muted-foreground'}`} />
          </button>

          {/* Notifications Dropdown */}
          <AnimatePresence>
            {showNotifications && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                className="absolute right-0 top-12 w-64 bg-[#0d0d0d] border border-white/10 rounded-2xl p-4 shadow-2xl z-[110]"
              >
                <h4 className="text-[10px] font-black uppercase text-white/40 mb-3 tracking-widest px-1">Recent News</h4>
                <div className="space-y-2">
                  {newsUpdates.map((news, i) => (
                    <div key={i} className="p-3 bg-white/5 rounded-xl border border-white/5">
                      <p className="text-[10px] font-bold text-white leading-tight">{news.title}</p>
                      <span className="text-[8px] text-primary font-black uppercase mt-1 block">{news.source}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button className="w-9 h-9 rounded-lg bg-secondary/50 flex items-center justify-center hover:bg-secondary transition-colors">
            <Settings className="w-4 h-4 text-muted-foreground" />
          </button>

          {/* User Profile */}
          <button className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/50 border border-white/5 hover:bg-secondary transition-colors">
            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
              <User className="w-3 h-3 text-white" />
            </div>
            <span className="text-xs font-medium text-white">Trader</span>
          </button>

          {/* Simple Mobile Toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-9 h-9 rounded-lg bg-primary/20 flex items-center justify-center text-primary"
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* SIMPLE MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="absolute top-[72px] left-0 right-0 bg-black/95 border-b border-white/10 p-4 md:hidden z-40 overflow-hidden"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-4 text-sm font-bold text-muted-foreground uppercase tracking-widest hover:text-white hover:bg-white/5 rounded-xl"
                  activeClassName="text-primary bg-primary/10"
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};