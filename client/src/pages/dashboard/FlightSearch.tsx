import axios from "@/api/axios";
import FlightSearchDetails, {
  FlightSearch as FlightSearchData,
} from "@/components/dashboard/FlightSearchDashboard";
import LoadingBar from "@/components/LoadingBar";
import { useQuery } from "@tanstack/react-query";

const FlightSearch = () => {
  const { data, isLoading, isError, error, refetch } = useQuery<
    FlightSearchData[],
    Error
  >({
    queryKey: ["get-flight-searchs"],
    queryFn: async () => {
      const response = await axios.get("dashboard/get-flight-search");
      return response.data;
    },
    refetchOnWindowFocus: false,
  });
  if (isLoading) return <LoadingBar text="Flights Data" />;

  if (isError) {
    return (
      <main className="flex flex-col items-center justify-center h-full p-10 text-center">
        <p className="text-red-500 text-lg font-medium mb-4">
          Failed to load flight data: {error.message}
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
        <p className="text-gray-300 text-lg">No flight searches found.</p>
      </main>
    );
  }

  return (
    <main className="p-4 space-y-6">
      {data.map((flight) => (
        <FlightSearchDetails flightSearch={flight} key={flight._id} />
      ))}
    </main>
  );
};

export default FlightSearch;
