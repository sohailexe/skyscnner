import { motion, AnimatePresence } from "framer-motion";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/date-picker";
import { Calendar } from "lucide-react";
import React from "react";

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 500, damping: 24 },
  },
};

export interface DateInputFieldProps {
  id: string;
  label: string;
  value?: Date;
  onChange: (date: Date | undefined) => void;
  className?: string;
  error?: string;
  buttonRef: React.RefObject<HTMLButtonElement | null>;
}

export function DateInputField({
  id,
  label,
  value,
  onChange,
  className = "",
  error,
  buttonRef,
}: DateInputFieldProps) {
  const handleLabelOrIconClick = () => buttonRef.current?.click();

  return (
    <motion.div
      className={`bg-white px-4 py-3 ${className}`}
      variants={itemVariants}
    >
      <Label
        htmlFor={id}
        className="text-sm text-gray-500 block cursor-pointer"
        onClick={handleLabelOrIconClick}
      >
        {label}
      </Label>
      <div className="flex items-center">
        <div className="flex-1">
          <DatePicker
            date={value}
            onDateChange={onChange}
            className="border-0 p-0 text-black font-medium focus-visible:ring-0 h-auto shadow-none bg-transparent"
            placeholder="Select date"
            buttonRef={buttonRef}
          />
        </div>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Calendar
            className="h-4 w-4 text-gray-500 ml-2 cursor-pointer hover:text-gray-700 transition-colors"
            onClick={handleLabelOrIconClick}
          />
        </motion.div>
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="text-xs text-red-500 mt-1"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
