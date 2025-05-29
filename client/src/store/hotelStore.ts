/* eslint-disable @typescript-eslint/no-explicit-any */

import { create } from "zustand";
import axios from "axios";

export interface HotelData {
  hotelName: string;
  cityCode: string;
  roomCategory: string;
  bedInfo: string;
  description: string;
  checkIn: string;
  checkOut: string;
  price: string;
  currency: string;
  refundable: boolean;
  guests: number;
  bedType: string;
}

export interface HotelSearchPayload {
  destination: string;
  checkIn: string;
  checkout: string;
  roomType?: string;
  guestDetails: {
    adults: number;
    children: { age: number }[];
    rooms: number;
  };
  userTimezone: string;
}

interface HotelState {
  hotels: HotelData[];
  loading: boolean;
  error: string | null;
  fetchHotels: (payload: HotelSearchPayload) => Promise<void>;
}

export const useHotelStore = create<HotelState>((set) => ({
  hotels: [],
  loading: false,
  error: null,

  fetchHotels: async (payload) => {
    try {
      set({ loading: true, error: null });

      const response = await axios.post<{
        success: boolean;
        data: HotelData[];
      }>("/api/booking/hotel/unified-details", payload);

      console.log("Hotel data fetched successfully:", response.data);

      set({ hotels: response.data.data, loading: false });
    } catch (error: any) {
      set({
        error: error.message || "Failed to fetch hotels",
        loading: false,
      });
      throw error;
    }
  },
}));
