// import { motion } from "framer-motion";
// import { TrafficLightWidget } from "@/components/dashboard/TrafficLightWidget";
// import { AIPredictionWidget } from "@/components/dashboard/AIPredictionWidget";
// import { ConfidenceGauge } from "@/components/dashboard/ConfidenceGauge";
// import { CandlestickChart } from "@/components/dashboard/CandlestickChart";
// import { AIInsightsSidebar } from "@/components/dashboard/AIInsightsSidebar";
// import { QuickStats } from "@/components/dashboard/QuickStats";

// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.1,
//     },
//   },
// };

// const itemVariants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: { opacity: 1, y: 0 },
// };

// export const Dashboard = () => {
//   return (
//     <motion.div
//       variants={containerVariants}
//       initial="hidden"
//       animate="visible"
//       className="space-y-6"
//     >
//       {/* Quick Stats */}
//       <motion.div variants={itemVariants}>
//         <QuickStats />
//       </motion.div>

//       {/* Main Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
//         {/* Left Column - Traffic Light & AI Prediction */}
//         <motion.div variants={itemVariants} className="lg:col-span-4 space-y-6">
//           <TrafficLightWidget />
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
//             <AIPredictionWidget />
//             <ConfidenceGauge />
//           </div>
//         </motion.div>

//         {/* Center Column - Chart */}
//         <motion.div variants={itemVariants} className="lg:col-span-5">
//           <CandlestickChart />
//         </motion.div>

//         {/* Right Column - AI Insights */}
//         <motion.div variants={itemVariants} className="lg:col-span-3">
//           <AIInsightsSidebar />
//         </motion.div>
//       </div>
//     </motion.div>
//   );
// };

import { motion } from "framer-motion";
import { TrafficLightWidget } from "@/components/dashboard/TrafficLightWidget";
import { AIPredictionWidget } from "@/components/dashboard/AIPredictionWidget";
import { ConfidenceGauge } from "@/components/dashboard/ConfidenceGauge";
import { CandlestickChart } from "@/components/dashboard/CandlestickChart";
import { AIInsightsSidebar } from "@/components/dashboard/AIInsightsSidebar";
import { QuickStats } from "@/components/dashboard/QuickStats";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const Dashboard = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 max-w-[1600px] mx-auto"
    >
      {/* Top Row: Quick Stats (Full Width) */}
      <motion.div variants={itemVariants}>
        <QuickStats />
      </motion.div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN (The "Big" Chart Section) - 8/12 Columns */}
        <motion.div variants={itemVariants} className="lg:col-span-8 space-y-6">
          <div className="h-[700px]"> {/* Chart ki height barha di hai taake professional lage */}
            <CandlestickChart />
          </div>
          
          {/* Chart ke neeche AI Insights Sidebar ko Horizontal mode ya multi-grid mein rakha ja sakta hai */}
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
             <AIInsightsSidebar />
          </div>
        </motion.div>

        {/* RIGHT COLUMN (The Intelligence Tools) - 4/12 Columns */}
        <motion.div variants={itemVariants} className="lg:col-span-4 space-y-6">
          <TrafficLightWidget />
          
          <div className="space-y-6">
            <AIPredictionWidget />
            <ConfidenceGauge />
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
};