import { CheckboxOption } from "./CheckboxOption";

interface FlightOptionsProps {
  nearbyAirports: boolean;
  directFlightsOnly: boolean;
  onNearbyAirportsChange: () => void;
  onDirectFlightsOnlyChange: () => void;
  className?: string;
}

export const FlightOptions = ({
  nearbyAirports,
  directFlightsOnly,
  onNearbyAirportsChange,
  onDirectFlightsOnlyChange,
  className = "flex flex-wrap items-center gap-6 mt-6",
}: FlightOptionsProps) => (
  <div className={className}>
    <CheckboxOption
      id="nearbyAirports"
      label="Include nearby airports"
      checked={nearbyAirports}
      onChange={onNearbyAirportsChange}
    />
    <CheckboxOption
      id="directFlightsOnly"
      label="Direct flights only"
      checked={directFlightsOnly}
      onChange={onDirectFlightsOnlyChange}
    />
  </div>
);
