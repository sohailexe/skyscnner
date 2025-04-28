import { searchFlights } from "../services/flightService.js";
import { successResponse, errorResponse } from "../utils/apiResponse.js";

export const getFlights = async (req, res, next) => {
  try {
    const flights = await searchFlights(req.query);
    successResponse(res, flights);
  } catch (error) {
    next(error);
  }
};
