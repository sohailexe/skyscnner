import { ArrowLeftRight } from "lucide-react";
import { motion } from "framer-motion";

export interface SwapButtonProps {
  rotated: boolean;
  onClick: () => void;
}

export function SwapButton({ rotated, onClick }: SwapButtonProps) {
  const buttonAnimationProps = {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
    transition: { type: "spring", stiffness: 400, damping: 17 },
  };

  return (
    <motion.button
      type="button"
      className={`rounded-full bg-white size-10 md:size-12 border-4 border-dark-blue flex items-center justify-center transition-all ${
        rotated ? "rotate-180" : ""
      }`}
      onClick={onClick}
      aria-label="Swap origin and destination"
      {...buttonAnimationProps}
    >
      <ArrowLeftRight className="h-4 w-4 md:h-5 md:w-5 text-dark-blue" />
    </motion.button>
  );
}
