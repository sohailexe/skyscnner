import React, { useState } from "react";
import { Flight, SortOption } from "./components/types";
import { SortDropdown } from "./components/SortDropdown";
import { FlightResults } from "./components/FlightResults";
import initialFlights from "./components/FlightData"; // Move flight data to separate file
const FlightResult: React.FC = () => {
  const [sortBy, setSortBy] = useState<SortOption>("Best");
  const [flights, setFlights] = useState<Flight[]>(initialFlights);

  const handleSort = (sortOption: SortOption) => {
    setSortBy(sortOption);
    const sorted = sortFlights([...flights], sortOption);
    setFlights(sorted);
  };

  return (
    <div className="grid grid-cols-12 gap-4 p-6">
      <aside className="col-span-3 space-y-6">
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="font-semibold text-lg mb-4">Stops</h2>
          <div className="space-y-4">
            <label className="flex items-start gap-2">
              <input
                type="checkbox"
                defaultChecked
                className="accent-blue-600 mt-1"
              />
              <div>
                <span className="font-medium">Direct</span>
                <p className="text-sm text-gray-500">from Rs 36,785</p>
              </div>
            </label>
            <label className="flex items-start gap-2">
              <input type="checkbox" className="accent-blue-600 mt-1" />
              <div>
                <span className="font-medium">1 stop</span>
                <p className="text-sm text-gray-500">from Rs 70,371</p>
              </div>
            </label>
            <label className="flex items-start gap-2">
              <input type="checkbox" className="accent-blue-600 mt-1" />
              <div>
                <span className="font-medium">2+ stops</span>
                <p className="text-sm text-gray-500">from Rs 87,097</p>
              </div>
            </label>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="font-semibold text-lg mb-4 flex items-center justify-between">
            Baggage
            <svg
              className="w-5 h-5 text-gray-500 cursor-pointer"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </h2>
          <div className="mb-2">
            <button className="text-blue-500 text-sm mr-2">Select all</button>
            <button className="text-blue-500 text-sm">Clear all</button>
          </div>
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked />
              <svg
                className="w-5 h-5 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 13h-6m-6 6h6m-8-3v-1a7 7 0 017-7m0 0a7 7 0 037 7v-1m-7 0a7 7 0 00-7-7m0 0a7 7 0 037 7v-1m-1 5a7 7 0 007-7V3m-7 0a7 7 0 00-7 7v16m7-16a7 7 0 017 7v1m-7 0a7 7 0 01-7-7v1"
                ></path>
              </svg>
              Cabin bag
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              <svg
                className="w-5 h-5 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 13h-6m-6 6h6m-8-3v-1a7 7 0 017-7m0 0a7 7 0 037 7 7v-1m-7 0a7 7 0 00-7-7m0 0a7 7 0 037 7v-1m-1 5a7 7 0 007-7V3m-7 0a7 7 0 00-7 7v16m7-16a7 7 0 017 7v1m-7 0a7 7 0 01-7-7v1"
                ></path>
              </svg>
              Checked bag
            </label>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="font-semibold text-lg mb-4">Departure Times</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-700">Outbound</p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">00:00</span>
                <input
                  type="range"
                  min="0"
                  max="23"
                  defaultValue="0,23"
                  className="w-full"
                />
                <span className="text-xs text-gray-500">23:59</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-700">Return</p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">00:00</span>
                <input
                  type="range"
                  min="0"
                  max="23"
                  defaultValue="0,23"
                  className="w-full"
                />
                <span className="text-xs text-gray-500">23:59</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="font-semibold text-lg mb-4">Journey Duration</h2>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">1.0 hour</span>
            <input
              type="range"
              min="1"
              max="23.5"
              step="0.5"
              defaultValue="0,23"
              className="w-full"
            />
            <span className="text-xs text-gray-500">23.5 hours</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="font-semibold text-lg mb-4 flex items-center justify-between">
            Airlines
            <svg
              className="w-5 h-5 text-gray-500 cursor-pointer"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </h2>
          <div className="mb-3 flex items-center text-sm">
            <button className="text-gray-500 mr-3">Select all</button>
            <button className="text-blue-600">Clear all</button>
          </div>
          <div className="space-y-3 max-h-52 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 pr-2">
            {Object.keys(
              flights.reduce((acc) => {
                // acc[flight.a] = true;
                return acc;
              }, {})
            )
              .sort()
              .map((airline) => {
                const airlineFlights = flights.filter(
                  (f) => f.airlineOutbound === airline
                );
                const minPrice =
                  airlineFlights.length > 0
                    ? Math.min(...airlineFlights.map((f) => f.price))
                    : null;
                // const count = airlineFlights.length;

                return (
                  <label
                    key={airline}
                    className="flex items-center gap-2 text-sm"
                  >
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />{" "}
                    {/* Blue checkbox */}
                    <span className="font-normal text-gray-700">
                      {airline}
                    </span>{" "}
                    {/* Slightly less bold airline name */}
                    {minPrice !== null && (
                      <span className="text-gray-700 ml-auto">
                        from Rs {minPrice.toLocaleString()}
                      </span>
                    )}
                  </label>
                );
              })}
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />{" "}
              {/* Blue checkbox */}
              <span className="font-normal text-gray-700">
                Airline combinations
              </span>{" "}
              {/* Slightly less bold */}
              <span className="text-gray-700 ml-auto">
                from Rs{" "}
                {Math.min(...flights.map((f) => f.price)).toLocaleString()}
              </span>
            </label>
            {Object.keys(
              flights.reduce((acc) => {
                // acc[flight.airline] = true;
                return acc;
              }, {})
            ).length > 5 && (
              <button className="text-blue-600 text-sm mt-3 block w-full text-left">
                Show more
              </button>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="font-semibold text-lg mb-4 flex items-center justify-between">
            Flight emissions
            <svg
              className="w-5 h-5 text-gray-500 cursor-pointer"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </h2>
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span>Only show flights with lower CO2e emissions</span>
            </label>
            <p className="text-xs text-gray-500 ml-6">None</p>
          </div>
        </div>
      </aside>

      <main className="col-span-9 space-y-4">
        <div className="bg-white rounded-xl shadow p-4 flex justify-between items-center">
          <p className="text-sm text-gray-500">{flights.length} results</p>
          <SortDropdown currentSort={sortBy} onSortChange={handleSort} />
        </div>

        <FlightResults flights={flights} />
      </main>
    </div>
  );
};

// Helper functions
const sortFlights = (flights: Flight[], sortOption: SortOption): Flight[] => {
  switch (sortOption) {
    case "Cheapest":
      return flights.sort((a, b) => a.price - b.price);
    case "Fastest":
      return flights.sort(
        (a, b) =>
          a.durationOutbound +
          a.durationReturn -
          (b.durationOutbound + b.durationReturn)
      );
    case "OutboundDeparture":
      return flights.sort(timeSorter("departureTimeOutbound"));
    case "ReturnDeparture":
      return flights.sort(timeSorter("departureTimeReturn"));
    default:
      return flights;
  }
};

const timeSorter = (key: keyof Flight) => (a: Flight, b: Flight) => {
  const [hA, mA] = (a[key]?.toString() ?? "0:0").split(":").map(Number);
  const [hB, mB] = (b[key]?.toString() ?? "0:0").split(":").map(Number);
  return hA - hB || mA - mB;
};

export default FlightResult;
