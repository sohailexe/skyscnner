"use client";

import * as React from "react";
import { format, getMonth, getYear, setMonth, setYear } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
  onDateChange?: (date: Date | undefined) => void;
  startYear?: number;
  endYear?: number;
  placeholder?: string;
  className?: string;
  buttonRef?: React.RefObject<HTMLButtonElement>; // Add ref for external access
}

export function DatePicker({
  date,
  onDateChange,
  startYear = getYear(new Date()) - 1,
  endYear = getYear(new Date()) + 2,
  placeholder = "Select date",
  className,
  buttonRef, // Accept the buttonRef prop
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

  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, i) => startYear + i
  );

  const handleMonthChange = (month: string) => {
    if (!date) {
      const newDate = new Date();
      newDate.setMonth(months.indexOf(month));
      onDateChange?.(newDate);
      return;
    }

    const newDate = setMonth(date, months.indexOf(month));
    onDateChange?.(newDate);
  };

  const handleYearChange = (year: string) => {
    if (!date) {
      const newDate = new Date();
      newDate.setFullYear(parseInt(year));
      onDateChange?.(newDate);
      return;
    }

    const newDate = setYear(date, parseInt(year));
    onDateChange?.(newDate);
  };

  const handleSelect = (selectedDate: Date | undefined) => {
    onDateChange?.(selectedDate);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          ref={buttonRef} // Use the forwarded ref here
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-gray-500",
            className
          )}
        >
          {date ? format(date, "MMM dd, yyyy") : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="flex justify-between p-2">
          <Select
            onValueChange={handleMonthChange}
            value={date ? months[getMonth(date)] : months[getMonth(new Date())]}
          >
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
          <Select
            onValueChange={handleYearChange}
            value={
              date ? getYear(date).toString() : getYear(new Date()).toString()
            }
          >
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
          onSelect={handleSelect}
          initialFocus
          month={date || new Date()}
          defaultMonth={date || new Date()}
        />
      </PopoverContent>
    </Popover>
  );
}
