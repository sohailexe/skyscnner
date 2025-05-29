import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";

import otpGenerator from "otp-generator";
import { Otp } from "./otp.model";
import { mailSender } from "../../utils/mailSender";
import { User } from "./user.model";
import { generateAccessAndRefereshTokens } from "../../utils/refeshAccessTokenGeneratore";

const sendOtpController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, email, password, gender } = req.body;

    if (!username || !email || !password || !gender) {
      return next({
        message: "All fields are required: username, email, password, gender",
        status: 400,
      });
    }

    const otp = otpGenerator.generate(6, {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    let createdOtp;
    try {
      createdOtp = await Otp.create({ email, otp });
    } catch (otpErr) {
      return next({
        message: "Failed to generate OTP. Please try again.",
        status: 500,
      });
    }

    try {
      await mailSender(email, otp);
    } catch (mailErr) {
      await Otp.deleteOne({ _id: createdOtp._id });
      return next({
        message: "Failed to send OTP email. Please try again.",
        status: 500,
      });
    }

    try {
      await User.create({ username, email, password, gender });
    } catch (userErr: any) {
      await Otp.deleteOne({ _id: createdOtp._id });
      if (userErr.code === 11000) {
        return next({
          message: "Email or Username already registered",
          status: 409,
        });
      }

      return next({
        message: "Failed to create user. Please try again later.",
        status: 500,
      });
    }

    res.status(201).json({
      message: "OTP sent successfully. Please verify your email.",
    });
  } catch (err) {
    console.error("Unexpected error in sendOtpController:", err);
    next({
      message: "Internal server error",
      status: 500,
    });
  }
};

const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return next({
        message: "Please fill all the fields",
        status: 400,
      });
    }

    const realOtp = await Otp.findOne({ email, otp });

    if (!realOtp) {
      return next({ message: "Incorrect OTP", status: 400 });
    }

    await User.findOneAndUpdate({ email }, { isVerified: true });

    res.status(201).json({ message: "User verified successfully" });
  } catch (err) {
    console.error("Error during OTP verification:", err);
    next({
      message: "Something went wrong during OTP verification",
      status: 500,
    });
  }
};

// Login Controller
const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next({ message: "Please fill all the fields", status: 400 });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next({ message: "User not found", status: 404 });
    }

    const isCorrectPassword = await user.isPasswordCorrect(password);

    if (!isCorrectPassword) {
      return next({ message: "Incorrect Password", status: 400 });
    }

    const { refreshToken, accessToken } = await generateAccessAndRefereshTokens(
      user._id
    );

    res
      .status(200)
      .cookie("refreshToken", refreshToken, {
        secure: true,
        httpOnly: true,
        sameSite: "none",
      })
      .cookie("accessToken", accessToken, {
        secure: true,
        httpOnly: true,
        sameSite: "none",
      })
      .json({ message: "User logged in successfully" });
  } catch (err) {
    console.error("Login error:", err);
    next({
      message: "Something went wrong during login",
      status: 500,
    });
  }
};

// Fetch User Info Controller
const getUserInfoController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.body.user;

    res.status(200).json({ user, message: "User info fetched successfully" });
  } catch (err) {
    console.error("Error fetching user info:", err);
    next({
      message: "Something went wrong fetching user info",
      status: 500,
    });
  }
};

// Logout Controller
const logoutController = async (req: Request, res: Response) => {
  try {
    res
      .clearCookie("accessToken", {
        secure: true,
        httpOnly: true,
        sameSite: "none",
      })
      .clearCookie("refreshToken", {
        secure: true,
        httpOnly: true,
        sameSite: "none",
      })
      .json({ message: "User logged out successfully" });
  } catch (err) {
    console.error("Logout error:", err);
    res.status(500).json({ message: "Something went wrong during logout" });
  }
};

export {
  loginController,
  registerController,
  sendOtpController,
  getUserInfoController,
  logoutController,
};
