import { useState } from "react";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Plane,
  Calendar,
  Users,
  ArrowRight,
  User,
  Mail,
  Clock,
  CheckCircle2,
  XCircle,
  Baby,
} from "lucide-react";

type PopulatedUser = {
  _id: string;
  username: string;
  email: string;
  gender: string;
  isVerified: boolean;
};

type Child = {
  age: number;
};

type TravelerDetails = {
  adults: number;
  children: Child[];
};

export type FlightSearch = {
  _id: string;
  user: PopulatedUser | null;
  From: string;
  To: string;
  DepartureDate: string;
  ReturnDate: string;
  TravelerDetails?: TravelerDetails;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

interface FlightSearchDetailsProps {
  flightSearch: FlightSearch;
}

export default function FlightSearchDetails({
  flightSearch,
}: FlightSearchDetailsProps) {
  const [_, setActiveTab] = useState("details");

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM dd, yyyy");
    } catch (error) {
      return dateString;
    }
  };

  const departureDate = formatDate(flightSearch.DepartureDate);
  const returnDate = flightSearch.ReturnDate
    ? formatDate(flightSearch.ReturnDate)
    : null;
  const createdAt = formatDate(flightSearch.createdAt);

  // Get total travelers count
  const totalTravelers =
    (flightSearch.TravelerDetails?.adults || 0) +
    (flightSearch.TravelerDetails?.children?.length || 0);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card className="overflow-hidden border-none shadow-lg">
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Flight Search</h2>
              <p className="text-sky-100">
                ID: {String(flightSearch._id).slice(0, 8)}...
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge
                variant="outline"
                className="bg-white/10 hover:bg-white/20 text-white border-white/20"
              >
                {returnDate ? "Round Trip" : "One Way"}
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
              <p className="text-sky-200 text-sm">From</p>
              <h3 className="text-3xl font-bold">{flightSearch.From}</h3>
            </div>

            <div className="flex-1 px-8 flex items-center justify-center">
              <div className="w-full h-[2px] bg-white/30 relative">
                <Plane className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 text-white h-6 w-6" />
              </div>
            </div>

            <div className="text-center">
              <p className="text-sky-200 text-sm">To</p>
              <h3 className="text-3xl font-bold">{flightSearch.To}</h3>
            </div>
          </div>
        </div>

        <Tabs
          defaultValue="details"
          className="w-full"
          onValueChange={setActiveTab}
        >
          <div className="px-6 border-b">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Flight Details</TabsTrigger>
              <TabsTrigger value="travelers">Travelers</TabsTrigger>
              <TabsTrigger value="user">User Info</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="details" className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Calendar className="mr-2 h-5 w-5 text-indigo-500" />
                    Departure Date
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-semibold">{departureDate}</p>
                </CardContent>
              </Card>

              {returnDate && (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <Calendar className="mr-2 h-5 w-5 text-indigo-500" />
                      Return Date
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-semibold">{returnDate}</p>
                  </CardContent>
                </Card>
              )}

              <Card className="md:col-span-2">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Clock className="mr-2 h-5 w-5 text-indigo-500" />
                    Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-sky-100 flex items-center justify-center">
                          <Calendar className="h-5 w-5 text-sky-600" />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm text-muted-foreground">
                            Created
                          </p>
                          <p className="font-medium">
                            {formatDate(flightSearch.createdAt)}
                          </p>
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    <div className="flex-1">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                          <Clock className="h-5 w-5 text-indigo-600" />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm text-muted-foreground">
                            Last Updated
                          </p>
                          <p className="font-medium">
                            {formatDate(flightSearch.updatedAt)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="travelers" className="p-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5 text-indigo-500" />
                  Traveler Information
                </CardTitle>
                <CardDescription>
                  {totalTravelers} total{" "}
                  {totalTravelers === 1 ? "traveler" : "travelers"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {flightSearch.TravelerDetails ? (
                  <div className="space-y-6">
                    {flightSearch.TravelerDetails.adults > 0 && (
                      <div>
                        <h4 className="text-sm font-medium flex items-center mb-2">
                          <User className="mr-2 h-4 w-4 text-indigo-500" />
                          Adults
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {Array.from({
                            length: flightSearch.TravelerDetails.adults,
                          }).map((_, i) => (
                            <div
                              key={`adult-${i}`}
                              className="flex items-center p-3 border rounded-lg"
                            >
                              <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                                <User className="h-4 w-4 text-indigo-600" />
                              </div>
                              <div className="ml-3">
                                <p className="font-medium">Adult {i + 1}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {flightSearch.TravelerDetails.children &&
                      flightSearch.TravelerDetails.children.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium flex items-center mb-2">
                            <Baby className="mr-2 h-4 w-4 text-indigo-500" />
                            Children
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {flightSearch.TravelerDetails.children.map(
                              (child, i) => (
                                <div
                                  key={`child-${i}`}
                                  className="flex items-center p-3 border rounded-lg"
                                >
                                  <div className="h-8 w-8 rounded-full bg-sky-100 flex items-center justify-center">
                                    <Baby className="h-4 w-4 text-sky-600" />
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
                  </div>
                ) : (
                  <div className="text-center py-6 text-muted-foreground">
                    No traveler details available
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="user" className="p-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="mr-2 h-5 w-5 text-indigo-500" />
                  User Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                {flightSearch.user ? (
                  <div className="space-y-6">
                    <div className="flex items-center">
                      <Avatar className="h-16 w-16">
                        <AvatarImage
                          src={`https://api.dicebear.com/7.x/initials/svg?seed=${flightSearch.user.username}`}
                        />
                        <AvatarFallback>
                          {flightSearch.user.username
                            .substring(0, 2)
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="ml-4">
                        <h3 className="text-xl font-bold">
                          {flightSearch.user.username}
                        </h3>
                        <div className="flex items-center mt-1">
                          {flightSearch.user.isVerified ? (
                            <Badge
                              variant="outline"
                              className="bg-green-50 text-green-700 border-green-200"
                            >
                              <CheckCircle2 className="mr-1 h-3 w-3" />
                              Verified
                            </Badge>
                          ) : (
                            <Badge
                              variant="outline"
                              className="bg-amber-50 text-amber-700 border-amber-200"
                            >
                              <XCircle className="mr-1 h-3 w-3" />
                              Not Verified
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          Email
                        </p>
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 text-indigo-500 mr-2" />
                          <p className="font-medium">
                            {flightSearch.user.email}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          Gender
                        </p>
                        <div className="flex items-center">
                          <User className="h-4 w-4 text-indigo-500 mr-2" />
                          <p className="font-medium capitalize">
                            {flightSearch.user.gender}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          User ID
                        </p>
                        <p className="font-mono text-xs bg-gray-100 p-2 rounded">
                          {flightSearch.user._id}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <User className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-30" />
                    <h3 className="text-lg font-medium text-muted-foreground">
                      No User Associated
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      This flight search was created without a user account
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
