import React from "react";
import { Bed, Building2, MapPin, LucideIcon } from "lucide-react";
import FastFactItem from "./FastFactItem";

interface Fact {
  icon: LucideIcon;
  label: string;
  value: string;
}

const facts: Fact[] = [
  { icon: Building2, label: "Hotel brands to choose from", value: "60+" },
  { icon: MapPin, label: "Hotel destinations to explore", value: "5,000+" },
  { icon: Bed, label: "Hotels available worldwide", value: "3.2 million" },
];

const FastFacts: React.FC = () => {
  return (
    <section className="py-10">
      <div className="maxScreen">
        <h2 className="text-2xl font-bold mb-1">Fast facts</h2>
        <p className="text-sm  mb-7">
          Sleep easy, armed with the stuff that's good to know before you go.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-3">
          {facts.map((fact, index) => (
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
