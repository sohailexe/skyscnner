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
    <div className="flex flex-col md:flex-row items-start space-x-2 ">
      <Icon className="size-8" />
      <p className=" ">
        <strong>{title}</strong> {description}
      </p>
    </div>
  );
};

export default HotelTipItem;
