import React from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import bgImg from "@/assets/images/image.png";
interface HeroSectionProps {
  backgroundImageUrl?: string;
  title?: string;
  subtitle?: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

const FlightHero: React.FC<HeroSectionProps> = ({
  backgroundImageUrl = bgImg,
  subtitle = "Can't decide where to go?",
  title = "Explore every destination",
  buttonText = "Search flights Everywhere",
  onButtonClick = () => {},
}) => {
  return (
    <div className="maxScreen mt-8   relative  h-[500px] overflow-hidden rounded-lg">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundPosition: "center",
        }}
      />

      {/* Optional Overlay for better text visibility */}
      <div className="absolute inset-0 bg-black opacity-20" />

      {/* Content positioning */}
      <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 lg:p-16">
        <div className="max-w-md text-white">
          {/* Subtitle */}
          <p className="text-lg mb-2 font-medium">{subtitle}</p>

          {/* Main Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
            {title}
          </h1>

          {/* CTA Button */}
          <Button
            onClick={onButtonClick}
            className="bg-light-blue text-white hover:text-white/75 hover:bg-light-blue/75   flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium"
          >
            <Search size={16} />
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FlightHero;
