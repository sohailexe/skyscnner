import React from "react";
import { Flight } from "./types";
import { FlightCard } from "./FlightCard";

interface FlightResultsProps {
  flights: Flight[];
}

export const FlightResults: React.FC<FlightResultsProps> = ({ flights }) => (
  <div className="space-y-4">
    {flights.map((flight) => (
      <FlightCard key={flight.id} flight={flight} />
    ))}
  </div>
);
