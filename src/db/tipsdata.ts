import { BedDouble, LucideIcon, Search, Tag, Plane } from "lucide-react";

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

const flightsTips: Tip[] = [
  {
    icon: Plane,
    title: "Find the best-value flight",
    description: "for your dates, search by price or preferences",
  },
  {
    icon: Tag,
    title: "Compare flight deals",
    description: "across hundreds of providers, all in one place",
  },
  {
    icon: Search,
    title: "Look out for flights with free cancellation",
    description: "or excellent ratings",
  },
];
export { hotelTips, flightsTips };
