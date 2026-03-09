import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Globe, TrendingUp } from "lucide-react";

// NewsCard Component (Same as before)
const NewsCard = ({ title, source, time, colorClass }: { title: string, source: string, time: string, colorClass: string }) => (
  <div className="relative group overflow-hidden bg-[#0a0a0a] border border-white/5 p-6 rounded-[2rem] transition-all duration-500 hover:border-primary/40 hover:bg-white/[0.03] shadow-2xl">
    <div className={`absolute -right-4 -top-4 w-12 h-12 blur-2xl opacity-10 group-hover:opacity-40 transition-opacity ${colorClass}`} />
    <div className="flex justify-between items-center mb-5 relative z-10">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-white/5 rounded-xl border border-white/10">
          <Globe className="w-3.5 h-3.5 text-primary" />
        </div>
        <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{source}</span>
      </div>
      <div className="flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-full border border-white/5">
        <span className="text-[9px] font-bold text-white/40">{time}</span>
      </div>
    </div>
    <h4 className="text-sm font-black text-white italic tracking-tight leading-snug mb-5 group-hover:text-primary transition-colors">
      {title}
    </h4>
    <div className="flex items-center justify-between pt-4 border-t border-white/5 relative z-10">
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${colorClass} animate-pulse shadow-[0_0_10px_currentColor]`} />
        <span className="text-[10px] text-muted-foreground uppercase font-black tracking-tighter">Sentiment Impact</span>
      </div>
      <TrendingUp size={14} className="text-white/10 group-hover:text-primary transition-all" />
    </div>
  </div>
);

export const QuickStats = () => {
  // 1. State for News Data
  const [newsUpdates, setNewsUpdates] = useState([
    { title: "News 1: Loading dummy data...", source: "System", time: "Now", color: "bg-primary" },
    { title: "News 2: Waiting for backend...", source: "System", time: "Now", color: "bg-neon-green" },
    { title: "News 3: Ready to fetch...", source: "System", time: "Now", color: "bg-neon-red" }
  ]);

  // 2. Function to fetch from Backend (Future Use)
  const fetchNews = async () => {
    try {
      // Jab database se connect karna ho, niche wali line uncomment kar dena:
      // const response = await fetch('http://127.0.0.1:8000/api/newsAnalysis/');
      // const data = await response.json();
      
      // Abhi ke liye hum aapki PIC wala data manually set kar rahe hain as Dummy
      const dummyDataFromBackend = [
        { title: "Gold Reclaims $5,000 as Cooling Inflation Lifts Fed Easing Bets", source: "GROQ AI", time: "Live", color: "bg-neon-green" },
        { title: "Gold's rally sidelined one of its biggest buyers - but they're eyeing a comeback", source: "GROQ AI", time: "Live", color: "bg-primary" },
        { title: "Gold And Silver Rally As U.S.-Iran Nuclear Deal Remains Out Of Reach", source: "GROQ AI", time: "Live", color: "bg-neon-red" }
      ];

      setNewsUpdates(dummyDataFromBackend);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {newsUpdates.map((news, index) => (
        <motion.div key={index} whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
          <NewsCard {...news} colorClass={news.color} />
        </motion.div>
      ))}
    </div>
  );
};