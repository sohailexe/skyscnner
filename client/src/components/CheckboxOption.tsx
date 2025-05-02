import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface CheckboxOptionProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: () => void;
  className?: string;
}

export const CheckboxOption = ({
  id,
  label,
  checked,
  onChange,
  className = "",
}: CheckboxOptionProps) => (
  <div className={`flex items-center space-x-2 ${className}`}>
    <Checkbox
      id={id}
      checked={checked}
      onCheckedChange={onChange}
      className="text-blue-600 focus:ring-blue-500"
    />
    <Label htmlFor={id} className="text-sm md:text-base cursor-pointer">
      {label}
    </Label>
  </div>
);
