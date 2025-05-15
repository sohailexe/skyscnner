import { useCarStore } from "@/store/carStore";
import { AlertCircle, Clock, Users, Zap } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
// import { format } from "date-fns";

const CarSearchResult = () => {
  const cars = useCarStore((state) => state.cars);
  const loading = useCarStore((state) => state.loading);
  const error = useCarStore((state) => state.error);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center  mt-25">
        <div className="mb-4 text-red-500">
          <AlertCircle className="w-16 h-16" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Error Loading Results</h2>
        <p className="text-gray-600 mb-4">{error}</p>
        <Button variant="outline">Try Again</Button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6  mt-25">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm p-4">
            <Skeleton className="h-48 w-full rounded-lg mb-4" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <div className="flex gap-2 pt-4">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-16" />
              </div>
              <Skeleton className="h-10 w-full mt-4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!cars.length) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center  mt-25">
        <Zap className="w-16 h-16 text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold mb-2">No Cars Found</h2>
        <p className="text-gray-600">Try adjusting your search filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 mt-25">
      {cars.map((car) => (
        <div
          key={car.id}
          className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-4"
        >
          <div className="relative">
            <img
              src={car.vehicleImage}
              alt={car.vehicleDescription}
              className="w-full h-48 object-contain rounded-lg mb-4"
            />
            <img
              src={car.providerLogo}
              alt={car.providerName}
              className="w-16 h-16 absolute top-2 right-2 bg-white p-2 rounded-lg shadow-sm"
            />
          </div>

          <h3 className="text-lg font-semibold mb-2">
            {car.vehicleDescription}
          </h3>

          <div className="flex gap-4 text-sm text-gray-600 mb-4">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{car.seatCount} seats</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{car.distanceKm} km</span>
            </div>
          </div>

          <div className="space-y-2 text-sm border-t pt-4">
            <div className="flex justify-between">
              <span className="text-gray-500">Pickup:</span>
              <div className="text-right">
                <p className="font-medium">{car.startLocation}</p>
                <p>{car.startTime}</p>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Dropoff:</span>
              <div className="text-right">
                <p className="font-medium">{car.endLocation}</p>
                <p>{car.endTime}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mt-4 pt-4 border-t">
            <div className="text-gray-600 text-sm">From {car.providerName}</div>
            <div className="text-lg font-bold text-primary">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: car.currency,
              }).format(Number(car.price))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CarSearchResult;
