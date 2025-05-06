import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface InputSelectProps {
  label: string;
  options: { value: string; label: string }[];
  placeholder?: string;
  defaultValue?: string;
  id?: string;
  groupLabel?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export default function InputSelect({
  label,
  options,
  placeholder = "Select an option",
  defaultValue,
  id,
  groupLabel,
  onChange,
  className = "w-full",
}: InputSelectProps) {
  // Generate a unique ID if none is provided
  const selectId = id || `select-${label.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div className="space-y-2">
      <Label
        htmlFor={selectId}
        className="block text-gray-700 font-medium mb-1 text-lg"
      >
        {label}
      </Label>
      <Select defaultValue={defaultValue} onValueChange={onChange}>
        <SelectTrigger
          id={selectId}
          className={
            className +
            " px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 "
          }
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {groupLabel && <SelectLabel>{groupLabel}</SelectLabel>}
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
