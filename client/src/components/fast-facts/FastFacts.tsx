import React from "react";
import FastFactItem from "./FastFactItem";
import { LucideIcon } from "lucide-react";
interface Fact {
  icon: LucideIcon;
  label: string;
  value: string;
}
interface FastFactsProps {
  heading: string;
  description: string;
  dateList: Fact[];
}

const FastFacts: React.FC<FastFactsProps> = ({
  heading,
  description,
  dateList,
}) => {
  return (
    <section className="py-10">
      <div className="maxScreen">
        <h2 className="text-2xl font-bold mb-1">{heading}</h2>
        <p className="text-sm  mb-7">{description}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-3">
          {dateList.map((fact, index) => (
            <FastFactItem
              key={index}
              icon={fact.icon}
              label={fact.label}
              value={fact.value}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FastFacts;
