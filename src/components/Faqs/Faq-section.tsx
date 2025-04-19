import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import faqData from "@/db/faqs";

// Types definition
interface FaqItemType {
  question: string;
  answer: string;
}

interface FaqItemProps {
  item: FaqItemType;
  index: number;
  value?: string;
}

const FaqItem: React.FC<FaqItemProps> = ({ item, index, value }) => {
  return (
    <AccordionItem
      value={value || `item-${index}`}
      className="border-b border-gray-200"
    >
      <AccordionTrigger className="text-left font-medium py-4 hover:no-underline">
        {item.question}
      </AccordionTrigger>
      <AccordionContent className="mt-2 text-gray-700 pb-4">
        {item.answer}
      </AccordionContent>
    </AccordionItem>
  );
};

//FAQ Column
interface FaqColumnProps {
  items: FaqItemType[];
  defaultValue?: string;
}

const FaqColumn: React.FC<FaqColumnProps> = ({ items, defaultValue }) => {
  return (
    <div className="w-full md:w-1/2 lg:w-1/2 px-4">
      <Accordion
        type="single"
        collapsible
        defaultValue={defaultValue}
        className="w-full"
      >
        {items.map((item, index) => (
          <FaqItem
            key={`faq-item-${index}`}
            item={item}
            index={index}
            value={`item-${index}`}
          />
        ))}
      </Accordion>
    </div>
  );
};

// Main FAQ Section component
const FaqSection: React.FC = () => {
  const faqColumn1 = faqData.slice(0, Math.ceil(faqData.length / 2));
  const faqColumn2 = faqData.slice(Math.ceil(faqData.length / 2));

  return (
    <section className="bg-gray-50 py-12">
      <Card className="maxScreen mx-auto shadow-sm border-0">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl font-semibold">
            Booking flights with Skyscanner
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap -mx-4">
            <FaqColumn items={faqColumn1} />
            <FaqColumn items={faqColumn2} />
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default FaqSection;
