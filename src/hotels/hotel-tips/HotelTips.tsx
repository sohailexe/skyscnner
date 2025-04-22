import React from "react";
import { Search, Tag, BedDouble, LucideIcon } from "lucide-react";
import HotelTipItem from "./HotelTipItem";

interface Tip {
  icon: LucideIcon;
  title: string;
  description: string;
}

const HotelTips: React.FC = () => {
  const tips: Tip[] = [
    {
      icon: Search,
      title: "Find the best-value hotel",
      description: "for your dates, search by price or preferences",
    },
    {
      icon: Tag,
      title: "Compare hotel deals",
      description: "across hundreds of providers, all in one place",
    },
    {
      icon: BedDouble,
      title: "Look out for hotels with free cancellation",
      description: "or excellent ratings",
    },
  ];

  return (
    <div className="maxScreen grid grid-cols-3  gap-6 p-4">
      {tips.map((tip, index) => (
        <HotelTipItem
          key={index}
          icon={tip.icon}
          title={tip.title}
          description={tip.description}
        />
      ))}
    </div>
  );
};

export default HotelTips;
