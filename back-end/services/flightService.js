import amadeus from "../config/amadeus.js";

export const searchFlights = async (params) => {
  const { origin, destination, date, adults } = params;

  const response = await amadeus.shopping.flightOffersSearch.get({
    originLocationCode: origin,
    destinationLocationCode: destination,
    departureDate: date,
    adults: adults || 1,
    currencyCode: "USD",
  });

  return response.data;
};
