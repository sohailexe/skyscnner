import React from "react";
import { ExternalLink } from "lucide-react";
import { Separator } from "@/components/ui/separator";

// Types for our footer data
type FooterLink = {
  label: string;
  href: string;
  id?: string;
  external?: boolean;
  rel?: string;
};

type FooterColumn = {
  title: string;
  links: FooterLink[];
};

// Reusable Footer Link component
const FooterLink: React.FC<FooterLink> = ({
  label,
  href,
  id,
  external,
  rel,
}) => {
  return (
    <li>
      <a
        href={href}
        id={id}
        rel={rel}
        target={external ? "_blank" : undefined}
        className=" hover:text-light-blue flex items-center gap-1 transition-colors duration-200"
      >
        {label}
        {external && <ExternalLink size={14} />}
      </a>
    </li>
  );
};

// Reusable Footer Column component
const FooterColumn: React.FC<{ column: FooterColumn }> = ({ column }) => {
  return (
    <div className="flex flex-col">
      <h3 className="font-bold text-xl mb-4">{column.title}</h3>
      <ul className="space-y-2">
        {column.links.map((link) => (
          <FooterLink key={link.label} {...link} />
        ))}
      </ul>
    </div>
  );
};

// Footer Component with footer data
const Footer: React.FC = () => {
  const footerData: FooterColumn[] = [
    {
      title: "Explore",
      links: [
        {
          label: "Hotels directory",
          href: "/hotels/directory",
          id: "hotels-cities",
        },
        { label: "Flights", href: "/flights", id: "flights-home" },
        {
          label: "Hotels Deals in Popular Cities",
          href: "/hotels",
          id: "hotels-home",
        },
        { label: "Car rental", href: "/car-rental", id: "car-hire-home" },
        {
          label: "Travel insurance",
          href: "/travel-insurance",
          id: "travel-insurance",
        },
        { label: "App", href: "/mobile.html", id: "mobile-apps" },
      ],
    },
    {
      title: "Partners",
      links: [
        {
          label: "Work with us",
          href: "https://www.partners.example.net/",
          id: "work-with-us",
          external: true,
        },
        {
          label: "Advertise with us",
          href: "https://www.partners.example.net/advertising/",
          id: "advertising",
          external: true,
        },
        {
          label: "Travel Insight",
          href: "https://www.partners.example.net/insights/travel-insight",
          id: "travel-insight",
          external: true,
        },
        {
          label: "Affiliates",
          href: "https://www.partners.example.net/affiliates/affiliate-products",
          id: "affiliates",
          external: true,
        },
        {
          label: "Travel APIs",
          href: "https://www.partners.example.net/affiliates/travel-apis",
          id: "api",
          external: true,
        },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About us", href: "/about-us", id: "about-skyscanner" },
        {
          label: "Why Choose Us?",
          href: "/about-us/why-choose-us",
          id: "customer-charter",
        },
        { label: "Media", href: "/media", id: "media-index" },
        {
          label: "Our people",
          href: "/about-us/our-people",
          id: "meet-the-team",
        },
        {
          label: "Accessibility",
          href: "/about-us/accessibility",
          id: "accessibility",
        },
        {
          label: "Sustainability",
          href: "/about-us/sustainable",
          id: "sustainability",
        },
        { label: "Brand story", href: "/about-us/brand", id: "brand" },
        {
          label: "Company Details",
          href: "/company-details",
          id: "company-details",
        },
        {
          label: "Jobs",
          href: "https://jobs.example.net",
          id: "jobs",
          external: true,
        },
        {
          label: "Cookie policy",
          href: "/media/cookie-policy",
          id: "cookie-policy",
          rel: "nofollow",
        },
        {
          label: "Privacy policy",
          href: "/media/privacy-policy",
          id: "privacy-policy",
          rel: "nofollow",
        },
        {
          label: "Terms of service",
          href: "/terms-of-service",
          id: "terms-of-service",
        },
      ],
    },
    {
      title: "Help",
      links: [
        { label: "Help Center", href: "/help", id: "help-center" },
        {
          label: "Privacy settings",
          href: "/privacy-settings",
          id: "privacy-settings",
          rel: "nofollow",
        },
        { label: "Security", href: "/security", id: "security" },
      ],
    },
  ];

  return (
    <footer className="bg-dark-blue text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {footerData.map((column) => (
            <FooterColumn key={column.title} column={column} />
          ))}
        </div>

        <Separator className="my-6" />

        <div className="text-center text-sm text-muted-foreground">
          <p>Compare and book cheap flights with ease</p>
          <p>
            © {new Date().getFullYear()} Company Name Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
