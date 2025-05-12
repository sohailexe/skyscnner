import { Router } from "express";
import { authParser } from "../../middlewares/authChecker";
import { getFlightDetails, getHotelDetails } from "./booking.controller";

import { asyncHandler } from "../../utils/asyncHandler";

const router = Router();

router.use(authParser);

router.post("/flight/unified-details", asyncHandler(getFlightDetails));
router.post("/hotel/unified-details", asyncHandler(getHotelDetails));

export { router as bookingRouter };
