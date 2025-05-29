"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardRouter = void 0;
const express_1 = require("express");
const asyncHandler_1 = require("../../utils/asyncHandler");
const dashboard_controller_1 = require("./dashboard.controller");
const dashboard_middleware_1 = require("./dashboard.middleware");
const router = (0, express_1.Router)();
exports.dashboardRouter = router;
router.post("/admin-auth", (0, asyncHandler_1.asyncHandler)(dashboard_controller_1.authenticateAdmin));
router.use(dashboard_middleware_1.isAdmin);
router.get("/admin-checker", (0, asyncHandler_1.asyncHandler)(dashboard_controller_1.adminChcker));
router.get("/get-user-details", (0, asyncHandler_1.asyncHandler)(dashboard_controller_1.getAllUsers));
router.get("/get-flight-search", (0, asyncHandler_1.asyncHandler)(dashboard_controller_1.getFlightSearch));
router.get("/get-hotel-booking-search", (0, asyncHandler_1.asyncHandler)(dashboard_controller_1.getHotelBookingSearch));
router.get("/get-car-booking-search", (0, asyncHandler_1.asyncHandler)(dashboard_controller_1.getCarBookingSearch));
//# sourceMappingURL=dashboard.routes.js.map