import React from "react";
import { Flight } from "./types";

interface FlightCardProps {
  flight: Flight;
}

export const FlightCard: React.FC<FlightCardProps> = ({ flight }) => (
  <div className="bg-white rounded-xl shadow p-4 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
    <div className="md:col-span-3 flex items-center">
      <p className="text-xs text-blue-600 font-semibold uppercase">
        {flight.airlineOutbound}
      </p>
    </div>
    <div className="md:col-span-3 flex flex-col items-start">
      <p className="text-sm text-gray-700">
        <span className="font-semibold">{flight.departureTimeOutbound}</span>{" "}
        <span className="text-xs text-gray-500">
          {flight.departureAirportOutbound}
        </span>
      </p>
      <p className="text-xs text-gray-500">
        {Math.floor(flight.durationOutbound / 60)}h{" "}
        {flight.durationOutbound % 60}m
      </p>
    </div>
    <div className="md:col-span-2 flex items-center justify-center">
      <svg
        className="w-4 h-4 text-gray-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M14 5l7 7m0 0l-7 7m7-7H3"
        ></path>
      </svg>
      <p className="text-xs text-blue-500 ml-1">Direct</p>{" "}
      {/* Assuming it's a direct flight for now */}
    </div>
    <div className="md:col-span-3 flex flex-col items-end md:items-start">
      <p className="text-sm text-gray-700">
        <span className="font-semibold">{flight.arrivalTimeOutbound}</span>{" "}
        <span className="text-xs text-gray-500">
          {flight.arrivalAirportOutbound}
        </span>
      </p>
    </div>
    <div className="md:col-span-1 flex flex-col items-end">
      <svg
        className="w-5 h-5 text-gray-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        ></path>
      </svg>
    </div>
    <div className="md:col-span-12 md:hidden border-b border-gray-200 py-2"></div>{" "}
    {/* Separator for mobile */}
    <div className="md:col-span-3 md:col-start-4 flex flex-col items-start mt-2 md:mt-0">
      <p className="text-xs text-gray-500">{flight.airlineReturn}</p>
      <p className="text-sm text-gray-700">
        <span className="font-semibold">{flight.departureTimeReturn}</span>{" "}
        <span className="text-xs text-gray-500">
          {flight.departureAirportReturn}
        </span>
      </p>
    </div>
    <div className="md:col-span-2 md:flex md:items-center md:justify-center mt-2 md:mt-0">
      <svg
        className="w-4 h-4 text-gray-500 md:hidden"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M14 5l7 7m0 0l-7 7m7-7H3"
        ></path>
      </svg>
      <p className="text-xs text-gray-500 md:hidden ml-1">Direct</p>
      <div className="relative w-20 border-b border-dashed border-gray-300 md:block hidden"></div>
      <p className="text-xs text-gray-500 md:hidden">
        {Math.floor(flight.durationReturn / 60)}h {flight.durationReturn % 60}m
      </p>
    </div>
    <div className="md:col-span-3 flex flex-col items-end md:items-start mt-2 md:mt-0">
      <p className="text-sm text-gray-700">
        <span className="font-semibold">{flight.arrivalTimeReturn}</span>{" "}
        <span className="text-xs text-gray-500">
          {flight.arrivalAirportReturn}
        </span>
      </p>
    </div>
    <div className="md:col-span-4 md:col-start-9 flex flex-col md:items-end items-start mt-4 md:mt-0">
      <p className="text-xs text-gray-500 md:text-right">3 deals from</p>
      <p className="font-semibold text-lg md:text-right">Rs {flight.price}</p>
      <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm w-full md:w-auto">
        Select
      </button>
    </div>
  </div>
);
