import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MapPin, Plane } from "lucide-react";
import { Location } from "./HomeSearchForm"; // Assuming this path is correct

// Animation variants
const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 500, damping: 24 },
  },
};

// Define types for location suggestions
interface LocationSuggestion {
  name: string;
  code: string;
  country_name: string;
  type: "airport" | "city";
  country_code?: string;
  coordinates?: {
    lat: number;
    lon: number;
  };
  weight?: number;
  index_strings?: string[];
}

export interface LocationSearchInputProps {
  id: string;
  label?: string;
  value: Location | undefined;
  onChange: (value: string) => void; // Note: Parent receives name on type, code on select
  placeholder?: string;
  className?: string;
  error?: string; // Error from parent (e.g., form validation)
  showLabel?: boolean;
  onSelect?: (location: LocationSuggestion) => void;
}

export function LocationSearchInput({
  id,
  label,
  value,
  onChange,
  placeholder = "Country, city or airport",
  className = "",
  showLabel = true,
  error, // Prop for parent-controlled errors
  onSelect,
}: LocationSearchInputProps) {
  const [searchTerm, setSearchTerm] = useState<Location>({
    name: "",
    code: "",
  });
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null); // State for API specific errors
  const [validSelection, setValidSelection] = useState<boolean>(false); // Track if user selected from suggestions

  // Update searchTerm and inputValue when value changes from parent
  useEffect(() => {
    if (value) {
      setSearchTerm(value);
      setInputValue(value.name);
      // If there's a code, it means a valid selection was made previously
      setValidSelection(!!value.code);
    } else {
      // If parent clears value, reset searchTerm
      setSearchTerm({ name: "", code: "" });
      setInputValue("");
      setValidSelection(false);
    }
  }, [value]);

  // Fetch suggestions when inputValue changes
  useEffect(() => {
    const fetchSuggestions = async (): Promise<void> => {
      if (!inputValue || inputValue.length < 2) {
        setSuggestions([]);
        setApiError(null); // Clear API error if search term is too short
        return;
      }

      setIsLoading(true);
      setApiError(null); // Clear previous API error before a new request

      try {
        const response = await fetch(
          `https://autocomplete.travelpayouts.com/places2?locale=en&types[]=airport&types[]=city&term=${encodeURIComponent(
            inputValue
          )}`
        );

        if (!response.ok) {
          let errorMessage = `API request failed: ${response.statusText} (Status: ${response.status})`;
          try {
            // Attempt to parse a more specific error message from the API response body
            const errorData = await response.json();
            if (errorData && (errorData.message || errorData.error)) {
              errorMessage = errorData.message || errorData.error;
            }
          } catch (parseError) {
            // If parsing the error response fails, stick with the status code message
            console.warn("Could not parse error response body:", parseError);
          }
          throw new Error(errorMessage);
        }

        const data = (await response.json()) as LocationSuggestion[];
        setSuggestions(data);
        if (data.length === 0) {
          // You could set a "no results" message here if desired, e.g.:
          // setApiError("No locations found matching your search.");
          // For now, an empty suggestion list is the indicator.
        }
      } catch (err) {
        console.error("Error fetching suggestions:", err);
        setSuggestions([]); // Clear suggestions on error
        if (err instanceof Error) {
          setApiError(
            err.message ||
              "Failed to fetch suggestions. Please check your connection or try again."
          );
        } else {
          setApiError("An unknown error occurred while fetching suggestions.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    // Debounce function to avoid too many API calls
    const timeoutId = setTimeout(() => {
      fetchSuggestions();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [inputValue]); // Depend only on inputValue for fetching

  const handleSelect = (item: LocationSuggestion): void => {
    const selectedLocation = {
      code: item.code,
      name: item.name,
    };

    setSearchTerm(selectedLocation); // This will update the input display
    setInputValue(item.name); // Update the input field text
    setValidSelection(true); // Mark that a valid selection was made

    onChange(selectedLocation.code); // Pass the code to the parent component
    setSuggestions([]); // Hide suggestions
    setApiError(null); // Clear any API errors on successful selection
    setIsFocused(false); // Manually blur or ensure suggestions hide

    if (onSelect) {
      onSelect(item);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setValidSelection(false); // Reset validation when user types

    // Only update the parent with the current text (not as a valid selection)
    onChange(newValue);

    // Reset the code since we're now typing something new
    setSearchTerm({ name: newValue, code: "" });
  };

  const handleInputFocus = (): void => {
    setIsFocused(true);

    // If there's no valid selection but there is text,
    // re-trigger suggestions to show options
    if (!validSelection && inputValue.length >= 2) {
      // This will trigger the useEffect that fetches suggestions
      setInputValue(inputValue + " ");
      setInputValue(inputValue);
    }
  };

  const handleInputBlur = (): void => {
    // Delay hiding suggestions to allow clicks on suggestion items
    setTimeout(() => {
      setIsFocused(false);

      // If there was no valid selection made but text remains,
      // clear the input to enforce selection from suggestions only
      if (!validSelection && inputValue) {
        setInputValue("");
        setSearchTerm({ name: "", code: "" });
        onChange(""); // Notify parent that the value was cleared
      }
    }, 200);
  };

  // Determine which error to display: API error takes precedence over prop error
  const displayedError =
    apiError ||
    error ||
    (!validSelection && inputValue
      ? "Please select a location from the suggestions"
      : "");

  return (
    <div className="flex flex-col">
      <motion.div
        className={`bg-white px-2 py-1 md:px-4 md:py-3 relative ${className}`}
        variants={itemVariants}
      >
        {showLabel && (
          <Label htmlFor={id} className="text-sm text-gray-500 block mb-1">
            {label}
          </Label>
        )}
        <div className="relative">
          <Input
            id={id}
            value={inputValue}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            placeholder={placeholder}
            className={`border-0 p-0 bg-white text-black font-medium focus-visible:ring-0 h-auto ${
              !validSelection && inputValue ? "border-red-500" : ""
            }`}
            aria-label={`Search for ${label?.toLowerCase() || "location"}`}
            aria-invalid={!!displayedError}
            aria-describedby={displayedError ? `${id}-error` : undefined}
          />

          {isLoading && (
            <div className="absolute right-1 top-1/2 transform -translate-y-1/2">
              <div
                className="h-4 w-4 border-2 border-t-transparent border-blue-500 rounded-full animate-spin"
                aria-hidden="true"
              ></div>
            </div>
          )}

          {validSelection && (
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-gray-500 bg-gray-100 px-1 rounded">
              {searchTerm.code}
            </div>
          )}
        </div>

        {isFocused &&
          suggestions.length > 0 &&
          !apiError && ( // Don't show suggestions if there's an API error
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                className="absolute left-0 right-0 z-50 mt-1 w-full" // Ensure full width
              >
                <Card className="overflow-hidden border shadow-lg">
                  <ScrollArea className="max-h-64">
                    <div className="p-1">
                      {suggestions.map((item) => (
                        <div
                          key={`${item.type}-${item.code}`}
                          className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer"
                          onClick={() => handleSelect(item)}
                          onMouseDown={(e) => e.preventDefault()} // Prevents input blur before click
                          role="option"
                          aria-selected={false}
                        >
                          {item.type === "airport" ? (
                            <Plane
                              className="h-4 w-4 mr-2 text-blue-500"
                              aria-hidden="true"
                            />
                          ) : (
                            <MapPin
                              className="h-4 w-4 mr-2 text-green-500"
                              aria-hidden="true"
                            />
                          )}
                          <div>
                            <div className="font-medium">{item.name}</div>
                            <div className="text-xs text-gray-500">
                              {item.country_name}
                              {item.type === "airport" && ` • ${item.code}`}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </Card>
              </motion.div>
            </AnimatePresence>
          )}
      </motion.div>
      <AnimatePresence>
        {displayedError && (
          <motion.p
            id={`${id}-error`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="text-xs text-red-500 mt-1 px-2 md:px-4 " // Added padding to align with input area
            role="alert" // For accessibility
          >
            {displayedError}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
