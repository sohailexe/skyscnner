import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Card } from "../ui/card";
import { CheckCircle2 } from "lucide-react";
import { Button } from "../ui/button";

const OTPSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [progress, setProgress] = useState(100);
  const [showManualRedirect, setShowManualRedirect] = useState(false);

  useEffect(() => {
    if (!location.state?.otpSuccess) {
      navigate("/register", { replace: true });
      return;
    }

    // Automatic redirect timer
    const redirectTimer = setTimeout(() => {
      navigate("/login", { replace: true });
    }, 3000);

    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => Math.max(0, prev - 100 / 30));
    }, 100);

    return () => {
      clearTimeout(redirectTimer);
      clearInterval(progressInterval);
    };
  }, [navigate, location.state]);

  useEffect(() => {
    const manualRedirectTimer = setTimeout(() => {
      setShowManualRedirect(true);
    }, 2500);

    return () => clearTimeout(manualRedirectTimer);
  }, []);

  return (
    <Card className="max-w-md w-full p-8 space-y-4 text-center">
      <div className="flex justify-center">
        <CheckCircle2 className="h-12 w-12 text-green-500" />
      </div>

      <h1 className="text-2xl font-bold text-gray-900">
        Verification Successful!
      </h1>

      <p className="text-gray-600">
        Your account has been successfully verified.
      </p>

      <div className="pt-4">
        <div className="h-2 bg-gray-200 rounded-full">
          <div
            className="h-2 bg-green-500 rounded-full transition-all duration-100"
            style={{ width: `${progress}%` }}
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>

        <p className="pt-2 text-sm text-gray-500">
          Redirecting to login in {Math.ceil(progress / (100 / 3))}s...
        </p>
      </div>

      {showManualRedirect && (
        <div className="pt-4">
          <Button
            variant="link"
            onClick={() => navigate("/login", { replace: true })}
            className="text-blue-600"
          >
            Click here if not redirected automatically
          </Button>

          <div className="mt-2 text-sm">
            <span className="text-gray-500">or return to </span>
            <Link to="/" className="text-blue-600 hover:underline">
              home page
            </Link>
          </div>
        </div>
      )}
    </Card>
  );
};

export default OTPSuccess;
