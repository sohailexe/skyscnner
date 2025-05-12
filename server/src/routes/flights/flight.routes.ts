import { Router } from "express";
import { authParser } from "../../middlewares/authChecker";
import { getFlightDetails } from "./flight.controller";

import { asyncHandler } from "../../utils/asyncHandler";

const router = Router();

router.use(authParser);

router.post("/unified-flight-details", asyncHandler(getFlightDetails));

export { router as flightRouter };
