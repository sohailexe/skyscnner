/* eslint-disable @typescript-eslint/no-explicit-any */

import { create } from "zustand";
import axios from "axios";

export interface CarData {
  id: string;
  providerName: string;
  providerLogo: string;
  vehicleImage: string;
  vehicleDescription: string;
  seatCount: number;
  startTime: string;
  startLocation: string;
  endTime: string;
  endLocation: string;
  price: string;
  currency: string;
  distanceKm: number;
}

export interface CarSearchPayload {
  pickUpLocation: string;
  pickUpDate: string;
  pickUpTime: string;
  dropOffLocation: string;
  dropOffDate: string;
  dropOffTime: string;
  returnToSameLocation: boolean;
}

interface CarState {
  cars: CarData[];
  loading: boolean;
  error: string | null;
  fetchCars: (payload: CarSearchPayload) => Promise<void>;
}

export const useCarStore = create<CarState>((set) => ({
  cars: [],
  loading: false,
  error: null,

  fetchCars: async (payload) => {
    try {
      set({ loading: true, error: null });

      const response = await axios.post<{
        success: boolean;
        data: CarData[];
      }>("/api/booking/car/unified-details", payload);

      console.log("Car data fetched successfully:", response.data);

      set({ cars: response.data.data, loading: false });
    } catch (error: any) {
      set({
        error: error.message || "Failed to fetch cars",
        loading: false,
      });
      throw error;
    }
  },
}));
