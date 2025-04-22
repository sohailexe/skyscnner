import React from "react";
import { LucideIcon } from "lucide-react";

interface HotelTipItemProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const HotelTipItem: React.FC<HotelTipItemProps> = ({
  icon: Icon,
  title,
  description,
}) => {
  return (
    <div className="flex items-start space-x-2 max-w-xs">
      <Icon className="h-5 w-5 mt-1 text-gray-700" />
      <p className="text-sm text-gray-800">
        <strong>{title}</strong> {description}
      </p>
    </div>
  );
};

export default HotelTipItem;
