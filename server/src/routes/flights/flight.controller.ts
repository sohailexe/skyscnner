import { Request, Response, NextFunction } from "express";

import { flightValidator } from "./flight.validator";
import { errorParser } from "../../utils/errorParser";
import { amadeus } from "../../utils/amadeus";
import { DateTime, Duration } from "luxon";
import { FlightModel } from "./flights.model";

const getFlightDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const parsed = flightValidator.safeParse(req.body);

    if (!parsed.success) {
      return errorParser(parsed, res);
    }

    const {
      fromLocation,
      toLocation,
      departureDate,
      returnDate,
      traverlerDetails: { adults, children },
      userTimezone,
    } = parsed.data;

    const params: any = {
      originLocationCode: fromLocation,
      destinationLocationCode: toLocation,
      departureDate,
      adults,
      max: 5,
    };

    if (returnDate) params.returnDate = returnDate;

    const response = await amadeus.shopping.flightOffersSearch.get(params);

    const mappedFlights = response.data.map((offer: any) => {
      const itinerary = offer.itineraries[0];
      const segment = itinerary.segments[0];
      const lastSegment = itinerary.segments[itinerary.segments.length - 1];
      const traveler = offer.travelerPricings[0];
      const formattedArrivalTime = DateTime.fromISO(lastSegment.arrival.at, {
        zone: userTimezone,
      }).toFormat("cccc, dd LLL yyyy, hh:mm a");
      const formattedDepartureTime = DateTime.fromISO(segment.departure.at, {
        zone: userTimezone,
      }).toFormat("cccc, dd LLL yyyy, hh:mm a");
      const duration = Duration.fromISO(itinerary.duration);
      const readable = `${duration.hours}h ${duration.minutes}m`;

      return {
        airline: segment.carrierCode,
        from: segment.departure.iataCode,
        to: lastSegment.arrival.iataCode,
        departureTime: formattedDepartureTime,
        arrivalTime: formattedArrivalTime,
        totalDuration: readable,
        numberOfStops: itinerary.segments.length - 1,
        cabinClass: traveler.fareDetailsBySegment[0].cabin,
        totalPrice: traveler.price.total,
        currency: traveler.price.currency,
      };
    });

    const flightData = await FlightModel.insertOne({
      From: fromLocation,
      To: toLocation,
      DepartureDate: departureDate,
      ReturnDate: returnDate,
      TravelerDetails: {
        adults,
        children,
      },
      user: req.body.user?.id,
    });

    return res.status(200).json(mappedFlights);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while fetching flight details.",
    });
  }
};

export { getFlightDetails };
