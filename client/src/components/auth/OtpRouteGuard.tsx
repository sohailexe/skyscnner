// components/OtpRouteGuard.tsx
import { Navigate, useLocation } from "react-router-dom";
import { ReactNode, useEffect, useState } from "react";

const OtpRouteGuard = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    // Check both state and session storage
    const stateValid = location.state?.fromRegistration === true;
    const storageValid = sessionStorage.getItem("otpFlow") === "true";

    setIsValid(stateValid || storageValid);

    // Set session storage if coming from state
    if (stateValid) {
      sessionStorage.setItem("otpFlow", "true");
    }
  }, []);

  if (!isValid) {
    sessionStorage.removeItem("otpFlow");
    return <Navigate to="/register" replace />;
  }

  return children;
};

export default OtpRouteGuard;
