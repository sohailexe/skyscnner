import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface InputSelectProps {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
}

const TIME_OPTIONS: string[] = Array.from({ length: 48 }, (_, i) => {
  const hours = Math.floor(i / 2)
    .toString()
    .padStart(2, "0");
  const minutes = i % 2 === 0 ? "00" : "30";
  return `${hours}:${minutes}`;
});

export const InputSelect: React.FC<InputSelectProps> = ({
  label,
  value,
  onValueChange,
}) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger
        className="w-full bg-white text-black px-4 py-0 rounded-lg  "
        style={{ height: "100%" }}
      >
        <div className="flex flex-col w-full gap-2 text-left justify-start h-full">
          <label className="text-gray-600  text-sm font-medium mb-1 ">
            {label}
          </label>
          <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
        </div>
      </SelectTrigger>

      <SelectContent className="max-h-96 overflow-y-auto">
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {TIME_OPTIONS.map((time) => (
            <SelectItem
              key={time}
              value={time}
              className="px-4 py-2 text-base hover:bg-gray-100"
            >
              {time}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
