import { DateInputField } from "./DateInputField";

interface DateSelectorProps {
  departureDate: Date | undefined;
  returnDate: Date | undefined;
  onDepartureDateChange: (date: Date | undefined) => void;
  onReturnDateChange: (date: Date | undefined) => void;
  departureDateError?: string;
  returnDateError?: string;
  departureDateClassName?: string;
  returnDateClassName?: string;
}

export const DateSelector = ({
  departureDate,
  returnDate,
  onDepartureDateChange,
  onReturnDateChange,
  departureDateError,
  returnDateError,
  departureDateClassName = "",
  returnDateClassName = "rounded-b-2xl md:rounded-b-none md:rounded-r-2xl",
}: DateSelectorProps) => {
  return (
    <>
      <div className="md:col-span-2">
        <DateInputField
          id="departureDate"
          label="Departure"
          value={departureDate}
          onChange={onDepartureDateChange}
          error={departureDateError}
          className={departureDateClassName}
        />
      </div>
      <div className="md:col-span-2">
        <DateInputField
          id="returnDate"
          label="Return"
          value={returnDate}
          onChange={onReturnDateChange}
          className={returnDateClassName}
          error={returnDateError}
        />
      </div>
    </>
  );
};
