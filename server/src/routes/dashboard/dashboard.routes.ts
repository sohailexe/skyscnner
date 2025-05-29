import { Router } from "express";

import { asyncHandler } from "../../utils/asyncHandler";
import {
  adminChcker,
  authenticateAdmin,
  getAllUsers,
  getCarBookingSearch,
  getFlightSearch,
  getHotelBookingSearch,
} from "./dashboard.controller";
import { isAdmin } from "./dashboard.middleware";

const router = Router();

router.post("/admin-auth", asyncHandler(authenticateAdmin));
router.use(isAdmin);
router.get("/admin-checker", asyncHandler(adminChcker));
router.get("/get-user-details", asyncHandler(getAllUsers));
router.get("/get-flight-search", asyncHandler(getFlightSearch));
router.get("/get-hotel-booking-search", asyncHandler(getHotelBookingSearch));
router.get("/get-car-booking-search", asyncHandler(getCarBookingSearch));

export { router as dashboardRouter };
