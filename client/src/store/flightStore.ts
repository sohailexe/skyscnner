import { create } from "zustand";
import axios from "axios";

// --- Interfaces ---
export interface TravelerDetails {
  adults: number;
  children: { age: number }[];
}

export interface FlightSearchPayload {
  fromLocation: string;
  toLocation: string;
  departureDate: string;
  returnDate?: string; // Optional for one-way
  userTimezone: string;
  traverlerDetails: TravelerDetails;
}

export interface FlightResult {
  id: string; // Ensure this ID is unique per flight item
  airline: string;
  from: string; // e.g., "JFK"
  to: string; // e.g., "LHR"
  departureTime: string; // Format: "HH:MM" e.g., "08:30"
  arrivalTime: string; // Format: "HH:MM" e.g., "20:45"
  totalDuration: string; // Format: "Xh Ym", "Xh", or "Ym" e.g., "12h 15m"
  numberOfStops: number;
  cabinClass: string;
  totalPrice: string; // Store as string, parse to number for calcs
  currency: string; // e.g., "USD"
}

export interface ActiveFlightFilters {
  airlines: string[];
  stops: (number | "any")[];
  cabinClasses: string[];
  priceRange: { min: number; max: number } | null;
  durationRange: { min: number; max: number } | null; // in minutes
}

interface FlightState {
  allFetchedFlights: FlightResult[];
  flights: FlightResult[];
  loading: boolean;
  error: string | null;
  activeFilters: ActiveFlightFilters;
  fetchFlights: (payload: FlightSearchPayload) => Promise<void>;
  applyFlightFilters: (newFilters: Partial<ActiveFlightFilters>) => void;
  clearFlightFilters: () => void;
  getFilterOptions: () => {
    airlines: string[];
    cabinClasses: string[];
    minPrice: number;
    maxPrice: number;
    minDuration: number;
    maxDuration: number;
  };
}

// --- Helper Functions ---
const durationToMinutes = (durationStr: string): number => {
  if (!durationStr) return 0;
  let totalMinutes = 0;
  const hoursMatch = durationStr.match(/(\d+)h/);
  const minutesMatch = durationStr.match(/(\d+)m/);
  if (hoursMatch) totalMinutes += parseInt(hoursMatch[1]) * 60;
  if (minutesMatch) totalMinutes += parseInt(minutesMatch[1]);
  return totalMinutes;
};

const filterFlightsHelper = (
  flightsToFilter: FlightResult[],
  filters: ActiveFlightFilters
): FlightResult[] => {
  if (!flightsToFilter) return [];
  return flightsToFilter.filter((flight) => {
    if (!flight) return false;

    if (
      filters.airlines.length > 0 &&
      !filters.airlines.includes(flight.airline)
    ) {
      return false;
    }

    const stopFilterActive =
      filters.stops.length > 0 && !filters.stops.includes("any");
    if (stopFilterActive) {
      let matchesStopFilter = filters.stops.includes(flight.numberOfStops);
      if (
        !matchesStopFilter &&
        filters.stops.includes(2) &&
        flight.numberOfStops >= 2
      ) {
        // "2+" stops
        matchesStopFilter = true;
      }
      if (!matchesStopFilter) return false;
    }

    if (
      filters.cabinClasses.length > 0 &&
      !filters.cabinClasses.includes(flight.cabinClass)
    ) {
      return false;
    }

    const flightPrice = parseFloat(flight.totalPrice);
    if (
      filters.priceRange &&
      !isNaN(flightPrice) &&
      (flightPrice < filters.priceRange.min ||
        flightPrice > filters.priceRange.max)
    ) {
      return false;
    }

    const flightDurationMinutes = durationToMinutes(flight.totalDuration);
    if (
      filters.durationRange &&
      (flightDurationMinutes < filters.durationRange.min ||
        flightDurationMinutes > filters.durationRange.max)
    ) {
      return false;
    }

    return true;
  });
};

const initialFiltersState: ActiveFlightFilters = {
  airlines: [],
  stops: ["any"],
  cabinClasses: [],
  priceRange: null,
  durationRange: null,
};

export const useFlightStore = create<FlightState>((set, get) => ({
  allFetchedFlights: [],
  flights: [],
  loading: false,
  error: null,
  activeFilters: initialFiltersState,

  fetchFlights: async (payload) => {
    try {
      set({ loading: true, error: null, activeFilters: initialFiltersState });
      const response = await axios.post<FlightResult[]>( // Expecting FlightResult array
        "/api/booking/flight/unified-details",
        payload
      );

      const flightsWithIds = response.data.data.map((f, index) => ({
        ...f,
        id: f.id || `flight-${Date.now()}-${index}`, // Ensure unique ID
      }));

      set({
        allFetchedFlights: flightsWithIds,
        flights: flightsWithIds,
        loading: false,
      });
    } catch (error: any) {
      set({
        allFetchedFlights: [],
        flights: [],
        error:
          error.response?.data?.message ||
          error.message ||
          "Failed to fetch flights",
        loading: false,
      });
      // console.error("Fetch flights error:", error); // Optional: for debugging
      // throw error; // Re-throwing allows the caller to handle UI updates for errors
    }
  },

  applyFlightFilters: (newFilters) => {
    set((state) => {
      const updatedFilters = { ...state.activeFilters, ...newFilters };
      const filteredResults = filterFlightsHelper(
        state.allFetchedFlights,
        updatedFilters
      );
      return { activeFilters: updatedFilters, flights: filteredResults };
    });
  },

  clearFlightFilters: () => {
    set((state) => ({
      activeFilters: initialFiltersState,
      flights: state.allFetchedFlights,
    }));
  },

  getFilterOptions: () => {
    const { allFetchedFlights } = get();
    if (!allFetchedFlights || !allFetchedFlights.length) {
      return {
        airlines: [],
        cabinClasses: [],
        minPrice: 0,
        maxPrice: 0,
        minDuration: 0,
        maxDuration: 0,
      };
    }

    const airlines = Array.from(
      new Set(allFetchedFlights.map((f) => f.airline))
    ).sort();
    const cabinClasses = Array.from(
      new Set(allFetchedFlights.map((f) => f.cabinClass))
    ).sort();

    const prices = allFetchedFlights
      .map((f) => parseFloat(f.totalPrice))
      .filter((p) => !isNaN(p));
    const durations = allFetchedFlights
      .map((f) => durationToMinutes(f.totalDuration))
      .filter((d) => d > 0);

    return {
      airlines,
      cabinClasses,
      minPrice: prices.length ? Math.floor(Math.min(...prices)) : 0,
      maxPrice: prices.length ? Math.ceil(Math.max(...prices)) : 0,
      minDuration: durations.length ? Math.min(...durations) : 0,
      maxDuration: durations.length ? Math.max(...durations) : 0,
    };
  },
}));
