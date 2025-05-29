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
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  Users,
  Bed,
  Clock,
  MapPin,
  Home,
  Baby,
  User,
  Hotel,
  DoorOpen,
} from "lucide-react";

type Child = {
  age: number;
};

type GuestDetails = {
  adults: number;
  children: Child[];
  rooms: number;
};

export type HotelBooking = {
  _id: string;
  Destination: string;
  CheckIn: string;
  CheckOut: string;
  RoomType: string;
  GuestDetails: GuestDetails;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

interface HotelBookingDetailsProps {
  hotelBooking: HotelBooking;
}

export default function HotelBookingSearchDashboard({
  hotelBooking,
}: HotelBookingDetailsProps) {
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM dd, yyyy");
    } catch (error) {
      return dateString;
    }
  };

  const checkInDate = formatDate(hotelBooking.CheckIn);
  const checkOutDate = formatDate(hotelBooking.CheckOut);
  const createdAt = formatDate(hotelBooking.createdAt);

  // Calculate number of nights
  const nights = Math.round(
    (new Date(hotelBooking.CheckOut).getTime() -
      new Date(hotelBooking.CheckIn).getTime()) /
      (1000 * 60 * 60 * 24)
  );

  // Get total guests count
  const totalGuests =
    hotelBooking.GuestDetails.adults +
    (hotelBooking.GuestDetails.children?.length || 0);

  // Map destination codes to city names (in a real app, this would come from an API)
  const destinationMap: Record<string, string> = {
    PAR: "Paris",
    LON: "London",
    NYC: "New York",
    TYO: "Tokyo",
    ROM: "Rome",
  };

  const destinationName =
    destinationMap[hotelBooking.Destination] || hotelBooking.Destination;

  // Map room types to readable names
  const roomTypeMap: Record<string, string> = {
    SINGLE: "Single Room",
    DOUBLE: "Double Room",
    TWIN: "Twin Room",
    SUITE: "Suite",
    FAMILY: "Family Room",
  };

  const roomTypeName =
    roomTypeMap[hotelBooking.RoomType] || hotelBooking.RoomType;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card className="overflow-hidden border-none shadow-lg">
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Hotel Booking</h2>
              <p className="text-amber-100">
                ID: {hotelBooking._id.substring(0, 8)}...
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge
                variant="outline"
                className="bg-white/10 hover:bg-white/20 text-white border-white/20"
              >
                {nights} {nights === 1 ? "Night" : "Nights"}
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
            <div className="text-center flex-1">
              <div className="flex flex-col items-center">
                <div className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center mb-2">
                  <Hotel className="h-8 w-8" />
                </div>
                <h3 className="text-3xl font-bold">{destinationName}</h3>
                <p className="text-amber-100 text-sm mt-1">
                  <MapPin className="inline-block mr-1 h-3 w-3" />
                  {hotelBooking.Destination}
                </p>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="details" className="w-full">
          <div className="px-6 border-b">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="details">Booking Details</TabsTrigger>
              <TabsTrigger value="guests">Guest Information</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="details" className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Calendar className="mr-2 h-5 w-5 text-amber-500" />
                    Check-in Date
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-semibold">{checkInDate}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Calendar className="mr-2 h-5 w-5 text-amber-500" />
                    Check-out Date
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-semibold">{checkOutDate}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Bed className="mr-2 h-5 w-5 text-amber-500" />
                    Room Type
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                      <DoorOpen className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-xl font-semibold">{roomTypeName}</p>
                      <p className="text-sm text-muted-foreground">
                        {hotelBooking.GuestDetails.rooms}{" "}
                        {hotelBooking.GuestDetails.rooms === 1
                          ? "Room"
                          : "Rooms"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Clock className="mr-2 h-5 w-5 text-amber-500" />
                    Booking Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <div className="text-sm">
                      <p className="text-muted-foreground">Created</p>
                      <p className="font-medium">
                        {formatDate(hotelBooking.createdAt)}
                      </p>
                    </div>
                    <Separator orientation="vertical" className="h-8" />
                    <div className="text-sm">
                      <p className="text-muted-foreground">Updated</p>
                      <p className="font-medium">
                        {formatDate(hotelBooking.updatedAt)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="guests" className="p-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5 text-amber-500" />
                  Guest Information
                </CardTitle>
                <CardDescription>
                  {totalGuests} total {totalGuests === 1 ? "guest" : "guests"}{" "}
                  in {hotelBooking.GuestDetails.rooms}{" "}
                  {hotelBooking.GuestDetails.rooms === 1 ? "room" : "rooms"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {hotelBooking.GuestDetails.adults > 0 && (
                    <div>
                      <h4 className="text-sm font-medium flex items-center mb-2">
                        <User className="mr-2 h-4 w-4 text-amber-500" />
                        Adults
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {Array.from({
                          length: hotelBooking.GuestDetails.adults,
                        }).map((_, i) => (
                          <div
                            key={`adult-${i}`}
                            className="flex items-center p-3 border rounded-lg"
                          >
                            <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
                              <User className="h-4 w-4 text-amber-600" />
                            </div>
                            <div className="ml-3">
                              <p className="font-medium">Adult {i + 1}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {hotelBooking.GuestDetails.children &&
                    hotelBooking.GuestDetails.children.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium flex items-center mb-2">
                          <Baby className="mr-2 h-4 w-4 text-amber-500" />
                          Children
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {hotelBooking.GuestDetails.children.map(
                            (child, i) => (
                              <div
                                key={`child-${i}`}
                                className="flex items-center p-3 border rounded-lg"
                              >
                                <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
                                  <Baby className="h-4 w-4 text-amber-600" />
                                </div>
                                <div className="ml-3">
                                  <p className="font-medium">Child {i + 1}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {child.age} years old
                                  </p>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}

                  <div>
                    <h4 className="text-sm font-medium flex items-center mb-2">
                      <Home className="mr-2 h-4 w-4 text-amber-500" />
                      Room Allocation
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Array.from({
                        length: hotelBooking.GuestDetails.rooms,
                      }).map((_, i) => (
                        <div
                          key={`room-${i}`}
                          className="p-4 border rounded-lg"
                        >
                          <div className="flex items-center mb-3">
                            <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                              <DoorOpen className="h-5 w-5 text-amber-600" />
                            </div>
                            <div className="ml-3">
                              <p className="font-medium">Room {i + 1}</p>
                              <p className="text-sm text-muted-foreground">
                                {roomTypeName}
                              </p>
                            </div>
                          </div>
                          <Separator className="my-3" />
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">
                              Max Occupancy
                            </span>
                            <span className="font-medium">
                              {hotelBooking.RoomType === "SINGLE"
                                ? "1 Person"
                                : hotelBooking.RoomType === "DOUBLE" ||
                                  hotelBooking.RoomType === "TWIN"
                                ? "2 People"
                                : hotelBooking.RoomType === "SUITE"
                                ? "2-4 People"
                                : "4-6 People"}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
