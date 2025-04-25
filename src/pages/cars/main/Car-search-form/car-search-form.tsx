import React, { useRef, useState } from "react";
import InputTextField from "./input-text-field";
import InputDateField from "./input-date-field";
import { InputSelect } from "./input-select";

interface CarSearchData {
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: Date;
  dropoffDate: Date;
  pickupTime: string;
  dropoffTime: string;
}

const CarSearchForm: React.FC = () => {
  const [searchData, setSearchData] = useState<CarSearchData>({
    pickupLocation: "",
    dropoffLocation: "",
    pickupDate: new Date(),
    dropoffDate: new Date(),
    pickupTime: "",
    dropoffTime: "",
  });

  const pickupRef = useRef<HTMLInputElement>(null);

  const handleInputChange = <K extends keyof CarSearchData>(
    field: K,
    value: CarSearchData[K]
  ) => {
    setSearchData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search data:", searchData);
    // Add your search logic here
  };

  return (
    <form
      onSubmit={handleSearch}
      className="w-full bg-dark-blue p-8 rounded-3xl text-white max-w-5xl mx-auto"
    >
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 w-full">
        <InputTextField
          id="pickup-location"
          label="Pick-up location"
          value={searchData.pickupLocation}
          onChange={(value) => handleInputChange("pickupLocation", value)}
          placeholder="Enter pick-up location"
          ref={pickupRef}
        />
        <InputDateField
          id="pickupDate"
          label="Pick up date"
          value={searchData.pickupDate}
          onChange={(value) => value && handleInputChange("pickupDate", value)}
        />

        <InputSelect
          label="Time"
          value={searchData.pickupTime}
          onValueChange={(value) => handleInputChange("pickupTime", value)}
        />
        <InputDateField
          id="dropoffDate"
          label="Drop off date"
          value={searchData.dropoffDate}
          onChange={(value) => value && handleInputChange("dropoffDate", value)}
        />

        <InputSelect
          label="Time"
          value={searchData.dropoffTime}
          onValueChange={(value) => handleInputChange("dropoffTime", value)}
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg w-full transition-colors h-full self-end"
        >
          Search Cars
        </button>
      </div>
    </form>
  );
};

export default CarSearchForm;
