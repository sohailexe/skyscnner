"use client";

import { useNavigate } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

// Import reusable components
import { LocationSelector } from "@/components/LocationSelector";
import { DateSelector } from "@/components/DateSelector";
import { SearchButton } from "@/components/Searchbtn";
import { FlightOptions } from "@/components/FlightOption";
import { useFlightSearch } from "@/context/searchFlightcontext";

/**
 * Flight Search Form Component
 *
 * A professional form component for searching flights with origin,
 * destination, dates, and additional filtering options.
 */
export default function FlightSearchForm() {
  const navigate = useNavigate();

  const {
    formData,
    errors,
    isLoading,
    setIsLoading,
    handleTextChange,
    handleDateChange,
    handleCheckboxChange,
    validateForm,
  } = useFlightSearch();

  // Form submission
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      // Show toast for validation errors
      toast("Please fill in all required fields", {
        description: "Make sure to provide valid input for all fields.",
        icon: <AlertCircle className="h-4 w-4" />,
        action: (
          <Button
            variant="link"
            className="text-white hover:text-gray-200"
            onClick={() => {
              // Scroll to the first error field
              const firstErrorField = Object.keys(errors)[0];
              const element = document.getElementById(firstErrorField);
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            Fix it
          </Button>
        ),
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.get("http://localhost:5000/api/v1/flights", {
        params: {
          origin: formData.origin,
          destination: formData.destination,
          date: formData.departureDate?.toISOString().split("T")[0],
          returnDate: formData.returnDate?.toISOString().split("T")[0],
          adults: formData.passengers,
          nearbyAirports: formData.nearbyAirports,
          directFlights: formData.directFlightsOnly,
        },
      });

      // Update context with search results (commented out for now)
      // setFlightResults(response.data.data);

      // Navigate to results page
      navigate("/search-results");
    } catch (error) {
      console.error("Flight search failed:", error);

      // Show error toast
      toast("Flight search failed", {
        description: "Please try again later.",
        icon: <AlertCircle className="h-4 w-4" />,
        action: (
          <Button
            variant="link"
            className="text-white hover:text-gray-200"
            onClick={() => {
              // Optionally, you can add a retry action here
            }}
          >
            Retry
          </Button>
        ),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="bg-dark-blue p-6 md:p-8 rounded-3xl text-white max-w-6xl mx-auto shadow-lg"
    >
      <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-2 items-center">
        {/* From & To Inputs with Swap Button */}
        <LocationSelector
          origin={formData.origin}
          destination={formData.destination}
          onOriginChange={handleTextChange("origin")}
          onDestinationChange={handleTextChange("destination")}
          originError={errors.origin}
          destinationError={errors.destination}
        />

        {/* Date Selectors */}
        <DateSelector
          departureDate={formData.departureDate}
          returnDate={formData.returnDate}
          onDepartureDateChange={handleDateChange("departureDate")}
          onReturnDateChange={handleDateChange("returnDate")}
          departureDateError={errors.departureDate}
          returnDateError={errors.returnDate}
        />

        {/* Search Button */}
        <div className="mt-4 md:mt-0 md:col-span-2">
          <SearchButton isLoading={isLoading} />
        </div>
      </div>

      {/* Flight Options Checkboxes */}
      <FlightOptions
        nearbyAirports={formData.nearbyAirports}
        directFlightsOnly={formData.directFlightsOnly}
        onNearbyAirportsChange={handleCheckboxChange("nearbyAirports")}
        onDirectFlightsOnlyChange={handleCheckboxChange("directFlightsOnly")}
      />
    </form>
  );
}
