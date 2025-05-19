import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/calender";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DatePickerProps {
  date?: Date;
  setDate: (date: Date | undefined) => void;
  startYear?: number;
  endYear?: number;
  placeholder?: string;
  className?: string;
  buttonRef?: React.RefObject<HTMLButtonElement> | null;
  fromDate?: Date; // Minimum selectable date
  toDate?: Date; // Maximum selectable date
}

export function DatePicker({
  date,
  setDate,
  startYear = new Date().getFullYear(),
  endYear = new Date().getFullYear() + 5,
  placeholder = "Select date",
  className,
  buttonRef,
  fromDate,
  toDate,
}: DatePickerProps) {
  const months = [
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

  // Adjust the year range based on fromDate if provided
  const actualStartYear = fromDate
    ? Math.max(startYear, fromDate.getFullYear())
    : startYear;

  // Adjust the year range based on toDate if provided
  const actualEndYear = toDate
    ? Math.min(endYear, toDate.getFullYear())
    : endYear;

  const years = Array.from(
    { length: actualEndYear - actualStartYear + 1 },
    (_, i) => actualStartYear + i
  );

  // Helper functions to replace date-fns
  const getMonth = (date: Date) => {
    return date.getMonth();
  };

  const getYear = (date: Date) => {
    return date.getFullYear();
  };

  const setMonth = (date: Date, monthIndex: number) => {
    const newDate = new Date(date);
    newDate.setMonth(monthIndex);

    // Validate month change doesn't make date invalid with fromDate
    if (fromDate && newDate < fromDate) {
      // If setting this month makes the date before fromDate,
      // use fromDate's day but keep the selected month/year
      newDate.setDate(fromDate.getDate());

      // If still invalid, use fromDate's month too
      if (newDate < fromDate) {
        return fromDate;
      }
    }

    // Validate month change doesn't make date invalid with toDate
    if (toDate && newDate > toDate) {
      // If setting this month makes the date after toDate,
      // adjust to the last day of the allowed range
      return toDate;
    }

    return newDate;
  };

  const setYear = (date: Date, year: number) => {
    const newDate = new Date(date);
    newDate.setFullYear(year);

    // Validate year change doesn't make date invalid with fromDate
    if (fromDate && newDate < fromDate) {
      // If changing to this year makes the date before fromDate,
      // adjust the date to be at least fromDate
      return new Date(Math.max(newDate.getTime(), fromDate.getTime()));
    }

    // Validate year change doesn't make date invalid with toDate
    if (toDate && newDate > toDate) {
      // If changing to this year makes the date after toDate,
      // adjust the date to be at most toDate
      return new Date(Math.min(newDate.getTime(), toDate.getTime()));
    }

    return newDate;
  };

  const format = (date: Date) => {
    // Simple formatter for "MMM dd, yyyy" format
    const monthAbbr = months[date.getMonth()].substring(0, 3);
    const day = date.getDate();
    const year = date.getFullYear();

    return `${monthAbbr} ${day < 10 ? "0" + day : day}, ${year}`;
  };

  const handleMonthChange = (month: string) => {
    if (!date) {
      // Create a new date starting with today or fromDate (whichever is later)
      const baseDate =
        fromDate && fromDate > new Date() ? fromDate : new Date();
      const newDate = setMonth(baseDate, months.indexOf(month));
      setDate(newDate);
      return;
    }

    const newDate = setMonth(date, months.indexOf(month));
    setDate(newDate);
  };

  const handleYearChange = (year: string) => {
    if (!date) {
      // Create a new date starting with today or fromDate (whichever is later)
      const baseDate =
        fromDate && fromDate > new Date() ? fromDate : new Date();
      const newDate = setYear(baseDate, parseInt(year));
      setDate(newDate);
      return;
    }

    const newDate = setYear(date, parseInt(year));
    setDate(newDate);
  };

  // Determine the current displayed month/year considering validation constraints
  const getDisplayDate = () => {
    if (date) return date;

    // No date selected yet, show current month/year or fromDate if it's in the future
    const now = new Date();
    if (fromDate && fromDate > now) {
      return fromDate;
    }
    return now;
  };

  // Get appropriate month value for dropdown
  const getCurrentMonth = () => {
    const displayDate = getDisplayDate();
    return months[getMonth(displayDate)];
  };

  // Get appropriate year value for dropdown
  const getCurrentYear = () => {
    const displayDate = getDisplayDate();
    return getYear(displayDate).toString();
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          ref={buttonRef}
          className={cn(
            "w-full justify-start text-left border-none font-normal",
            !date && "text-gray-500",
            className
          )}
        >
          {date ? format(date) : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="flex justify-between p-2">
          <Select onValueChange={handleMonthChange} value={getCurrentMonth()}>
            <SelectTrigger className="w-24">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              {months.map((month) => (
                <SelectItem key={month} value={month}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={handleYearChange} value={getCurrentYear()}>
            <SelectTrigger className="w-24">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
          month={getDisplayDate()}
          defaultMonth={getDisplayDate()}
          // fromDate and toDate props removed because Calendar does not accept them
        />
      </PopoverContent>
    </Popover>
  );
}
