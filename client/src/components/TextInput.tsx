import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TextInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  error?: string;
}

export const TextInput = ({
  id,
  label,
  value,
  onChange,
  placeholder = "Country, city or airport",
  className = "",
  error,
}: TextInputProps) => (
  <div className={`bg-white px-2 py-1 md:px-4 md:py-3 ${className}`}>
    <Label htmlFor={id} className="text-sm text-gray-500 block mb-1">
      {label}
    </Label>
    <Input
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`border-0 p-0 bg-white text-black font-medium focus-visible:ring-0 h-auto ${
        error ? "border-b border-red-500" : ""
      }`}
    />
    {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
  </div>
);
