import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { SwapButton } from "@/pages/home/main/home-search/SwapButton";
import { FlightOptions } from "@/pages/home/main/home-search/FlightOptions";
import { toast } from "sonner";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { DateInputField } from "@/pages/home/main/home-search/DateInputField";
import { SearchButton } from "@/pages/home/main/home-search/Searchbtn";
import { useFlightStore } from "@/store/flightStore";
import { Popover } from "@/components/ui/popover";
import { PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { LocationSearchInput } from "./search-input-field";

export interface Location {
  name: string;
  code: string;
}

export default function HomeSearchForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    origin: { name: "", code: "" } as Location,
    destination: { name: "", code: "" } as Location,
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

  const fetchFlights = useFlightStore((state) => state.fetchFlights);
  const [isOpen, setIsOpen] = useState({ guests: false });
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState<number[]>([]);

  // Create today's date for validation
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Helper functions
  const increment = (value: number, setter: (v: number) => void) =>
    setter(value + 1);
  const decrement = (value: number, setter: (v: number) => void) =>
    setter(value - 1);

  // Children age state handlers
  const setChildAge = (index: number, age: number) => {
    setChildren((prev) => {
      const updated = [...prev];
      updated[index] = age;
      return updated;
    });
  };

  const addChild = () => setChildren((prev) => [...prev, 5]);
  const removeChild = () =>
    setChildren((prev) => (prev.length > 0 ? prev.slice(0, -1) : prev));

  // Apply guest selection
  const applyGuestSelection = () => {
    setFormData((prev) => ({
      ...prev,
      traverlerDetails: {
        adults,
        children: children.map((age) => ({ age })),
      },
    }));
    setIsOpen((prev) => ({ ...prev, guests: false }));
  };

  const handleLocationChange =
    (field: "origin" | "destination") => (value: string) => {
      // This function now just receives text input from the LocationSearchInput
      // The actual location selection is handled in onSelect

      // We only update errors here, but don't modify the form data
      // since we only want valid selections to be stored
      console.log(value);

      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: "" }));
      }
    };

  const handleLocationSelect =
    (field: "origin" | "destination") =>
    (location: { name: string; code: string; type?: string }) => {
      // This is called when a valid location is selected from suggestions
      setFormData((prev) => ({
        ...prev,
        [field]: {
          name: location.name,
          code: location.code,
        },
      }));

      // Clear any validation errors for this field
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: "" }));
      }
    };

  const handleDate =
    (field: "departureDate" | "returnDate") => (date: Date | undefined) => {
      setFormData((prev) => {
        const newData = { ...prev, [field]: date };

        // Special handling for date relationships
        if (field === "departureDate" && date && prev.returnDate) {
          // If departure date is after return date, clear return date or update error
          if (date > prev.returnDate) {
            // Option 1: Clear return date
            newData.returnDate = undefined;
            // Clear related error
            if (errors.returnDate) {
              setErrors((e) => ({ ...e, returnDate: "" }));
            }
          }
        }

        return newData;
      });

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

    if (!formData.origin.code) {
      newErrors.origin = "Please select a valid origin from the suggestions";
    }

    if (!formData.destination.code) {
      newErrors.destination =
        "Please select a valid destination from the suggestions";
    }

    if (!formData.departureDate) {
      newErrors.departureDate = "Departure date is required";
    } else if (formData.departureDate < today) {
      newErrors.departureDate = "Departure date cannot be in the past";
    }

    if (
      formData.returnDate &&
      formData.departureDate &&
      formData.returnDate < formData.departureDate
    ) {
      newErrors.returnDate = "Return date cannot be before departure date";
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
                element.focus();
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
      const payload = {
        fromLocation: formData.origin.code,
        toLocation: formData.destination.code,
        departureDate: formData.departureDate
          ? formData.departureDate.toISOString().split("T")[0]
          : "2025-06-10",
        returnDate: formData.returnDate
          ? formData.returnDate.toISOString().split("T")[0]
          : "2025-06-20",
        userTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        traverlerDetails: {
          adults: adults,
          children: children.map((age) => ({ age })),
        },
      };
      console.log(payload);

      fetchFlights(payload);
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
          <LocationSearchInput
            id="origin"
            label="From"
            value={formData.origin}
            onChange={handleLocationChange("origin")}
            onSelect={handleLocationSelect("origin")}
            error={errors.origin}
            className="rounded-t-2xl md:rounded-t-none md:rounded-l-2xl pr-6"
          />
          <div className="absolute right-0 translate-x-1/2 top-1/2 -translate-y-1/2 z-10">
            <SwapButton rotated={rotated} onClick={swap} />
          </div>
        </motion.div>

        <motion.div className="md:col-span-3" variants={itemVariants}>
          <LocationSearchInput
            id="destination"
            label="To"
            value={formData.destination}
            onChange={handleLocationChange("destination")}
            onSelect={handleLocationSelect("destination")}
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
            minDate={today}
          />
        </motion.div>

        <motion.div className="md:col-span-2" variants={itemVariants}>
          <DateInputField
            id="returnDate"
            label="Return"
            value={formData.returnDate}
            onChange={handleDate("returnDate")}
            className="md:rounded-b-none"
            error={errors.returnDate}
            buttonRef={returnRef}
            minDate={formData.departureDate || today}
          />
        </motion.div>
        <motion.div className="md:col-span-2" variants={itemVariants}>
          <Popover
            open={isOpen.guests}
            onOpenChange={(open: boolean) =>
              setIsOpen((prev) => ({ ...prev, guests: open }))
            }
          >
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start bg-white text-black h-17 md:col-span-1 rounded-none rounded-b-2xl md:rounded-b-none md:rounded-r-2xl"
              >
                {adults} Adult{adults > 1 ? "s" : ""}, {children.length} Child
                {children.length !== 1 ? "ren" : ""}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-72 p-4" align="start">
              <div className="space-y-4">
                {/* Adults */}
                <div>
                  <h3 className="font-medium mb-2">Adults</h3>
                  <div className="flex justify-between items-center">
                    <span>Age 12+</span>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => decrement(adults, setAdults)}
                        disabled={adults <= 1}
                      >
                        -
                      </Button>
                      <span>{adults}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => increment(adults, setAdults)}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Children */}
                <div>
                  <h3 className="font-medium mb-2">Children</h3>
                  <div className="space-y-2">
                    {children.map((age, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center"
                      >
                        <span>Child {index + 1}</span>
                        <input
                          type="number"
                          value={age}
                          min={1}
                          max={17}
                          onChange={(e) =>
                            setChildAge(index, Number(e.target.value))
                          }
                          className="w-16 p-1 rounded border text-black"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-end gap-2 mt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8"
                      onClick={addChild}
                    >
                      + Add Child
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8"
                      onClick={removeChild}
                      disabled={children.length === 0}
                    >
                      - Remove
                    </Button>
                  </div>
                </div>

                <Button className="w-full mt-4" onClick={applyGuestSelection}>
                  Apply
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </motion.div>
      </div>

      <div className="py-2 md:py-4 ">
        {/* Search Button */}
        <motion.div className="md:col-span-1" variants={itemVariants}>
          <SearchButton isLoading={isLoading} />
        </motion.div>
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
