import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useNavigate, useLocation } from "react-router";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
export default function OtpVerification() {
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const { register, isLoading, error, setError } = useAuth();
  const location = useLocation();

  const { fromRegistration, email } = location.state || {};

  useEffect(() => {
    if (!fromRegistration) {
      navigate("/register");
    }
  }, [fromRegistration, navigate]);

  const handleSuccess = async () => {
    await register(email, value);

    navigate("/otp-success", {
      state: {
        otpSuccess: true,
      },
    });
  };

  useEffect(() => {
    setError(null);
  }, []);
  return (
    <Card className="space-y-2 px-9 py-9 bg-accent-foreground text-background">
      {error && <p className="text-red-500">{error}</p>}
      <InputOTP
        maxLength={6}
        value={value}
        onChange={(value) => setValue(value)}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>

      <Button variant={"destructive"} onClick={handleSuccess}>
        {" "}
        {isLoading ? "Verifying..." : "Verify OTP"}
      </Button>
    </Card>
  );
}
