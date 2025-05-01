import React, { useState } from "react";
import { SortOption } from "./types";

interface SortDropdownProps {
  onSortChange: (option: SortOption) => void;
  currentSort: SortOption;
}

export const SortDropdown: React.FC<SortDropdownProps> = ({
  onSortChange,
  currentSort,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="border border-gray-300 px-3 py-1 rounded-md text-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        Sort by: <span className="font-semibold">{currentSort}</span>
        <svg
          className="w-4 h-4 inline-block ml-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl z-10">
          <ul className="py-2 text-sm text-gray-700">
            {[
              "Cheapest",
              "Fastest",
              "OutboundDeparture",
              "ReturnDeparture",
              "Best",
            ].map((option) => (
              <li key={option}>
                <button
                  onClick={() => {
                    onSortChange(option as SortOption);
                    setIsOpen(false);
                  }}
                  className="block w-full px-4 py-2 hover:bg-gray-100 text-left"
                >
                  {option} First
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
