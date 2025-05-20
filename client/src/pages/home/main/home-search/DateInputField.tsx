import { motion, AnimatePresence } from "framer-motion";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/date-picker";
import { Calendar } from "lucide-react";
import React, { useCallback, useEffect, useMemo, useState } from "react";

/**
 * Animation variants for smooth error message transitions
 */
const errorVariants = {
  hidden: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.2 },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.15 },
  },
};

export interface DateInputFieldProps {
  /** Unique identifier for the input field */
  id: string;
  /** Label text displayed above the date picker */
  label: string;
  /** Current selected date value */
  value?: Date;
  /** Callback function called when date changes */
  onChange: (date: Date | undefined) => void;
  /** Additional CSS classes for styling */
  className?: string;
  /** Error message to display */
  error?: string;
  /** Reference to the date picker button for programmatic access */
  buttonRef: React.RefObject<HTMLButtonElement | null>;
  /** Minimum selectable date (defaults to today) */
  minDate?: Date;
  /** Maximum selectable date */
  maxDate?: Date;
  /** Whether the field is disabled */
  disabled?: boolean;
  /** Whether the field is required */
  required?: boolean;
  /** Placeholder text when no date is selected */
  placeholder?: string;
  /** Custom date format for display */
  dateFormat?: Intl.DateTimeFormatOptions;
}

/**
 * A reusable date input field component with validation and accessibility features
 */
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
  disabled = false,
  required = false,
  placeholder = "Select a date",
  dateFormat = {
    month: "short",
    day: "numeric",
    year: "numeric",
  },
}: DateInputFieldProps) {
  const [localError, setLocalError] = useState<string | undefined>(error);

  // Memoize the normalized today date to prevent unnecessary recalculations
  const normalizedToday = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  }, []);

  // Use provided minDate or default to today
  const actualMinDate = useMemo(
    () => minDate || normalizedToday,
    [minDate, normalizedToday]
  );

  // Normalize date to start of day for consistent comparisons
  const normalizeDate = useCallback((date: Date): Date => {
    const normalized = new Date(date);
    normalized.setHours(0, 0, 0, 0);
    return normalized;
  }, []);

  // Format date for error messages with consistent formatting
  const formatDateForError = useCallback(
    (date: Date): string => {
      return date.toLocaleDateString("en-US", dateFormat);
    },
    [dateFormat]
  );

  // Validate date against min/max constraints
  const validateDate = useCallback(
    (date: Date): string | null => {
      const normalizedDate = normalizeDate(date);

      if (normalizedDate < actualMinDate) {
        return `Date must be on or after ${formatDateForError(actualMinDate)}`;
      }

      if (maxDate && normalizedDate > normalizeDate(maxDate)) {
        return `Date must be on or before ${formatDateForError(maxDate)}`;
      }

      return null;
    },
    [actualMinDate, maxDate, normalizeDate, formatDateForError]
  );

  // Handle label or icon click to focus the date picker
  const handleLabelOrIconClick = useCallback(() => {
    if (!disabled) {
      buttonRef?.current?.click();
    }
  }, [buttonRef, disabled]);

  // Handler for date selection with validation
  const handleDateChange = useCallback(
    (date: Date | undefined) => {
      if (date) {
        const validationError = validateDate(date);
        if (validationError) {
          setLocalError(validationError);
          return;
        }
      }

      // Clear local error and call parent onChange
      setLocalError(undefined);
      onChange(date);
    },
    [validateDate, onChange]
  );

  // Sync local error with parent error
  useEffect(() => {
    setLocalError(error);
  }, [error]);

  // Generate accessibility attributes
  const accessibilityProps = useMemo(
    () => ({
      "aria-describedby": localError ? `${id}-error` : undefined,
      "aria-invalid": !!localError,
      "aria-required": required,
    }),
    [id, localError, required]
  );

  return (
    <div className="relative">
      <div className="flex flex-col gap-1 relative">
        <div
          className={`flex flex-col relative bg-white px-4 py-1.5 text-black transition-colors duration-200 ${
            disabled ? "opacity-50 cursor-not-allowed" : ""
          } ${localError ? "border-red-500" : ""} ${className}`}
          id={id}
          {...accessibilityProps}
        >
          <div className="flex items-center justify-between">
            <Label
              htmlFor={id}
              className={`text-gray-500 text-sm ${
                disabled ? "cursor-not-allowed" : "cursor-pointer"
              } ${
                required
                  ? "after:content-['*'] after:ml-0.5 after:text-red-500"
                  : ""
              }`}
              onClick={handleLabelOrIconClick}
            >
              {label}
            </Label>
            <Calendar
              size={16}
              className={`text-gray-500 ${
                disabled
                  ? "cursor-not-allowed"
                  : "cursor-pointer hover:text-gray-700"
              } transition-colors duration-150`}
              onClick={handleLabelOrIconClick}
              aria-hidden="true"
            />
          </div>

          <div className="min-h-[30px]">
            <DatePicker
              date={value}
              setDate={handleDateChange}
              buttonRef={buttonRef}
              fromDate={actualMinDate}
              toDate={maxDate}
              disabled={disabled}
              placeholder={placeholder}
              {...accessibilityProps}
            />
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {localError && (
          <motion.div
            key="error"
            className="absolute text-red-500 text-sm mt-1 font-medium"
            variants={errorVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            id={`${id}-error`}
            role="alert"
            aria-live="polite"
          >
            {localError}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
