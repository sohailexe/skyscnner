import React from 'react';
import { PlaneTakeoff } from 'lucide-react';
import { motion } from 'framer-motion';

interface LogoProps {
  white?: boolean;
}

const Logo: React.FC<LogoProps> = ({ white = false }) => {
  return (
    <motion.div 
      className="flex items-center gap-2"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <PlaneTakeoff 
        size={28} 
        className={white ? "text-white" : "text-primary-600"} 
      />
      <h1 
        className={`text-xl font-bold ${white ? "text-white" : "text-primary-600"}`}
      >
        skyscanner
      </h1>
    </motion.div>
  );
};

export default Logo;