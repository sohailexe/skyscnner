import { useState } from "react";
import { Calendar, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/calender";

interface FormData {
  destination: string;
  checkInDate: Date;
  checkOutDate: Date;
  guests: string;
  freeCancellation: boolean;
  fourStars: boolean;
  threeStars: boolean;
}

interface IsOpenState {
  checkIn: boolean;
  checkOut: boolean;
  guests: boolean;
}

export default function HotelSearchForm() {
  // State management with TypeScript types
  const [formData, setFormData] = useState<FormData>({
    destination: "",
    checkInDate: new Date(),
    checkOutDate: new Date(new Date().setDate(new Date().getDate() + 1)),
    guests: "2 adults, 1 room",
    freeCancellation: true,
    fourStars: false,
    threeStars: true,
  });

  const [isOpen, setIsOpen] = useState<IsOpenState>({
    checkIn: false,
    checkOut: false,
    guests: false,
  });

  const [adults, setAdults] = useState<number>(2);
  const [rooms, setRooms] = useState<number>(1);

  // Event handler types
  const handleTextChange =
    (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleDateChange =
    (field: keyof Pick<FormData, "checkInDate" | "checkOutDate">) =>
    (date: Date | undefined) => {
      if (!date) return;
      setFormData((prev) => ({ ...prev, [field]: date }));
      if (field === "checkInDate")
        setIsOpen((prev) => ({ ...prev, checkIn: false }));
      if (field === "checkOutDate")
        setIsOpen((prev) => ({ ...prev, checkOut: false }));
    };

  const handleCheckboxChange =
    (
      field: keyof Pick<
        FormData,
        "freeCancellation" | "fourStars" | "threeStars"
      >
    ) =>
    () => {
      setFormData((prev) => ({ ...prev, [field]: !prev[field] }));
    };

  // Format date with TypeScript return type
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const applyGuestSelection = () => {
    setFormData((prev) => ({
      ...prev,
      guests: `${adults} adults, ${rooms} room${rooms > 1 ? "s" : ""}`,
    }));
    setIsOpen((prev) => ({ ...prev, guests: false }));
  };

  // Counter controls with TypeScript types
  const increment = (
    value: number,
    setter: React.Dispatch<React.SetStateAction<number>>
  ) => {
    setter(value + 1);
  };

  const decrement = (
    value: number,
    setter: React.Dispatch<React.SetStateAction<number>>
  ) => {
    if (value > 1) {
      setter(value - 1);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search data:", formData);
  };

  // JSX remains mostly the same with added type safety
  return (
    <div className="bg-dark-blue p-6 md:p-8 rounded-3xl text-white max-w-6xl mx-auto shadow-lg">
      <div className="w-full grid grid-cols-1 md:grid-cols-4 xl:grid-cols-9 gap-2 items-end">
        {/* Destination input */}
        <div className="md:col-span-2  ">
          <div className="relative">
            <label className="text-xs text-gray-300 mb-1 block">
              Destination
            </label>
            <Input
              placeholder="Enter destination or hotel name"
              value={formData.destination}
              onChange={handleTextChange("destination")}
              className="bg-white text-black h-12 "
            />
          </div>
        </div>
        {/* Guests dropdown */}
        <div className="md:col-span-2">
          <label className="text-xs text-gray-300 mb-1 block">
            Guests & Rooms
          </label>
          <Popover
            open={isOpen.guests}
            onOpenChange={(open: boolean) =>
              setIsOpen((prev) => ({ ...prev, guests: open }))
            }
          >
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start bg-white text-black hover:bg-gray-100 h-12"
              >
                {formData.guests}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-4" align="start">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Guests</h3>
                  <div className="flex justify-between items-center">
                    <span>Adults</span>
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
                <div>
                  <h3 className="font-medium mb-2">Rooms</h3>
                  <div className="flex justify-between items-center">
                    <span>Rooms</span>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => decrement(rooms, setRooms)}
                        disabled={rooms <= 1}
                      >
                        -
                      </Button>
                      <span>{rooms}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => increment(rooms, setRooms)}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </div>
                <Button className="w-full" onClick={applyGuestSelection}>
                  Apply
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        {/* Check-in date selector */}
        <div className="md:col-span-1 w-full xl:col-span-2">
          <label className="text-xs text-gray-300 mb-1 block">Check-in</label>
          <Popover
            open={isOpen.checkIn}
            onOpenChange={(open: boolean) =>
              setIsOpen((prev) => ({ ...prev, checkIn: open }))
            }
          >
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start bg-white text-black hover:bg-gray-100 h-12"
              >
                <Calendar className="mr-2 h-4 w-4" />
                {formatDate(formData.checkInDate)}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={formData.checkInDate}
                onSelect={handleDateChange("checkInDate")}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Check-out date selector */}
        <div className="md:col-span-1 xl:col-span-2 ">
          <label className="text-xs text-gray-300 mb-1 block">Check-out</label>
          <Popover
            open={isOpen.checkOut}
            onOpenChange={(open: boolean) =>
              setIsOpen((prev) => ({ ...prev, checkOut: open }))
            }
          >
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start bg-white text-black hover:bg-gray-100 h-12"
              >
                <Calendar className="mr-2 h-4 w-4" />
                {formatDate(formData.checkOutDate)}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={formData.checkOutDate}
                onSelect={handleDateChange("checkOutDate")}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Search Button */}
        <div className="mt-4 md:mt-0 md:col-span-2 xl:col-span-1">
          <Button
            onClick={handleSearch}
            className="bg-blue-600 hover:bg-blue-700 text-white w-full h-12"
          >
            <Search className="mr-1 h-4 " />
            Search Hotels
          </Button>
        </div>
      </div>

      {/* Filter options */}
      <div className="flex flex-wrap gap-4 mt-4">
        <div className="flex items-center gap-2">
          <Checkbox
            id="free-cancellation"
            checked={formData.freeCancellation}
            onCheckedChange={handleCheckboxChange("freeCancellation")}
          />
          <label htmlFor="free-cancellation" className="text-sm">
            Free cancellation
          </label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            id="four-stars"
            checked={formData.fourStars}
            onCheckedChange={handleCheckboxChange("fourStars")}
          />
          <label htmlFor="four-stars" className="text-sm">
            4+ stars
          </label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            id="three-stars"
            checked={formData.threeStars}
            onCheckedChange={handleCheckboxChange("threeStars")}
          />
          <label htmlFor="three-stars" className="text-sm">
            3+ stars
          </label>
        </div>
      </div>
    </div>
  );
}
