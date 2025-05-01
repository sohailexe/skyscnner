import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeftRight, CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import axios from "axios";
import { useFlight } from "@/context/searchFlightcontext";
import { useNavigate } from "react-router";
// Types and interfaces
interface FlightSearchData {
  from: string;
  to: string;
  departDate: Date | undefined;
  returnDate: Date | undefined;
  nearbyAirports: boolean;
  directFlights: boolean;
}

interface LocationInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

interface DatePickerProps {
  label: string;
  date: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
  className?: string;
}

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: () => void;
  className?: string;
}

// Reusable components
const LocationInput = ({
  id,
  label,
  value,
  onChange,
  placeholder = "Country, city or airport",
  className = "",
}: LocationInputProps) => (
  <div className={`bg-white px-3 py-3 ${className}`}>
    <label htmlFor={id} className="text-sm text-gray-500 mb-1">
      {label}
    </label>
    <Input
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="border-0 p-0 text-black font-medium focus-visible:ring-0 h-auto"
    />
  </div>
);

const DatePicker = ({
  label,
  date,
  onDateChange,
  className = "",
}: DatePickerProps) => (
  <Popover>
    <PopoverTrigger asChild>
      <div className={`bg-white px-4 py-[11px] min-w-[150px] ${className}`}>
        <label className="text-sm text-gray-500 mb-1">{label}</label>
        <div className="flex items-center justify-between gap-2">
          <span className="text-black font-medium">
            {date ? format(date, "dd/MM/yyyy") : "Select date"}
          </span>
          <CalendarIcon className="h-5 w-5 text-gray-500" />
        </div>
      </div>
    </PopoverTrigger>
    <PopoverContent className="w-auto p-0" align="start">
      <Calendar
        mode="single"
        selected={date}
        onSelect={onDateChange}
        initialFocus
      />
    </PopoverContent>
  </Popover>
);

const CustomCheckbox = ({
  label,
  checked,
  onChange,
  className = "",
}: CheckboxProps) => (
  <label className={`flex items-center text-sm md:text-base ${className}`}>
    <input
      type="checkbox"
      className="form-checkbox h-5 w-5 text-[#0057FF] focus:ring-[#0057FF] rounded mr-2"
      checked={checked}
      onChange={onChange}
    />
    {label}
  </label>
);

// Main component
export function HomeSearchForm() {
  const { flight, setFlight } = useFlight();
  // State management
  const [formData, setFormData] = useState<
    Omit<FlightSearchData, "nearbyAirports" | "directFlights">
  >({
    from: "",
    to: "",
    departDate: undefined,
    returnDate: undefined,
  });
  const [nearbyAirports, setNearbyAirports] = useState<boolean>(false);
  const [directFlights, setDirectFlights] = useState<boolean>(false);
  const [rotated, setRotated] = useState<boolean>(false);
  const navigate = useNavigate();
  // Handlers
  const handleInputChange =
    (field: keyof typeof formData) => (value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    };

  const handleDateChange =
    (field: "departDate" | "returnDate") => (date: Date | undefined) => {
      // If the date is undefined, just return as is
      if (date) {
        const formattedDate = format(date, "yyyy-MM-dd");
        setFormData((prev) => ({ ...prev, [field]: formattedDate }));
      } else {
        setFormData((prev) => ({ ...prev, [field]: undefined }));
      }
    };

  const handleSwapLocations = () => {
    setFormData((prev) => ({
      ...prev,
      from: prev.to,
      to: prev.from,
    }));
    setRotated((prev) => !prev);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("clicked");

    try {
      const response = await axios.get("http://localhost:5000/api/v1/flights", {
        params: {
          origin: formData.from,
          destination: formData.to,
          date: formData.departDate,
          adults: 2,
        },
      });

      setFlight(response.data.data);

      navigate("/xx");
      // console.log(response.data);
      // setFlight(response.data); ← If you're using context
    } catch (error) {
      console.error("Flight search failed:", error);
    }
  };
  return (
    <form
      onSubmit={handleSearch}
      className="pb-5 flex flex-col justify-center items-center bg-dark-blue p-8 rounded-3xl text-white w-fit mx-auto"
    >
      <div className="w-full flex gap-2 py-3 justify-center items-center">
        {/* From Input with Swap Button */}
        <div className="relative">
          <LocationInput
            id="from"
            label="From"
            value={formData.from}
            onChange={handleInputChange("from")}
            className="rounded-l-2xl pr-6"
          />
          <div className="absolute right-[0] translate-x-[50%] top-[50%] translate-y-[-50%]">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className={`rounded-full bg-white transition-transform text-dark-text size-12 border-4 border-dark-blue ${
                rotated ? "rotate-180" : ""
              }`}
              onClick={handleSwapLocations}
            >
              <ArrowLeftRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* To Input */}
        <LocationInput
          id="to"
          label="To"
          value={formData.to}
          onChange={handleInputChange("to")}
          className="pl-6"
        />

        {/* Date Pickers */}
        <DatePicker
          label="Depart"
          date={formData.departDate ? new Date(formData.departDate) : undefined}
          onDateChange={handleDateChange("departDate")}
        />
        <DatePicker
          label="Return"
          date={formData.returnDate ? new Date(formData.returnDate) : undefined}
          onDateChange={handleDateChange("returnDate")}
        />

        <div className="bg-white px-3 py-3 rounded-r-2xl">
          <label htmlFor="a" className="text-sm text-gray-500 mb-1">
            "TEST"
          </label>
          <Input
            id="a"
            value="sd"
            onChange={() => {}}
            placeholder={"asd"}
            className="border-0 p-0 text-black font-medium focus-visible:ring-0 h-auto"
          />
        </div>

        {/* Search Button */}
        <Button
          type="submit"
          className="bg-light-blue text-white px-5 py-9 rounded-2xl hover:bg-light-blue/80"
          variant="default"
        >
          Search
        </Button>
      </div>

      {/* Checkboxes */}
      <div className="flex flex-wrap items-center gap-6 mt-4">
        <CustomCheckbox
          label="Add nearby airports"
          checked={nearbyAirports}
          onChange={() => setNearbyAirports((prev) => !prev)}
        />
        <CustomCheckbox
          label="Direct flights"
          checked={directFlights}
          onChange={() => setDirectFlights((prev) => !prev)}
        />
      </div>
    </form>
  );
}
