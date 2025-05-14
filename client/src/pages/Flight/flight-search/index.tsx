import { useFlightStore } from "@/store/flightStore";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const FlightCardSkeleton = () => {
  return (
    <Card className="border border-gray-200 rounded-lg overflow-hidden mb-4 pt-20">
      <div className="flex justify-between items-center p-4">
        <div className="flex-1 space-y-4">
          <Skeleton className="h-4 w-32" />
          <div className="flex items-center gap-4">
            <div className="space-y-1">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-3 w-12" />
            </div>
            <div className="flex flex-col items-center gap-1 flex-shrink-0">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-3 w-20" />
            </div>
            <div className="space-y-1">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-3 w-12" />
            </div>
          </div>
          <Skeleton className="h-3 w-48" />
        </div>
        <div className="flex flex-col items-end gap-2 w-32">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-9 w-full" />
        </div>
      </div>
    </Card>
  );
};

const FlightResult = () => {
  const flights = useFlightStore((state) => state.flights);
  const loading = useFlightStore((state) => state.loading);
  const error = useFlightStore((state) => state.error);

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center text-lg font-medium text-red-600">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl pt-20">
      <div className="space-y-4">
        {loading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <FlightCardSkeleton key={index} />
          ))
        ) : flights.length > 0 ? (
          flights.map((flight, index) => (
            <Card
              key={index}
              className="border border-gray-200 hover:shadow-lg transition-shadow duration-200 rounded-lg overflow-hidden mb-4"
            >
              <CardContent className="flex justify-between items-center p-4">
                <div className="flex-1 space-y-2">
                  <div className="text-sm text-gray-500 font-medium">
                    {flight.airline}
                  </div>
                  <div className="flex items-center gap-4">
                    <div>
                      <div className="text-lg font-semibold">
                        {flight.departureTime}
                      </div>
                      <div className="text-xs text-gray-500 uppercase">
                        {flight.from}
                      </div>
                    </div>
                    <div className="flex flex-col items-center flex-shrink-0">
                      <ArrowRight className="h-4 w-4 text-gray-500" />
                      <div className="text-xs text-gray-500 mt-1">
                        {flight.totalDuration}
                      </div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold">
                        {flight.arrivalTime}
                      </div>
                      <div className="text-xs text-gray-500 uppercase">
                        {flight.to}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    {flight.numberOfStops === 0
                      ? "Direct"
                      : `${flight.numberOfStops} stop${
                          flight.numberOfStops > 1 ? "s" : ""
                        }`}{" "}
                    • {flight.totalDuration} • {flight.cabinClass}
                  </div>
                </div>
                <div className="flex flex-col items-end w-32">
                  <div className="text-xl font-bold text-gray-900 mb-2">
                    {flight.totalPrice} {flight.currency}
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white text-sm w-full py-2">
                    Book
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center text-lg font-medium text-gray-600">
            No flight results found.
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightResult;
