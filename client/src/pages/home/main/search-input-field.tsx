import { useState, useEffect, useRef } from "react";
import { MapPin, Plane, Search } from "lucide-react";
import { useAirports } from "@/store/useAirports";
// Types
export interface Location {
  name: string;
  code: string;
  type: "airport" | "city";
  country?: string;
}

interface LocationSearchInputProps {
  id: string;
  label?: string;
  placeholder?: string;
  value?: Location | null;
  onChange: (location: Location | null) => void;
  className?: string;
  error?: string;
}

export function LocationSearchInput({
  id,
  label,
  placeholder = "Search destination...",
  value,
  onChange,
  className = "",
  error,
}: LocationSearchInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Get airports store functions and data
  const {
    nearByAirports,
    suggest,
    fetchAll,
    loading: storeLoading,
  } = useAirports();

  // Initialize airports data on mount
  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  // Update input value when prop value changes
  useEffect(() => {
    if (value) {
      setInputValue(value.name);
    } else {
      setInputValue("");
    }
  }, [value]);

  useEffect(() => {
    if (inputValue.trim() === "" && isOpen) {
      const nearbyLocations: Location[] = nearByAirports.map((airport) => ({
        name: airport.name,
        code: airport.iata,
        type: "airport" as const,
        country: airport.city, // Using city as country for now
      }));
      setSuggestions(nearbyLocations);
    }
  }, [inputValue, isOpen, nearByAirports]);

  // Search function with debounce
  useEffect(() => {
    if (inputValue.trim() === "") return;

    searchLocations(inputValue);
  }, [inputValue]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const searchLocations = (query: string) => {
    setIsLoading(true);

    try {
      // Use the suggest function from your airports store
      const searchResults = suggest(query, 10);

      // Convert Airport[] to Location[]
      const locations: Location[] = searchResults.map((airport) => ({
        name: airport.name,
        code: airport.iata,
        type: "airport" as const,
        country: airport.city,
      }));

      setSuggestions(locations);
    } catch (error) {
      console.error("Search error:", error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    if (newValue.trim() === "") {
      // Show nearby airports when input is cleared
      const nearbyLocations: Location[] = nearByAirports.map((airport) => ({
        name: airport.name,
        code: airport.iata,
        type: "airport" as const,
        country: airport.city,
      }));
      setSuggestions(nearbyLocations);
      onChange(null);
    }
  };

  const handleInputFocus = () => {
    setIsOpen(true);
    if (inputValue.trim() === "") {
      // Show nearby airports on focus
      const nearbyLocations: Location[] = nearByAirports.map((airport) => ({
        name: airport.name,
        code: airport.iata,
        type: "airport" as const,
        country: airport.city,
      }));
      setSuggestions(nearbyLocations);
    }
  };

  const handleLocationSelect = (location: Location) => {
    setInputValue(location.name);
    setIsOpen(false);
    onChange(location);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  // Check if we should show loading state
  const showLoading = isLoading || storeLoading;

  return (
    <>
      <div ref={containerRef} className={`relative w-full ${className}`}>
        {/* Label */}
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
          </label>
        )}

        {/* Input Field */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-1 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>

          <input
            ref={inputRef}
            id={id}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className={`
            w-full pl-7 py-2 text-black border-none focus:ring-0 focus:outline-none 
          `}
            autoComplete="off"
          />

          {/* Loading Spinner */}
          {showLoading && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
            </div>
          )}

          {/* Selected Location Code */}
          {value && !isOpen && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                {value.code}
              </span>
            </div>
          )}
        </div>

        {/* Error Message */}

        {/* Suggestions Dropdown */}
        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-y-auto">
            {/* Header for nearby airports */}
            {inputValue.trim() === "" && nearByAirports.length > 0 && (
              <div className="px-3 py-2 text-xs font-medium text-gray-500 bg-gray-50 border-b">
                Nearby Airports
              </div>
            )}

            {/* Suggestions List */}
            {suggestions.length > 0 ? (
              <div className="py-1">
                {suggestions.map((location, index) => (
                  <button
                    key={`${location.code}-${index}`}
                    type="button"
                    onClick={() => handleLocationSelect(location)}
                    className="w-full px-3 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none flex items-center gap-3"
                  >
                    {/* Icon */}
                    <div className="flex-shrink-0">
                      {location.type === "airport" ? (
                        <Plane className="h-4 w-4 text-blue-500" />
                      ) : (
                        <MapPin className="h-4 w-4 text-green-500" />
                      )}
                    </div>

                    {/* Location Info */}
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 truncate">
                        {location.name}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center gap-1">
                        <span>{location.country}</span>
                        {location.type === "airport" && (
                          <>
                            <span>•</span>
                            <span className="font-medium">{location.code}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="px-3 py-4 text-sm text-gray-500 text-center">
                {showLoading
                  ? "Searching..."
                  : inputValue.trim() === ""
                  ? "No nearby airports found"
                  : "No airports found"}
              </div>
            )}
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </>
  );
}
