import { useState, useEffect, useRef } from "react";
import { useDebounce } from "use-debounce";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plane, MapPin, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Suggestion {
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

interface LocationValue {
  name: string;
  code: string;
}

interface LocationDropdownProps {
  value: LocationValue;
  onChange: (value: LocationValue) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

const LocationDropdown = ({
  value,
  onChange,
  placeholder = "Search for a city or airport...",
  disabled = false,
  className = "",
}: LocationDropdownProps) => {
  const [searchTerm, setSearchTerm] = useState(value?.name || "");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Update search term when value changes from outside
  useEffect(() => {
    if (value?.name && value.name !== searchTerm) {
      setSearchTerm(value.name);
    }
  }, [value?.name]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!debouncedSearchTerm.trim()) {
        setSuggestions([]);
        return;
      }

      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `https://autocomplete.travelpayouts.com/places2?locale=en&types[]=airport&types[]=city&term=${encodeURIComponent(
            debouncedSearchTerm
          )}`
        );

        if (!response.ok) {
          throw new Error(`API responded with status: ${response.status}`);
        }

        const data = await response.json();
        setSuggestions(data);
      } catch (err: any) {
        console.error("Error fetching suggestions:", err);
        setError("Failed to fetch suggestions. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, [debouncedSearchTerm]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (item: Suggestion): void => {
    const selectedLocation = {
      code: item.code,
      name: item.name,
    };

    setSearchTerm(item.name);
    onChange(selectedLocation);
    setIsFocused(false);
    setSuggestions([]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (e.target.value.trim() === "") {
      onChange({ name: "", code: "" });
    }
    // Only open dropdown if there's input
    setIsFocused(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Close dropdown on Escape
    if (e.key === "Escape") {
      setIsFocused(false);
    }
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <Input
        className="w-full text-black bg-white"
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={() => setIsFocused(true)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        aria-expanded={isFocused}
        aria-controls="location-suggestions"
        aria-autocomplete="list"
      />

      {loading && (
        <div className="absolute right-3 top-3">
          <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
        </div>
      )}

      {error && (
        <p className="text-sm text-red-500 mt-1" role="alert">
          {error}
        </p>
      )}

      {suggestions.length > 0 && isFocused && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute left-0 right-0 z-50 mt-1"
            id="location-suggestions"
            role="listbox"
          >
            <Card className="overflow-hidden border shadow-lg w-full">
              <ScrollArea className="max-h-64">
                <div className="py-1">
                  {suggestions.map((item) => (
                    <div
                      key={`${item.type}-${item.code}`}
                      className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded cursor-pointer"
                      onClick={() => handleSelect(item)}
                      role="option"
                      aria-selected={value?.code === item.code}
                      tabIndex={0}
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

      {isFocused &&
        suggestions.length === 0 &&
        debouncedSearchTerm.trim() &&
        !loading && (
          <div className="absolute left-0 right-0 z-50 mt-1">
            <Card className="p-3 text-sm text-gray-500">
              No locations found matching your search.
            </Card>
          </div>
        )}
    </div>
  );
};

export default LocationDropdown;
