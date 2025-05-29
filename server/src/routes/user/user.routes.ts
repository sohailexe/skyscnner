import { Router } from "express";
import { existedUser } from "./user.middleware";
import { authChecker } from "../../middlewares/authChecker";

import {
  getUserInfoController,
  loginController,
  logoutController,
  registerController,
  sendOtpController,
} from "./user.controller";
import { asyncHandler } from "../../utils/asyncHandler";

const router = Router();

router.post("/sendOtp", existedUser, asyncHandler(sendOtpController));
router.post("/register", existedUser, asyncHandler(registerController));
router.post("/login", asyncHandler(loginController));
router.get("/", authChecker, asyncHandler(getUserInfoController));
router.post("/logout", asyncHandler(logoutController));

export { router as userRouter };
