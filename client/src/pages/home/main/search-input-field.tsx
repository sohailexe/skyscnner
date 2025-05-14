import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MapPin, Plane } from "lucide-react";
import { Location } from "./HomeSearchForm";
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
  // Adding optional properties that might be returned by the API
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
  label: string;
  value: Location | undefined;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  error?: string;
  onSelect?: (location: LocationSuggestion) => void;
}

export function LocationSearchInput({
  id,
  label,
  value,
  onChange,
  placeholder = "Country, city or airport",
  className = "",
  error,
  onSelect,
}: LocationSearchInputProps) {
  const [searchTerm, setSearchTerm] = useState<Location>({
    name: "",
    code: "",
  });
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  // Update searchTerm when value changes from parent
  useEffect(() => {
    if (value) {
      setSearchTerm(value);
    }
  }, [value]);

  // Fetch suggestions when searchTerm changes
  useEffect(() => {
    const fetchSuggestions = async (): Promise<void> => {
      if (!searchTerm?.name || searchTerm.name.length < 2) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch(
          `https://autocomplete.travelpayouts.com/places2?locale=en&types[]=airport&types[]=city&term=${encodeURIComponent(
            searchTerm.name
          )}`
        );

        if (!response.ok) {
          throw new Error(`API responded with status: ${response.status}`);
        }

        const data = (await response.json()) as LocationSuggestion[];
        setSuggestions(data);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    };

    // Debounce function to avoid too many API calls
    const timeoutId = setTimeout(() => {
      fetchSuggestions();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const handleSelect = (item: LocationSuggestion): void => {
    const selectedLocation = {
      code: item.code,
      name: item.name,
    };
    setSearchTerm(selectedLocation);
    onChange(selectedLocation.code); // Pass the code to the parent component
    setSuggestions([]);
    if (onSelect) {
      onSelect(item);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue = e.target.value;
    const updatedSearchTerm = { name: newValue, code: "" }; // Reset code when typing
    setSearchTerm(updatedSearchTerm);
    onChange(newValue); // Pass the name to the parent component during typing
  };

  const handleInputFocus = (): void => {
    setIsFocused(true);
  };

  const handleInputBlur = (): void => {
    // Delay hiding suggestions to allow clicks
    setTimeout(() => setIsFocused(false), 200);
  };

  return (
    <motion.div
      className={`bg-white px-2 py-1 md:px-4 md:py-3 relative ${className}`}
      variants={itemVariants}
    >
      <Label htmlFor={id} className="text-sm text-gray-500 block mb-1">
        {label}
      </Label>
      <div className="relative">
        <Input
          id={id}
          value={searchTerm?.name || ""}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholder={placeholder}
          className={`border-0 p-0 bg-white text-black font-medium focus-visible:ring-0 h-auto ${
            error ? "border-b border-red-500" : ""
          }`}
          aria-label={`Search for ${label.toLowerCase()}`}
        />

        {isLoading && (
          <div className="absolute right-1 top-1/2 transform -translate-y-1/2">
            <div
              className="h-4 w-4 border-2 border-t-transparent border-blue-500 rounded-full animate-spin"
              aria-hidden="true"
            ></div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="text-xs text-red-500 mt-1"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      {isFocused && suggestions.length > 0 && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute left-0 right-0 z-50 mt-1"
          >
            <Card className="overflow-hidden border shadow-lg w-full">
              <ScrollArea className="max-h-64">
                <div className="p-1">
                  {suggestions.map((item) => (
                    <div
                      key={`${item.type}-${item.code}`}
                      className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer"
                      onClick={() => handleSelect(item)}
                      role="option"
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
  );
}
