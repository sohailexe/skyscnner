"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const user_middleware_1 = require("./user.middleware");
const authChecker_1 = require("../../middlewares/authChecker");
const user_controller_1 = require("./user.controller");
const asyncHandler_1 = require("../../utils/asyncHandler");
const router = (0, express_1.Router)();
exports.userRouter = router;
router.post("/sendOtp", user_middleware_1.existedUser, (0, asyncHandler_1.asyncHandler)(user_controller_1.sendOtpController));
router.post("/register", user_middleware_1.existedUser, (0, asyncHandler_1.asyncHandler)(user_controller_1.registerController));
router.post("/login", (0, asyncHandler_1.asyncHandler)(user_controller_1.loginController));
router.get("/", authChecker_1.authChecker, (0, asyncHandler_1.asyncHandler)(user_controller_1.getUserInfoController));
router.post("/logout", (0, asyncHandler_1.asyncHandler)(user_controller_1.logoutController));
//# sourceMappingURL=user.routes.js.map