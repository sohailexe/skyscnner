import { Request, Response, NextFunction } from "express";

import { flightValidator } from "./flights/flight.validator";
import { errorParser } from "../../utils/errorParser";
import { amadeus } from "../../utils/amadeus";
import { DateTime, Duration } from "luxon";
import { FlightModel } from "./flights/flights.model";
import { hotelValidator } from "./hotels/hotel.validator";
import { HotelCard } from "../../types/flights";
import { HotelModel } from "./hotels/hotel.model";
import { carBookingValidator } from "./car/car.validator";

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

    if (
      returnDate &&
      DateTime.fromISO(departureDate) > DateTime.fromISO(returnDate)
    ) {
      return res.status(400).json({
        success: false,
        message: "Return date must be after departure date",
      });
    }

    const params: any = {
      originLocationCode: fromLocation,
      destinationLocationCode: toLocation,
      departureDate,
      adults,
      max: 5,
    };

    if (returnDate) params.returnDate = returnDate;

    let response;
    try {
      response = await amadeus.shopping.flightOffersSearch.get(params);
    } catch (err: any) {
      return res.status(502).json({
        success: false,
        message: "Failed to fetch flight data from the flight provider.",
      });
    }

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

    res.status(200).json({
      success: true,
      data: mappedFlights,
    });

    // Background DB logging (non-blocking)
    res.on("finish", async () => {
      try {
        await FlightModel.create({
          From: fromLocation,
          To: toLocation,
          DepartureDate: departureDate,
          ReturnDate: returnDate,
          TravelerDetails: { adults, children },
          user: req.body.user?.id || null,
        });
      } catch (logErr) {
        console.error("Background flight log failed:", logErr);
      }
    });
  } catch (error) {
    console.error("Flight fetch error:", error);
    return res.status(500).json({
      success: false,
      message: "Unexpected server error while fetching flight details.",
    });
  }
};

const getHotelDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const parsed = hotelValidator.safeParse(req.body);

    if (!parsed.success) {
      return errorParser(parsed, res);
    }

    const { checkIn, checkout, destination, guestDetails, roomType } =
      parsed.data;

    if (DateTime.fromISO(checkIn) > DateTime.fromISO(checkout)) {
      return res.status(400).json({
        success: false,
        message: "Check-in date must be before check-out date.",
      });
    }

    let hotelsResponse;
    try {
      hotelsResponse = await amadeus.referenceData.locations.hotels.byCity.get({
        cityCode: destination,
      });
    } catch (err) {
      return res.status(502).json({
        success: false,
        message: "Failed to fetch hotel locations from external provider.",
      });
    }

    const hotels = hotelsResponse?.data;
    if (!hotels || hotels.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No hotels found for the provided destination.",
      });
    }

    const hotelIds = hotels
      .slice(0, 5)
      .map((hotel: any) => hotel.hotelId)
      .join(",");

    let offersResponse;
    try {
      offersResponse = await amadeus.shopping.hotelOffersSearch.get({
        hotelIds,
        checkInDate: checkIn,
        checkOutDate: checkout,
        adults: guestDetails.adults,
        children: guestDetails.children?.length || 0,
        roomQuantity: guestDetails.rooms,
        currency: "EUR",
      });
    } catch (err) {
      return res.status(502).json({
        success: false,
        message: "Failed to fetch hotel offers. Please try again later.",
      });
    }

    if (!offersResponse.data || offersResponse.data.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No hotel offers available for the selected dates.",
      });
    }

    const mappedHotels: HotelCard[] = offersResponse.data.map((offer: any) => {
      const hotelName = offer.hotel.name;
      const cityCode = offer.hotel.cityCode;

      const room = offer.offers[0].room;
      const roomCategory = room.typeEstimated.category || "Not specified";
      const bedInfo = `${room.typeEstimated.beds || "N/A"} ${
        room.typeEstimated.bedType || "Bed"
      }(s)`;
      const description = room.description?.text || "No description provided";

      const checkInDate = offer.offers[0].checkInDate;
      const checkOutDate = offer.offers[0].checkOutDate;

      const price = offer.offers[0].price.total;
      const currency = offer.offers[0].price.currency;

      const refundable =
        offer.offers[0].policies?.refundable?.cancellationRefund ===
        "REFUNDABLE_UP_TO_DEADLINE";

      const guests = offer.offers[0].guests?.adults || 1;

      return {
        hotelName,
        cityCode,
        roomCategory,
        bedInfo,
        description,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        price,
        currency,
        refundable,
        guests,
      };
    });

    try {
      await HotelModel.insertOne({
        user: req.body.user?.id,
        Destination: destination,
        CheckIn: checkIn,
        CheckOut: checkout,
        GuestDetails: guestDetails,
        RoomType: roomType || "",
      });
    } catch (err) {
      console.error("Database insert error:", err);
    }

    return res.status(200).json({
      success: true,
      data: mappedHotels,
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while processing hotel details.",
    });
  }
};

const getCarDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const parsed = carBookingValidator.safeParse(req.body);

    if (!parsed.success) {
      return errorParser(parsed, res);
    }

    const {
      pickUpLocation,
      pickUpDate,
      pickUpTime,
      dropOffLocation,
      dropOffDate,
      dropOffTime,
      returnToSameLocation,
      driverAge,
      vehicleType,
    } = parsed.data;

    if (DateTime.fromISO(pickUpTime) > DateTime.fromISO(dropOffTime)) {
      return res.status(400).json({
        success: false,
        message: "Check-in date must be before check-out date.",
      });
    }

    let availabilityResponse;
    try {
      let pickupDateTime: any = `${pickUpDate}T${pickUpTime}`;
      pickupDateTime = new Date(pickupDateTime).toISOString();
      let dropoffDateTime: any = `${dropOffDate}T${dropOffTime}`;
      dropoffDateTime = new Date(dropoffDateTime).toISOString();

      availabilityResponse = await amadeus.shopping.carRentals.search.get({
        pickupLocation: pickUpLocation,
        dropoffLocation: dropOffLocation,
        pickupDateTime: pickupDateTime,
        dropoffDateTime: dropoffDateTime,
      });
    } catch (err) {
      return res.status(502).json({
        success: false,
        message: "Failed to fetch hotel locations from external provider.",
      });
    }

    const availableCars = availabilityResponse.data;

    if (!availableCars || availableCars.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No hotels found for the provided destination.",
      });
    }

    return res.status(200).json(availableCars);
  } catch (error) {
    console.error("Unexpected error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while processing hotel details.",
    });
  }
};

export { getFlightDetails, getHotelDetails, getCarDetails };
