import { searchFlights } from "../services/flightService.js";
import { successResponse, errorResponse } from "../utils/apiResponse.js";
import amadeus from "../config/amadeus.js";

export const getFlights = async (req, res, next) => {
  const { origin, destination, date, adults } = req.query;
  try {
    if (!origin || !destination || !date) {
      throw new Error(
        "Missing required query parameters: origin, destination, or date."
      );
    }
    console.log("Flight search query:", req.query);

    // 2. Calling Amadeus API
    const response = await amadeus.shopping.flightOffersSearch.get({
      originLocationCode: origin,
      destinationLocationCode: destination,
      departureDate: date,
      adults: adults || 1, // Default to 1 adult if not specified
      currencyCode: "USD", // Consider making this configurable based on user preferences
    });

    // 3. Returning Data
    return res.status(200).json({
      success: true,
      data: response.data,
    });
  } catch (error) {
    // 4. Improved Error Handling
    console.error(
      "Error fetching flight offers:",
      error.response?.data || error.message
    );

    next(
      errorResponse(
        res,
        500,
        "Failed to fetch flight offers. Please try again later."
      )
    );
  }
};
