import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { TextInput } from "@/pages/home/main/home-search/TextInput";
import { SwapButton } from "@/pages/home/main/home-search/SwapButton";
import { FlightOptions } from "@/pages/home/main/home-search/FlightOptions";
import { toast } from "sonner";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { DateInputField } from "@/pages/home/main/home-search/DateInputField";
import { SearchButton } from "@/pages/home/main/home-search/Searchbtn";

export default function HomeSearchForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    departureDate: undefined as Date | undefined,
    returnDate: undefined as Date | undefined,
    nearbyAirports: false,
    directFlightsOnly: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [rotated, setRotated] = useState(false);

  const departureRef = useRef<HTMLButtonElement>(null);
  const returnRef = useRef<HTMLButtonElement>(null);

  const handleText = (field: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleDate = (field: string) => (date: Date | undefined) => {
    setFormData((prev) => ({ ...prev, [field]: date }));
    // Clear error when user selects a date
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };
  const handleCheckbox = (field: keyof typeof formData) => (checked: boolean) =>
    setFormData((prev) => ({ ...prev, [field]: checked }));

  const swap = () => {
    setFormData((prev) => ({
      ...prev,
      origin: prev.destination,
      destination: prev.origin,
    }));
    setRotated((r) => !r);
  };

  // Form validation
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.origin.trim()) {
      newErrors.origin = "Origin is required";
    }

    if (!formData.destination.trim()) {
      newErrors.destination = "Destination is required";
    }

    if (!formData.departureDate) {
      newErrors.departureDate = "Departure date is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }

    return true;
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
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
      // API call would go here
      // For example: await searchFlights(formData);

      // Navigate to results page
      navigate("/flight/search");
    } catch (error) {
      console.error("Flight search failed:", error);

      toast("Flight search failed", {
        description: "Please try again later.",
        icon: <AlertCircle className="h-4 w-4" />,
      });
    } finally {
      setIsLoading(false);
    }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 24,
      },
    },
  };

  return (
    <motion.form
      onSubmit={handleSearch}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, staggerChildren: 0.1 },
        },
      }}
      className="bg-dark-blue p-6 md:p-8 rounded-3xl text-white max-w-6xl mx-auto shadow-lg"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-2 items-center">
        <motion.div
          className="relative md:col-span-3"
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { type: "spring", stiffness: 500, damping: 24 },
            },
          }}
        >
          <TextInput
            id="origin"
            label="From"
            value={formData.origin}
            onChange={handleText("origin")}
            error={errors.origin}
            className="rounded-t-2xl md:rounded-t-none md:rounded-l-2xl pr-6"
          />
          <div className="absolute right-0 translate-x-1/2 top-1/2 -translate-y-1/2 z-10">
            <SwapButton rotated={rotated} onClick={swap} />
          </div>
        </motion.div>
        {/* Similar for destination, departure, return */}
        <motion.div className="md:col-span-3" variants={itemVariants}>
          <TextInput
            id="destination"
            label="To"
            value={formData.destination}
            onChange={handleText("destination")}
            className="md:pl-8"
            error={errors.destination}
          />
        </motion.div>

        {/* Date Selector */}
        <motion.div className="md:col-span-2" variants={itemVariants}>
          <DateInputField
            id="departureDate"
            label="Departure"
            value={formData.departureDate}
            onChange={handleDate("departureDate")}
            error={errors.departureDate}
            buttonRef={departureRef}
          />
        </motion.div>

        <motion.div className="md:col-span-2" variants={itemVariants}>
          <DateInputField
            id="returnDate"
            label="Return"
            value={formData.returnDate}
            onChange={handleDate("returnDate")}
            className="rounded-b-2xl md:rounded-b-none md:rounded-r-2xl"
            error={errors.returnDate}
            buttonRef={returnRef}
          />
        </motion.div>

        {/* Search Button */}
        <SearchButton isLoading={isLoading} />
      </div>
      <FlightOptions
        nearbyAirports={formData.nearbyAirports}
        directOnly={formData.directFlightsOnly}
        onToggleNearby={(checked) => handleCheckbox("nearbyAirports")(checked)}
        onToggleDirect={(checked) =>
          handleCheckbox("directFlightsOnly")(checked)
        }
      />
    </motion.form>
  );
}
