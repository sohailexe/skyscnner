// src/context/FlightContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
// interface Flight {
//   id: string;
//   origin: string;
//   destination: string;
//   departureTime: string;
//   arrivalTime: string;
//   // Add other fields as per your API response
// }
interface FlightContextType {
  flight: [];
  setFlight: React.Dispatch<React.SetStateAction<[]>>;
}

// Create Context with default empty object casted as FlightContextType
const FlightContext = createContext<FlightContextType | undefined>(undefined);

// Provider Component
export const FlightProvider = ({ children }: { children: ReactNode }) => {
  const [flight, setFlight] = useState<[]>([]);

  return (
    <FlightContext.Provider value={{ flight, setFlight }}>
      {children}
    </FlightContext.Provider>
  );
};

// Custom Hook
export const useFlight = (): FlightContextType => {
  const context = useContext(FlightContext);
  if (!context) {
    throw new Error("useFlight must be used within a FlightProvider");
  }
  return context;
};
