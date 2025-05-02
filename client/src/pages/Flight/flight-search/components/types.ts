export type Flight = {
  id: number;
  departureTimeOutbound: string;
  arrivalTimeOutbound: string;
  departureAirportOutbound: string;
  arrivalAirportOutbound: string;
  airlineOutbound: string;
  flightNumberOutbound: string;
  departureTimeReturn: string;
  arrivalTimeReturn: string;
  departureAirportReturn: string;
  arrivalAirportReturn: string;
  airlineReturn: string;
  flightNumberReturn: string;
  durationOutbound: number;
  durationReturn: number;
  price: number;
  selfTransfer?: boolean;
};

export type SortOption =
  | "Cheapest"
  | "Fastest"
  | "OutboundDeparture"
  | "ReturnDeparture"
  | "Best";
