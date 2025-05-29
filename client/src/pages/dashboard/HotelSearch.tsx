import axios from "@/api/axios";
import HotelBookingSearchDashboard, {
  HotelBooking,
} from "@/components/dashboard/HotelSearchDashboard";
import LoadingBar from "@/components/LoadingBar";
import { useQuery } from "@tanstack/react-query";

const HotelSearch = () => {
  const { data, isLoading, isError, error, refetch } = useQuery<
    HotelBooking[],
    Error
  >({
    queryKey: ["get-hotel-searchs"],
    queryFn: async () => {
      const response = await axios.get("dashboard/get-hotel-booking-search");
      return response.data;
    },
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <LoadingBar text="Hotels Data" />;

  if (isError) {
    return (
      <main className="flex flex-col items-center justify-center h-full p-10 text-center">
        <p className="text-red-500 text-lg font-medium mb-4">
          Failed to load hotel data: {error.message}
        </p>
        <button
          onClick={() => refetch()}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Try Again
        </button>
      </main>
    );
  }

  if (!data || data.length === 0) {
    return (
      <main className="flex items-center justify-center h-full p-10">
        <p className="text-gray-300 text-lg">No hotel searches found.</p>
      </main>
    );
  }
  return (
    <main className="p-4 space-y-6">
      {data.map((hotelBooking) => (
        <HotelBookingSearchDashboard
          hotelBooking={hotelBooking}
          key={hotelBooking._id}
        />
      ))}
    </main>
  );
};

export default HotelSearch;
