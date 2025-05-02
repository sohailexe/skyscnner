import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface CalendarProps {
  mode?: "single" | "range" | "multiple";
  selected?: Date | Date[];
  onSelect?: (date: Date | undefined) => void;
  month?: Date;
  defaultMonth?: Date;
  initialFocus?: boolean;
  className?: string;
  disabled?: boolean;
}

export function Calendar({
  selected,
  onSelect,
  month,
  defaultMonth,
  initialFocus,
  className,
  disabled = false,
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState<Date>(
    month || defaultMonth || new Date()
  );
  const [slideDirection, setSlideDirection] = useState<"left" | "right">(
    "right"
  );
  const [isChangingMonth, setIsChangingMonth] = useState(false);

  useEffect(() => {
    if (month) {
      setCurrentMonth(month);
    }
  }, [month]);

  // Helper functions to replace date-fns
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const isSameDay = (date1: Date, date2: Date) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const isToday = (day: number) => {
    const today = new Date();
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    return isSameDay(date, today);
  };

  const isSelectedDate = (day: number) => {
    if (!selected || !day) return false;

    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );

    if (Array.isArray(selected)) {
      return selected.some(
        (selectedDate) => selectedDate && isSameDay(date, selectedDate)
      );
    } else {
      return isSameDay(date, selected);
    }
  };

  const isPastDate = (day: number) => {
    if (!day) return false;
    const today = new Date();
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    return date < new Date(today.setHours(0, 0, 0, 0));
  };

  const generateCalendarData = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);

    const days = [];

    // Add empty slots for days before the first day of month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  const handlePrevMonth = () => {
    if (disabled || isChangingMonth) return;
    setIsChangingMonth(true);
    setSlideDirection("left");

    setTimeout(() => {
      setCurrentMonth((prev) => {
        const newDate = new Date(prev);
        newDate.setMonth(prev.getMonth() - 1);
        return newDate;
      });
      setIsChangingMonth(false);
    }, 200);
  };

  const handleNextMonth = () => {
    if (disabled || isChangingMonth) return;
    setIsChangingMonth(true);
    setSlideDirection("right");

    setTimeout(() => {
      setCurrentMonth((prev) => {
        const newDate = new Date(prev);
        newDate.setMonth(prev.getMonth() + 1);
        return newDate;
      });
      setIsChangingMonth(false);
    }, 200);
  };

  const handleDateClick = (day: number | null) => {
    if (disabled || !day) return;

    const newDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );

    if (onSelect) {
      onSelect(newDate);
    }
  };

  const calendarData = generateCalendarData();

  // Format functions to replace date-fns
  const formatMonth = (date: Date) => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return monthNames[date.getMonth()];
  };

  const formatYear = (date: Date) => {
    return date.getFullYear().toString();
  };

  // Variants for animations
  const calendarVariants = {
    hidden: (direction: string) => ({
      x: direction === "right" ? 50 : -50,
      opacity: 0,
    }),
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: (direction: string) => ({
      x: direction === "right" ? -50 : 50,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    }),
  };

  const dayVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: i * 0.01,
        duration: 0.2,
        ease: "easeOut",
      },
    }),
  };

  return (
    <div
      className={cn(
        "p-2 sm:p-4 select-none rounded-lg bg-white shadow-md",
        className
      )}
    >
      <div className="relative">
        <div className="flex justify-between items-center mb-4 px-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
            onClick={handlePrevMonth}
            disabled={disabled}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <motion.div
            className="flex items-center gap-2 font-semibold text-base sm:text-lg"
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: -5 }}
            key={`${currentMonth.getMonth()}-${currentMonth.getFullYear()}`}
            transition={{ duration: 0.3 }}
          >
            <CalendarIcon className="h-4 w-4 text-primary hidden sm:inline-block" />
            <span>
              {formatMonth(currentMonth)} {formatYear(currentMonth)}
            </span>
          </motion.div>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
            onClick={handleNextMonth}
            disabled={disabled}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2 px-1">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
          <motion.div
            key={day}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            className="text-center text-xs text-muted-foreground font-medium pb-2"
          >
            {window.innerWidth < 640 ? day.charAt(0) : day.slice(0, 3)}
          </motion.div>
        ))}
      </div>

      <AnimatePresence mode="wait" custom={slideDirection}>
        <motion.div
          key={`${currentMonth.getMonth()}-${currentMonth.getFullYear()}`}
          custom={slideDirection}
          variants={calendarVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="grid grid-cols-7 gap-1 sm:gap-2">
            {calendarData.map((day, index) => {
              const isSelected = isSelectedDate(day as number);
              const isTodayDate = isToday(day as number);
              const isPast = isPastDate(day as number);

              return (
                <motion.div
                  key={`${index}-${currentMonth.getMonth()}`}
                  custom={index}
                  variants={dayVariants}
                  initial="hidden"
                  animate="visible"
                  className={cn(
                    "h-8 sm:h-10 w-8 sm:w-10 p-0 font-normal text-center relative",
                    day ? "aria-selected:opacity-100" : "",
                    !day ? "text-muted-foreground opacity-30" : "",
                    day && isPast && "text-muted-foreground opacity-50",
                    day &&
                      !isSelected &&
                      !isTodayDate &&
                      !isPast &&
                      "hover:bg-accent/50 hover:text-accent-foreground",
                    day && disabled && "opacity-50 cursor-not-allowed",
                    day &&
                      !disabled &&
                      "cursor-pointer transition-colors duration-200"
                  )}
                  aria-selected={isSelected}
                  tabIndex={initialFocus && index === 0 ? 0 : -1}
                  onClick={() => handleDateClick(day)}
                >
                  {day && (
                    <motion.div
                      whileHover={!disabled && !isPast ? { scale: 1.1 } : {}}
                      whileTap={!disabled && !isPast ? { scale: 0.95 } : {}}
                      className={cn(
                        "flex h-full w-full items-center justify-center rounded-full transition-all duration-200",
                        isSelected &&
                          "bg-primary text-primary-foreground shadow-sm",
                        isTodayDate &&
                          !isSelected &&
                          "border border-primary text-primary font-medium",
                        !isSelected &&
                          !isTodayDate &&
                          !isPast &&
                          "hover:bg-accent/70 hover:text-accent-foreground"
                      )}
                    >
                      <span className="text-xs sm:text-sm">{day}</span>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
