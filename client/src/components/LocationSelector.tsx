import { Button } from "@/components/ui/button";
import { ArrowLeftRight } from "lucide-react";
import { useState } from "react";
import { TextInput } from "./TextInput";

interface LocationSelectorProps {
  origin: string;
  destination: string;
  onOriginChange: (value: string) => void;
  onDestinationChange: (value: string) => void;
  originError?: string;
  destinationError?: string;
  originClassName?: string;
  destinationClassName?: string;
}

export const LocationSelector = ({
  origin,
  destination,
  onOriginChange,
  onDestinationChange,
  originError,
  destinationError,
  originClassName = "rounded-t-2xl md:rounded-t-none md:rounded-l-2xl pr-6",
  destinationClassName = "md:pl-8",
}: LocationSelectorProps) => {
  const [rotated, setRotated] = useState<boolean>(false);

  const handleSwapLocations = () => {
    onOriginChange(destination);
    onDestinationChange(origin);
    setRotated((prev) => !prev);
  };

  return (
    <>
      <div className="relative md:col-span-3">
        <TextInput
          id="origin"
          label="From"
          value={origin}
          onChange={onOriginChange}
          className={originClassName}
          error={originError}
        />
        <div className="absolute right-0 translate-x-1/2 top-1/2 -translate-y-1/2 z-10">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className={`rounded-full bg-white size-10 md:size-12 border-4 border-dark-blue transition-all ${
              rotated ? "rotate-180" : ""
            }`}
            onClick={handleSwapLocations}
            aria-label="Swap origin and destination"
          >
            <ArrowLeftRight className="h-4 w-4 md:h-5 md:w-5 text-dark-blue" />
          </Button>
        </div>
      </div>
      <div className="md:col-span-3">
        <TextInput
          id="destination"
          label="To"
          value={destination}
          onChange={onDestinationChange}
          className={destinationClassName}
          error={destinationError}
        />
      </div>
    </>
  );
};
