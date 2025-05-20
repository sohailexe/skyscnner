import { motion, AnimatePresence } from "framer-motion";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/date-picker";
import { Calendar } from "lucide-react";
import React, { useEffect, useState } from "react";

// const itemVariants = {
//   hidden: { opacity: 0, y: 10 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { type: "spring", stiffness: 500, damping: 24 },
//   },
// };

export interface DateInputFieldProps {
  id: string;
  label: string;
  value?: Date;
  onChange: (date: Date | undefined) => void;
  className?: string;
  error?: string;
  buttonRef: React.RefObject<HTMLButtonElement | null>;
  minDate?: Date; // Minimum selectable date
  maxDate?: Date; // Maximum selectable date
}

export function DateInputField({
  id,
  label,
  value,
  onChange,
  className = "",
  error,
  buttonRef,
  minDate,
  maxDate,
}: DateInputFieldProps) {
  const [localError, setLocalError] = useState<string | undefined>(error);
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set to beginning of today

  // Use provided minDate or default to today
  const actualMinDate = minDate || today;

  const handleLabelOrIconClick = () => buttonRef?.current?.click();

  // Handler for date selection with validation
  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      // Reset date to beginning of day for fair comparison
      const selectedDate = new Date(date);
      selectedDate.setHours(0, 0, 0, 0);

      // Check if date is before minimum allowed date
      if (selectedDate < actualMinDate) {
        setLocalError(
          `Min date: ${actualMinDate.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}`
        );
        return;
      }

      // Check if date is after maximum allowed date
      if (maxDate && selectedDate > maxDate) {
        setLocalError(
          `Max date: ${maxDate.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}`
        );
        return;
      }
    }

    // Clear local error and call parent onChange
    setLocalError(undefined);
    onChange(date);
  };

  // Update local error when parent error changes
  useEffect(() => {
    setLocalError(error);
  }, [error]);

  return (
    <div className="flex flex-col gap-1">
      <div
        className={`flex flex-col relative bg-white px-4 py-1.5 text-black ${className}`}
        id={id}
      >
        <div className="flex items-center justify-between ">
          <Label
            htmlFor={id}
            className="text-gray-500 text-sm cursor-pointer"
            onClick={handleLabelOrIconClick}
          >
            {label}
          </Label>
          <Calendar
            size={16}
            className="text-gray-500 cursor-pointer"
            onClick={handleLabelOrIconClick}
          />
        </div>

        <div className="min-h-[30px]">
          <DatePicker
            date={value}
            setDate={handleDateChange}
            buttonRef={buttonRef}
            fromDate={actualMinDate}
            toDate={maxDate}
          />
        </div>
      </div>
      {(localError || error) && (
        <div>
          {/* Error message display */}
          <AnimatePresence>
            {(localError || error) && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="text-red-500 text-xs  "
              >
                {localError || error}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
