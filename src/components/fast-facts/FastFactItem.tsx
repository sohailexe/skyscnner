import React from "react";
import { LucideIcon } from "lucide-react";

interface FastFactItemProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

const FastFactItem: React.FC<FastFactItemProps> = ({
  icon: Icon,
  label,
  value,
}) => {
  return (
    <div className="flex flex-col  space-y-1">
      <Icon className="w-5 h-5" />
      <p className="text-sm ">{label}</p>
      <p className="text-base font-bold">{value}</p>
    </div>
  );
};

export default FastFactItem;
