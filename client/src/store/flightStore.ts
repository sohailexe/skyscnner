import { create } from "zustand";
import axios from "axios";

export interface TravelerDetails {
  adults: number;
  children: { age: number }[];
}

export interface FlightSearchPayload {
  fromLocation: string;
  toLocation: string;
  departureDate: string;
  returnDate: string;
  userTimezone: string;
  traverlerDetails: TravelerDetails; // Corrected spelling
}

export interface FlightResult {
  airline: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  totalDuration: string;
  numberOfStops: number;
  cabinClass: string;
  totalPrice: string;
  currency: string;
}

interface FlightState {
  flights: FlightResult[];
  loading: boolean;
  error: string | null;
  fetchFlights: (payload: FlightSearchPayload) => Promise<void>;
}

export const useFlightStore = create<FlightState>((set) => ({
  flights: [],
  loading: false,
  error: null,

  fetchFlights: async (payload) => {
    try {
      set({ loading: true, error: null });
      const response = await axios.post<FlightResult[]>(
        "/api/booking/flight/unified-details",
        payload
      );

      set({ flights: response.data, loading: false });
    } catch (error: any) {
      set({
        error: error.message || "Failed to fetch flights",
        loading: false,
      });
      // Optionally rethrow to allow caller to handle the error
      throw error;
    }
  },
}));
