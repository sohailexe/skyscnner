import React from "react";
import { LucideIcon } from "lucide-react";
import TipsItem from "./TipsItem";

interface Tip {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface TipsProps {
  TipsData: Tip[];
}

const Tips: React.FC<TipsProps> = ({ TipsData }) => {
  return (
    <div className="maxScreen grid grid-cols-2 lg:grid-cols-3 gap-6 py-12">
      {TipsData.map((tip, index) => (
        <TipsItem
          key={index}
          icon={tip.icon}
          title={tip.title}
          description={tip.description}
        />
      ))}
    </div>
  );
};

export default Tips;
