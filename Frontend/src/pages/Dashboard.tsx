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
      className="space-y-6"
    >
      {/* Quick Stats */}
      <motion.div variants={itemVariants}>
        <QuickStats />
      </motion.div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column - Traffic Light & AI Prediction */}
        <motion.div variants={itemVariants} className="lg:col-span-4 space-y-6">
          <TrafficLightWidget />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
            <AIPredictionWidget />
            <ConfidenceGauge />
          </div>
        </motion.div>

        {/* Center Column - Chart */}
        <motion.div variants={itemVariants} className="lg:col-span-5">
          <CandlestickChart />
        </motion.div>

        {/* Right Column - AI Insights */}
        <motion.div variants={itemVariants} className="lg:col-span-3">
          <AIInsightsSidebar />
        </motion.div>
      </div>
    </motion.div>
  );
};
