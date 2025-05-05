// src/components/Profile.tsx
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Card } from "./ui/card";

interface User {
  name: string;
  email: string;
  // Add other fields as required
}

const Profile = () => {
  const { user, isLoading, error } = useAuth();

  isLoading && <div>Loading...</div>;

  if (error) {
    return <div className="mt-[600px]">Error: {error}</div>;
  }
  return (
    <Card className="bg-red-500 h-100vh flex items-center justify-center flex-col">
      <h1>Profile</h1>
      <div>
        <strong>Name: </strong> {user?.username}
      </div>
      <div>
        <strong>Email: </strong> {user?.email}
      </div>
      {/* Add other fields as needed */}
    </Card>
  );
};

export default Profile;
