import { useAuth } from "../context/AuthContext";
import { Card } from "./ui/card";

const Profile = () => {
  const { user, logout } = useAuth();

  return (
    <Card className="">
      <h1>Welcome, {user?.username}</h1>
      <div className="profile-info">
        <p>Email: {user?.email}</p>
        <p>Gender: {user?.gender}</p>
      </div>
      <button onClick={logout} className="logout-button">
        Log Out
      </button>
    </Card>
  );
};

export default Profile;
