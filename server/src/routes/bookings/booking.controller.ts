import { Request, Response, NextFunction } from "express";

import { flightValidator } from "./flight.validator";
import { errorParser } from "../../utils/errorParser";
import { amadeus } from "../../utils/amadeus";
import { DateTime, Duration } from "luxon";
import { FlightModel } from "./flights.model";
import { hotelValidator } from "./hotel.validator";
import { HotelCard } from "../../types/flights";
import { HotelModel } from "./hotel.model";

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

    if (DateTime.fromISO(departureDate) > DateTime.fromISO(returnDate)) {
      return res.status(400).json({
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
        message: "Check in  date must be after Check out date",
      });
    }

    const hotelsResponse =
      await amadeus.referenceData.locations.hotels.byCity.get({
        cityCode: destination,
      });
    const hotels = hotelsResponse.data;

    const hotelIds = hotels
      .slice(0, 5)
      .map((hotel: any) => hotel.hotelId)
      .join(",");
    const offersResponse = await amadeus.shopping.hotelOffersSearch.get({
      hotelIds: hotelIds,
      checkInDate: checkIn,
      checkOutDate: checkout,
      adults: guestDetails.adults,
      children: guestDetails.children?.length || 0,
      roomQuantity: guestDetails.rooms,
      currency: "EUR",
    });

    const mappedHotels: HotelCard[] = offersResponse.data.map((offer: any) => {
      const hotelName: string = offer.hotel.name;
      const cityCode: string = offer.hotel.cityCode;

      const room = offer.offers[0].room;
      const roomCategory: string = room.typeEstimated.category;
      const bedInfo: string = `${room.typeEstimated.beds} ${room.typeEstimated.bedType} bed(s)`;
      const description: string = room.description.text;

      const checkIn: string = offer.offers[0].checkInDate;
      const checkOut: string = offer.offers[0].checkOutDate;

      const price: string = offer.offers[0].price.total;
      const currency: string = offer.offers[0].price.currency;

      const refundable: boolean =
        offer.offers[0].policies?.refundable?.cancellationRefund ===
        "REFUNDABLE_UP_TO_DEADLINE";

      const guests: number = offer.offers[0].guests.adults;

      return {
        hotelName,
        cityCode,
        roomCategory,
        bedInfo,
        description,
        checkIn,
        checkOut,
        price,
        currency,
        refundable,
        guests,
      };
    });

    const flightData = await HotelModel.insertOne({
      user: req.body.user?.id,
      Destination: destination,
      CheckIn: checkIn,
      CheckOut: checkout,
      GuestDetails: guestDetails,
      RoomType: roomType ? roomType : "",
    });

    return res.status(200).json(mappedHotels);
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while fetching hotel details.",
    });
  }
};

export { getFlightDetails, getHotelDetails };
