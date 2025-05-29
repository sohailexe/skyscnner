"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingRouter = void 0;
const express_1 = require("express");
const authChecker_1 = require("../../middlewares/authChecker");
const booking_controller_1 = require("./booking.controller");
const asyncHandler_1 = require("../../utils/asyncHandler");
const router = (0, express_1.Router)();
exports.bookingRouter = router;
router.use(authChecker_1.authParser);
router.post("/flight/unified-details", (0, asyncHandler_1.asyncHandler)(booking_controller_1.getFlightDetails));
router.post("/hotel/unified-details", (0, asyncHandler_1.asyncHandler)(booking_controller_1.getHotelDetails));
router.post("/car/unified-details", (0, asyncHandler_1.asyncHandler)(booking_controller_1.getCarDetails));
//# sourceMappingURL=booking.routes.js.map