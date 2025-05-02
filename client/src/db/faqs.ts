interface FaqItemType {
  question: string;
  answer: string;
}

const faqData: FaqItemType[] = [
  {
    question: "How does Skyscanner work?",
    answer:
      "Skyscanner is a travel search engine that compares millions of flights across thousands of airlines and travel agents. We show you the available options so you can choose the one that best suits your needs.",
  },
  {
    question: "How can I find the cheapest flight using Skyscanner?",
    answer:
      "Use our 'Whole month' or 'Cheapest month' view in the flight search to see the lowest prices across a wider date range. Be flexible with your travel dates and consider flying on less popular days or times.",
  },
  {
    question: "Where should I book a flight to right now?",
    answer:
      "Flight prices and popular destinations can vary greatly. Use our explore feature to see potential destinations based on your budget or browse popular routes from your location.",
  },
  {
    question: "Do I book my flight with Skyscanner?",
    answer:
      "No, Skyscanner is a search engine. Once you find a flight you like, we'll redirect you to the airline or travel agent's website to complete your booking.",
  },
  {
    question: "What happens after I have booked my flight?",
    answer:
      "After booking, you will receive a confirmation email from the airline or travel agent you booked with. Skyscanner does not handle the booking process or provide post-booking support.",
  },
  {
    question: "Does Skyscanner do hotels too?",
    answer:
      "Yes, Skyscanner also searches and compares prices for hotels and accommodations worldwide.",
  },
  {
    question: "What about car hire?",
    answer:
      "Yes, you can also use Skyscanner to compare car rental options from various providers.",
  },
  {
    question: "What's a Price Alert?",
    answer:
      "Set up a Price Alert on Skyscanner to track the price of a specific flight route. We'll notify you via email if the price goes up or down.",
  },
  {
    question: "Can I book a flexible flight ticket?",
    answer:
      "While Skyscanner doesn't directly offer flexible tickets, you can often find options with flexible booking policies offered by airlines and travel agents. Look for these options when you are redirected to their site.",
  },
  {
    question: "Can I book flights that emit less CO₂?",
    answer:
      "Some airlines and travel agents offer options for flights with lower CO₂ emissions. Look for labels or filters indicating these choices when you are redirected to their booking site.",
  },
];

export default faqData;
