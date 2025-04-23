import { BedDouble, LucideIcon, Search, Tag } from "lucide-react";

interface Tip {
  icon: LucideIcon;
  title: string;
  description: string;
}

const hotelTips: Tip[] = [
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

export { hotelTips };
