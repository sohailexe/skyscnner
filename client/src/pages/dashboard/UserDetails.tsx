import axios from "@/api/axios";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import LoadingBar from "@/components/LoadingBar";
interface User {
  _id: string;
  username: string;
  email: string;
  gender: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const UserDetails = () => {
  const {
    data: userData,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<User[], Error>({
    queryKey: ["get-usert-details"],
    queryFn: async () => {
      const { data } = await axios.get("dashboard/get-user-details");
      return data;
    },
    refetchOnWindowFocus: false,
  });

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };
  if (isLoading) return <LoadingBar text="Users" />;

  if (isError) {
    return (
      <main className="flex flex-col items-center justify-center h-full p-10 text-center">
        <p className="text-red-500 text-lg font-medium mb-4">
          Failed to load userData: {error.message}
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

  if (!userData || userData.length === 0) {
    return (
      <main className="flex items-center justify-center h-full p-10">
        <p className="text-gray-300 text-lg">No users found.</p>
      </main>
    );
  }
  return (
    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {userData.map((user) => (
        <Card
          key={user._id}
          className="bg-gray-800 text-white rounded-xl shadow-lg border border-gray-700"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-bold text-blue-300">
              {user.username}
            </CardTitle>
            {/* Verification Status Badge */}
            <Badge
              variant={user.isVerified ? "default" : "destructive"}
              className={`${
                user.isVerified
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-red-500 hover:bg-red-600"
              } text-white`}
            >
              {user.isVerified ? "Verified" : "Not Verified"}
            </Badge>
          </CardHeader>
          <CardContent className="space-y-3">
            <CardDescription className="text-gray-300">
              <span className="font-semibold">Email:</span> {user.email}
            </CardDescription>
            <CardDescription className="text-gray-300">
              <span className="font-semibold">Gender:</span>{" "}
              {user.gender.charAt(0).toUpperCase() + user.gender.slice(1)}
            </CardDescription>
            <CardDescription className="text-gray-400 text-sm">
              <span className="font-semibold">Created At:</span>{" "}
              {formatDate(user.createdAt)}
            </CardDescription>
            <CardDescription className="text-gray-400 text-sm">
              <span className="font-semibold">Last Updated:</span>{" "}
              {formatDate(user.updatedAt)}
            </CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default UserDetails;
