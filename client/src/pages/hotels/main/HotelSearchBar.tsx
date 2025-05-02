import React, { useState } from "react";
import { Calendar } from "@/components/calender";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Search } from "lucide-react";

export default function HotelSearchBar() {
  // State management for form fields
  const [checkIn, setCheckIn] = useState<Date | undefined>(
    new Date("2025-04-29")
  );
  const [checkOut, setCheckOut] = useState<Date | undefined>(
    new Date("2025-04-30")
  );
  const [destination, setDestination] = useState("");
  const [guests, setGuests] = useState("2 adults, 1 room");

  // State management for filters
  const [freeCancellation, setFreeCancellation] = useState(true);
  const [fourStars, setFourStars] = useState(false);
  const [threeStars, setThreeStars] = useState(true);

  // Format date to dd/mm/yyyy
  const formatDate = (date: Date | undefined): string => {
    if (!date) return "";
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Handle search submission
  const handleSearch = () => {
    // Implementation for search functionality
    console.log({
      destination,
      checkIn,
      checkOut,
      guests,
      filters: {
        freeCancellation,
        fourStars,
        threeStars,
      },
    });
  };

  return (
    <div className="mx-auto bg-dark-blue p-6 rounded-3xl text-white w-fit">
      <div>
        <h2 className="text-sm mb-2">Where do you want to stay?</h2>

        {/* Search form grid */}
        <div className="flex flex-col md:flex-row gap-2 mb-4">
          {/* Destination input */}
          <Input
            placeholder="Enter destination or hotel name"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="flex-grow bg-white text-black"
          />

          {/* Check-in date selector */}
          <div className="w-full md:w-40">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-white text-black hover:bg-gray-100"
                >
                  <div className="text-xs text-gray-500 absolute top-0 left-2">
                    Check-in
                  </div>
                  <div className="mt-4">{formatDate(checkIn)}</div>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                {/* <Calendar
                  mode="single"
                  selected={checkIn}
                  onSelect={setCheckIn}
                  initialFocus
                /> */}
              </PopoverContent>
            </Popover>
          </div>

          {/* Check-out date selector */}
          <div className="w-full md:w-40">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-white text-black hover:bg-gray-100"
                >
                  <div className="text-xs text-gray-500 absolute top-0 left-2">
                    Check-out
                  </div>
                  <div className="mt-4">{formatDate(checkOut)}</div>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={checkOut}
                  onSelect={setCheckOut}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Guests dropdown */}
          <div className="w-full md:w-44 relative">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-white text-black hover:bg-gray-100"
                >
                  <div className="text-xs text-gray-500 absolute top-0 left-2">
                    Guests and rooms
                  </div>
                  <div className="mt-4">{guests}</div>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-4" align="start">
                <GuestsRoomsSelector guests={guests} setGuests={setGuests} />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Filters row */}
        <div className="flex items-center flex-wrap gap-4 mb-4">
          <div className="text-sm whitespace-nowrap">Popular filters:</div>
          <FilterCheckbox
            id="free-cancellation"
            label="Free cancellation"
            checked={freeCancellation}
            onChange={() => setFreeCancellation(!freeCancellation)}
          />
          <FilterCheckbox
            id="four-stars"
            label="4 stars"
            checked={fourStars}
            onChange={() => setFourStars(!fourStars)}
          />
          <FilterCheckbox
            id="three-stars"
            label="3 stars"
            checked={threeStars}
            onChange={() => setThreeStars(!threeStars)}
          />
        </div>

        {/* Search button */}
        <div className="flex justify-end">
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={handleSearch}
          >
            <span>Search hotels</span> <Search className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

// Component for the guests and rooms selector popover content
function GuestsRoomsSelector({
  setGuests,
}: {
  guests: string;
  setGuests: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [adults, setAdults] = useState(2);
  const [rooms, setRooms] = useState(1);

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

  const applySelection = () => {
    setGuests(`${adults} adults, ${rooms} room${rooms > 1 ? "s" : ""}`);
  };

  return (
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
      <Button className="w-full" onClick={applySelection}>
        Apply
      </Button>
    </div>
  );
}

// Reusable filter checkbox component
function FilterCheckbox({
  id,
  label,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <div className="flex items-center gap-1">
      <Checkbox id={id} checked={checked} onCheckedChange={onChange} />
      <label htmlFor={id} className="text-sm ml-1 cursor-pointer">
        {label}
      </label>
    </div>
  );
}
