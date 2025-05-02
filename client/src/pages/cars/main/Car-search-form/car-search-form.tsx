import { useState } from "react";
import { Calendar, Clock, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/calender";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TimeOption {
  value: string;
  label: string;
}

interface FormData {
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: Date;
  dropoffDate: Date;
  pickupTime: string;
  dropoffTime: string;
  sameDropoff: boolean;
}

interface IsOpenState {
  pickupDate: boolean;
  dropoffDate: boolean;
}

// Generate time options in 30-minute increments
const generateTimeOptions = (): TimeOption[] => {
  const options: TimeOption[] = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute of [0, 30]) {
      const hourFormatted = hour.toString().padStart(2, "0");
      const minuteFormatted = minute.toString().padStart(2, "0");
      const time = `${hourFormatted}:${minuteFormatted}`;
      const displayTime = `${hour % 12 || 12}:${minuteFormatted} ${
        hour < 12 ? "AM" : "PM"
      }`;
      options.push({ value: time, label: displayTime });
    }
  }
  return options;
};

const timeOptions: TimeOption[] = generateTimeOptions();

export default function CarSearchForm() {
  const [formData, setFormData] = useState<FormData>({
    pickupLocation: "",
    dropoffLocation: "",
    pickupDate: new Date(),
    dropoffDate: new Date(new Date().setDate(new Date().getDate() + 1)),
    pickupTime: "10:00",
    dropoffTime: "10:00",
    sameDropoff: true,
  });

  const [isOpen, setIsOpen] = useState<IsOpenState>({
    pickupDate: false,
    dropoffDate: false,
  });

  // Handle form field changes
  const handleTextChange =
    (field: keyof Pick<FormData, "pickupLocation" | "dropoffLocation">) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));

      // If same location is checked, update dropoff location too
      if (field === "pickupLocation" && formData.sameDropoff) {
        setFormData((prev) => ({ ...prev, dropoffLocation: e.target.value }));
      }
    };

  const handleDateChange =
    (field: keyof Pick<FormData, "pickupDate" | "dropoffDate">) =>
    (date: Date | undefined) => {
      if (!date) return;
      setFormData((prev) => ({ ...prev, [field]: date }));

      // Auto-close the popover
      if (field === "pickupDate") {
        setIsOpen((prev) => ({ ...prev, pickupDate: false }));

        // Ensure dropoff date is not before pickup date
        if (formData.dropoffDate < date) {
          setFormData((prev) => ({
            ...prev,
            dropoffDate: new Date(date.getTime() + 24 * 60 * 60 * 1000),
          }));
        }
      }
      if (field === "dropoffDate")
        setIsOpen((prev) => ({ ...prev, dropoffDate: false }));
    };

  const handleSelectChange =
    (field: keyof Pick<FormData, "pickupTime" | "dropoffTime">) =>
    (value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    };

  const handleSameLocationChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      sameDropoff: checked,
      // If checking the box, copy pickup location to dropoff
      dropoffLocation: checked ? prev.pickupLocation : prev.dropoffLocation,
    }));
  };

  // Format date for display
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Format time for display
  const formatTime = (time: string): string => {
    const option = timeOptions.find((opt) => opt.value === time);
    return option ? option.label : time;
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search data:", formData);
    // Implement search logic here
  };

  return (
    <div className="bg-dark-blue p-6 md:p-8 rounded-3xl text-white max-w-6xl mx-auto shadow-lg">
      <div className="w-full grid grid-cols-3 gap-2.5 items-end">
        {/* Pickup Location input */}
        <div className="">
          <div className="relative">
            <label className="text-xs text-gray-300 mb-1 block">
              Pick-up location
            </label>
            <Input
              placeholder="City, airport, or address"
              value={formData.pickupLocation}
              onChange={handleTextChange("pickupLocation")}
              className="bg-white text-black h-12"
            />
          </div>
        </div>

        {/* Pickup Date selector */}
        <div className="">
          <label className="text-xs text-gray-300 mb-1 block">
            Pick-up date
          </label>
          <Popover
            open={isOpen.pickupDate}
            onOpenChange={(open: boolean) =>
              setIsOpen((prev) => ({ ...prev, pickupDate: open }))
            }
          >
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start bg-white text-black hover:bg-gray-100 h-12"
              >
                <Calendar className=" h-4 w-4" />
                {formatDate(formData.pickupDate)}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={formData.pickupDate}
                onSelect={handleDateChange("pickupDate")}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Pickup Time selector */}
        <div className="">
          <label className="text-xs text-gray-300 mb-1 block l">Time</label>
          <Select
            value={formData.pickupTime}
            onValueChange={handleSelectChange("pickupTime")}
          >
            <SelectTrigger className="bg-white text-black h-12 w-full">
              <SelectValue>
                <div className="flex items-center">
                  <Clock className="mr-2  w-full" />
                  {formatTime(formData.pickupTime)}
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {timeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Dropoff Location input */}
        <div className="">
          <div className="relative">
            <label className="text-xs text-gray-300 mb-1 block">
              Drop-off location
            </label>
            <Input
              placeholder="City, airport, or address"
              value={formData.dropoffLocation}
              onChange={handleTextChange("dropoffLocation")}
              className="bg-white text-black h-12"
              disabled={formData.sameDropoff}
            />
          </div>
        </div>

        {/* Dropoff Date selector */}
        <div className="">
          <label className="text-xs text-gray-300 mb-1 block">
            Drop-off date
          </label>
          <Popover
            open={isOpen.dropoffDate}
            onOpenChange={(open: boolean) =>
              setIsOpen((prev) => ({ ...prev, dropoffDate: open }))
            }
          >
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start bg-white text-black hover:bg-gray-100 h-12"
              >
                <Calendar className=" h-4 w-4" />
                {formatDate(formData.dropoffDate)}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={formData.dropoffDate}
                onSelect={handleDateChange("dropoffDate")}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Dropoff Time selector */}
        <div className="">
          <label className="text-xs text-gray-300 mb-1 block">Time</label>
          <Select
            value={formData.dropoffTime}
            onValueChange={handleSelectChange("dropoffTime")}
          >
            <SelectTrigger className="bg-white text-black h-12 w-full">
              <SelectValue>
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4" />
                  {formatTime(formData.dropoffTime)}
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {timeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Search Button */}
        <div className="mt-4 md:mt-0 col-span-3">
          <Button
            onClick={handleSearch}
            className="bg-blue-600 hover:bg-blue-700 text-white w-full h-12"
          >
            <Search className="mr-2 h-4 w-4" />
            Search Cars
          </Button>
        </div>
      </div>

      {/* Same location checkbox */}
      <div className="flex items-center gap-2 mt-4">
        <Checkbox
          id="same-location"
          checked={formData.sameDropoff}
          onCheckedChange={handleSameLocationChange}
        />
        <label htmlFor="same-location" className="text-sm">
          Return car to same location
        </label>
      </div>
    </div>
  );
}
