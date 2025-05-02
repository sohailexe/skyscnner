import { useState } from "react";
interface FormErrors {
  [key: string]: string;
}

interface FlightSearchData {
  origin: string;
  destination: string;
  departureDate: Date | undefined;
  returnDate: Date | undefined;
  nearbyAirports: boolean;
  directFlightsOnly: boolean;
  passengers: number;
}
export const useFlightSearch = (
  initialState: FlightSearchData = {
    origin: "",
    destination: "",
    departureDate: undefined,
    returnDate: undefined,
    nearbyAirports: false,
    directFlightsOnly: false,
    passengers: 1,
  }
) => {
  const [formData, setFormData] = useState<FlightSearchData>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleTextChange =
    (field: keyof FlightSearchData) => (value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      // Clear error for this field if it exists
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: "" }));
      }
    };

  const handleDateChange =
    (field: keyof FlightSearchData) => (value: Date | undefined) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      // Clear error for this field if it exists
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: "" }));
      }

      // Additional validation: if we set a departure date and there's a return date,
      // check if return date is valid
      if (
        field === "departureDate" &&
        value &&
        formData.returnDate &&
        formData.returnDate < value
      ) {
        setErrors((prev) => ({
          ...prev,
          returnDate: "Return date must be after departure date",
        }));
      } else if (
        field === "departureDate" &&
        value &&
        formData.returnDate &&
        formData.returnDate >= value
      ) {
        // Clear return date error if it exists and is now valid
        setErrors((prev) => ({ ...prev, returnDate: "" }));
      }
    };

  const handleCheckboxChange = (field: keyof FlightSearchData) => () => {
    setFormData((prev) => ({
      ...prev,
      [field]: !prev[field as keyof typeof prev],
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.origin.trim()) {
      newErrors.origin = "Origin is required";
    }

    if (!formData.destination.trim()) {
      newErrors.destination = "Destination is required";
    }

    if (!formData.departureDate) {
      newErrors.departureDate = "Departure date is required";
    }

    if (
      formData.departureDate &&
      formData.returnDate &&
      formData.returnDate < formData.departureDate
    ) {
      newErrors.returnDate = "Return date must be after departure date";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return {
    formData,
    setFormData,
    errors,
    setErrors,
    isLoading,
    setIsLoading,
    handleTextChange,
    handleDateChange,
    handleCheckboxChange,
    validateForm,
  };
};
