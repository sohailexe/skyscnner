import { motion } from "framer-motion";
import React from "react";

interface PagesHeaderProps {
  image: string;
  heading?: string;
  children?: React.ReactNode;
}

const PagesHeader = ({ image, heading, children }: PagesHeaderProps) => {
  return (
    <div className="relative h-[50vh] w-full overflow-hidden shadow-lg">
      {/* Background Image */}
      <motion.div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Content */}
      <motion.div
        className="relative z-20 flex flex-col items-center justify-center h-full text-white text-center px-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {heading && (
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {heading}
          </motion.h1>
        )}

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PagesHeader;
