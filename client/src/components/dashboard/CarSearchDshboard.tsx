import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Car,
  Calendar,
  Clock,
  MapPin,
  ArrowRight,
  RotateCcw,
  X,
  CheckCircle2,
} from "lucide-react";

export type CarRental = {
  _id: string;
  pickUpLocation: string;
  pickUpDate: string;
  pickUpTime: string;
  dropOffLocation: string;
  dropOffDate: string;
  dropOffTime: string;
  returnToSameLocation: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

interface CarRentalDetailsProps {
  carRental: CarRental;
}

export default function CarSearchDashboard({
  carRental,
}: CarRentalDetailsProps) {
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM dd, yyyy");
    } catch (error) {
      return dateString;
    }
  };

  const pickUpDate = formatDate(carRental.pickUpDate);
  const dropOffDate = formatDate(carRental.dropOffDate);
  const createdAt = formatDate(carRental.createdAt);

  // Calculate rental duration in days
  const rentalDays = Math.round(
    (new Date(carRental.dropOffDate).getTime() -
      new Date(carRental.pickUpDate).getTime()) /
      (1000 * 60 * 60 * 24)
  );

  // Map airport codes to names (in a real app, this would come from an API)
  const airportMap: Record<string, string> = {
    JFK: "John F. Kennedy International Airport",
    LAX: "Los Angeles International Airport",
    ORD: "O'Hare International Airport",
    LHR: "London Heathrow Airport",
    CDG: "Charles de Gaulle Airport",
  };

  const pickUpLocationName =
    airportMap[carRental.pickUpLocation] || carRental.pickUpLocation;
  const dropOffLocationName =
    airportMap[carRental.dropOffLocation] || carRental.dropOffLocation;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card className="overflow-hidden border-none shadow-lg">
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Car Rental</h2>
              <p className="text-emerald-100">
                ID: {carRental._id.substring(0, 8)}...
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge
                variant="outline"
                className="bg-white/10 hover:bg-white/20 text-white border-white/20"
              >
                {rentalDays} {rentalDays === 1 ? "Day" : "Days"}
              </Badge>
              <Badge
                variant="outline"
                className="bg-white/10 hover:bg-white/20 text-white border-white/20"
              >
                <Clock className="mr-1 h-3 w-3" />
                {createdAt}
              </Badge>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between">
            <div className="text-center">
              <p className="text-emerald-200 text-sm">Pick-up</p>
              <h3 className="text-2xl font-bold">{carRental.pickUpLocation}</h3>
            </div>

            <div className="flex-1 px-8 flex items-center justify-center">
              <div className="w-full h-[2px] bg-white/30 relative">
                <Car className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 text-white h-6 w-6" />
              </div>
            </div>

            <div className="text-center">
              <p className="text-emerald-200 text-sm">Drop-off</p>
              <h3 className="text-2xl font-bold">
                {carRental.dropOffLocation}
              </h3>
            </div>
          </div>
        </div>

        <Tabs defaultValue="details" className="w-full">
          <div className="px-6 border-b">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="details">Rental Details</TabsTrigger>
              <TabsTrigger value="locations">Location Information</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="details" className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Calendar className="mr-2 h-5 w-5 text-emerald-500" />
                    Pick-up Date & Time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-semibold">{pickUpDate}</p>
                  <p className="text-lg text-muted-foreground">
                    {carRental.pickUpTime}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Calendar className="mr-2 h-5 w-5 text-emerald-500" />
                    Drop-off Date & Time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-semibold">{dropOffDate}</p>
                  <p className="text-lg text-muted-foreground">
                    {carRental.dropOffTime}
                  </p>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <RotateCcw className="mr-2 h-5 w-5 text-emerald-500" />
                    Return Policy
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center p-4 rounded-lg border">
                    {carRental.returnToSameLocation ? (
                      <>
                        <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                          <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                        </div>
                        <div className="ml-4">
                          <p className="font-medium">Return to Same Location</p>
                          <p className="text-sm text-muted-foreground">
                            The vehicle will be returned to the original pick-up
                            location
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                          <X className="h-5 w-5 text-amber-600" />
                        </div>
                        <div className="ml-4">
                          <p className="font-medium">
                            Different Drop-off Location
                          </p>
                          <p className="text-sm text-muted-foreground">
                            The vehicle will be returned to a different location
                            than pick-up
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Clock className="mr-2 h-5 w-5 text-emerald-500" />
                    Rental Duration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                          <Calendar className="h-5 w-5 text-emerald-600" />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm text-muted-foreground">
                            Start Date
                          </p>
                          <p className="font-medium">{pickUpDate}</p>
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    <div className="flex-1">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                          <Calendar className="h-5 w-5 text-emerald-600" />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm text-muted-foreground">
                            End Date
                          </p>
                          <p className="font-medium">{dropOffDate}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-emerald-50 rounded-lg text-center">
                    <p className="font-medium text-emerald-700">
                      Total Duration: {rentalDays}{" "}
                      {rentalDays === 1 ? "Day" : "Days"}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="locations" className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="mr-2 h-5 w-5 text-emerald-500" />
                    Pick-up Location
                  </CardTitle>
                  <CardDescription>{carRental.pickUpLocation}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center">
                        <MapPin className="h-6 w-6 text-emerald-600" />
                      </div>
                      <div className="ml-4">
                        <p className="font-medium text-lg">
                          {pickUpLocationName}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {carRental.pickUpDate &&
                            format(
                              new Date(carRental.pickUpDate),
                              "EEEE, MMMM d, yyyy"
                            )}
                        </p>
                        <p className="text-sm font-medium text-emerald-600">
                          {carRental.pickUpTime}
                        </p>
                      </div>
                    </div>

                    <div className="p-3 bg-gray-800 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">
                        Location Code
                      </p>
                      <p className="font-mono font-medium">
                        {carRental.pickUpLocation}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="mr-2 h-5 w-5 text-emerald-500" />
                    Drop-off Location
                  </CardTitle>
                  <CardDescription>{carRental.dropOffLocation}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center">
                        <MapPin className="h-6 w-6 text-emerald-600" />
                      </div>
                      <div className="ml-4">
                        <p className="font-medium text-lg">
                          {dropOffLocationName}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {carRental.dropOffDate &&
                            format(
                              new Date(carRental.dropOffDate),
                              "EEEE, MMMM d, yyyy"
                            )}
                        </p>
                        <p className="text-sm font-medium text-emerald-600">
                          {carRental.dropOffTime}
                        </p>
                      </div>
                    </div>

                    <div className="p-3 bg-gray-800 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">
                        Location Code
                      </p>
                      <p className="font-mono font-medium">
                        {carRental.dropOffLocation}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Car className="mr-2 h-5 w-5 text-emerald-500" />
                    Journey Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <div className="flex items-start">
                      <div className="min-w-[24px] flex flex-col items-center">
                        <div className="h-6 w-6 rounded-full bg-emerald-100 flex items-center justify-center z-10">
                          <MapPin className="h-3 w-3 text-emerald-600" />
                        </div>
                        <div className="w-[2px] h-16 bg-emerald-200"></div>
                        <div className="h-6 w-6 rounded-full bg-emerald-100 flex items-center justify-center z-10">
                          <MapPin className="h-3 w-3 text-emerald-600" />
                        </div>
                      </div>
                      <div className="ml-4 space-y-16">
                        <div>
                          <p className="font-medium">{pickUpLocationName}</p>
                          <p className="text-sm text-muted-foreground">
                            {pickUpDate} at {carRental.pickUpTime}
                          </p>
                        </div>
                        <div>
                          <p className="font-medium">{dropOffLocationName}</p>
                          <p className="text-sm text-muted-foreground">
                            {dropOffDate} at {carRental.dropOffTime}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-[26px] left-[12px] h-[2px] w-6 bg-emerald-200 rotate-90"></div>
                    <div className="absolute top-[26px] left-[12px] text-xs text-emerald-600 font-medium ml-8">
                      {rentalDays} {rentalDays === 1 ? "Day" : "Days"}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
