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

const router = Router();

router.post("/sendOtp", existedUser, sendOtpController);
router.post("/register", existedUser, registerController);
router.post("/login", loginController);
router.get("/", authChecker, getUserInfoController);
router.post("/logout", logoutController);

export { router as userRouter };
