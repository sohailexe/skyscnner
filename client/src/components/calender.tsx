import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  mode = "single",
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
    if (disabled) return;
    setCurrentMonth((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() - 1);
      return newDate;
    });
  };

  const handleNextMonth = () => {
    if (disabled) return;
    setCurrentMonth((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + 1);
      return newDate;
    });
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

  return (
    <div className={cn("p-4 select-none", className)}>
      <div className="flex justify-between items-center mb-4">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full hover:bg-accent hover:text-accent-foreground"
          onClick={handlePrevMonth}
          disabled={disabled}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="font-semibold text-base">
          {formatMonth(currentMonth)} {formatYear(currentMonth)}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full hover:bg-accent hover:text-accent-foreground"
          onClick={handleNextMonth}
          disabled={disabled}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-3">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="text-center text-xs text-muted-foreground font-medium pb-2"
          >
            {day.slice(0, 3)}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {calendarData.map((day, index) => {
          const isSelected = isSelectedDate(day as number);
          const isTodayDate = isToday(day as number);

          return (
            <div
              key={index}
              className={cn(
                "h-10 w-10 p-0 font-normal text-center relative",
                day ? "aria-selected:opacity-100" : "",
                !day ? "text-muted-foreground opacity-30" : "",
                day &&
                  !isSelected &&
                  !isTodayDate &&
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
                <div
                  className={cn(
                    "flex h-full w-full items-center justify-center rounded-full transition-all duration-200",
                    isSelected &&
                      "bg-primary text-primary-foreground shadow-sm",
                    isTodayDate &&
                      !isSelected &&
                      "border-2 border-primary text-primary font-medium",
                    !isSelected &&
                      !isTodayDate &&
                      "hover:bg-accent/70 hover:text-accent-foreground"
                  )}
                >
                  {day}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
