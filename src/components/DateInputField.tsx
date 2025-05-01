import { useRef } from "react";
import { Calendar } from "lucide-react";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/date-picker";

interface DateInputProps {
  id: string;
  label: string;
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  className?: string;
  error?: string;
}

export const DateInputField = ({
  id,
  label,
  value,
  onChange,
  className = "",
  error,
}: DateInputProps) => {
  const datePickerRef = useRef<HTMLButtonElement>(null);

  const handleLabelOrIconClick = () => {
    datePickerRef.current?.click();
  };

  return (
    <div className={`bg-white px-4 py-3 ${className}`}>
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
            buttonRef={datePickerRef as React.RefObject<HTMLButtonElement>}
          />
        </div>
        <Calendar
          className="h-4 w-4 text-gray-500 ml-2 cursor-pointer hover:text-gray-700 transition-colors"
          onClick={handleLabelOrIconClick}
        />
      </div>

      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
};
