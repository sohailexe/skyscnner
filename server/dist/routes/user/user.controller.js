"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutController = exports.getUserInfoController = exports.sendOtpController = exports.registerController = exports.loginController = void 0;
const otp_generator_1 = __importDefault(require("otp-generator"));
const otp_model_1 = require("./otp.model");
const mailSender_1 = require("../../utils/mailSender");
const user_model_1 = require("./user.model");
const refeshAccessTokenGeneratore_1 = require("../../utils/refeshAccessTokenGeneratore");
const sendOtpController = async (req, res, next) => {
    try {
        const { username, email, password, gender } = req.body;
        if (!username || !email || !password || !gender) {
            return next({
                message: "All fields are required: username, email, password, gender",
                status: 400,
            });
        }
        const otp = otp_generator_1.default.generate(6, {
            digits: true,
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false,
        });
        let createdOtp;
        try {
            createdOtp = await otp_model_1.Otp.create({ email, otp });
        }
        catch (otpErr) {
            return next({
                message: "Failed to generate OTP. Please try again.",
                status: 500,
            });
        }
        try {
            await (0, mailSender_1.mailSender)(email, otp);
        }
        catch (mailErr) {
            await otp_model_1.Otp.deleteOne({ _id: createdOtp._id });
            return next({
                message: "Failed to send OTP email. Please try again.",
                status: 500,
            });
        }
        try {
            await user_model_1.User.create({ username, email, password, gender });
        }
        catch (userErr) {
            await otp_model_1.Otp.deleteOne({ _id: createdOtp._id });
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
    }
    catch (err) {
        console.error("Unexpected error in sendOtpController:", err);
        next({
            message: "Internal server error",
            status: 500,
        });
    }
};
exports.sendOtpController = sendOtpController;
const registerController = async (req, res, next) => {
    try {
        const { email, otp } = req.body;
        if (!email || !otp) {
            return next({
                message: "Please fill all the fields",
                status: 400,
            });
        }
        const realOtp = await otp_model_1.Otp.findOne({ email, otp });
        if (!realOtp) {
            return next({ message: "Incorrect OTP", status: 400 });
        }
        await user_model_1.User.findOneAndUpdate({ email }, { isVerified: true });
        res.status(201).json({ message: "User verified successfully" });
    }
    catch (err) {
        console.error("Error during OTP verification:", err);
        next({
            message: "Something went wrong during OTP verification",
            status: 500,
        });
    }
};
exports.registerController = registerController;
// Login Controller
const loginController = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return next({ message: "Please fill all the fields", status: 400 });
        }
        const user = await user_model_1.User.findOne({ email }).select("+password");
        if (!user) {
            return next({ message: "User not found", status: 404 });
        }
        const isCorrectPassword = await user.isPasswordCorrect(password);
        if (!isCorrectPassword) {
            return next({ message: "Incorrect Password", status: 400 });
        }
        const { refreshToken, accessToken } = await (0, refeshAccessTokenGeneratore_1.generateAccessAndRefereshTokens)(user._id);
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
    }
    catch (err) {
        console.error("Login error:", err);
        next({
            message: "Something went wrong during login",
            status: 500,
        });
    }
};
exports.loginController = loginController;
// Fetch User Info Controller
const getUserInfoController = async (req, res, next) => {
    try {
        const user = req.body.user;
        res.status(200).json({ user, message: "User info fetched successfully" });
    }
    catch (err) {
        console.error("Error fetching user info:", err);
        next({
            message: "Something went wrong fetching user info",
            status: 500,
        });
    }
};
exports.getUserInfoController = getUserInfoController;
// Logout Controller
const logoutController = async (req, res) => {
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
    }
    catch (err) {
        console.error("Logout error:", err);
        res.status(500).json({ message: "Something went wrong during logout" });
    }
};
exports.logoutController = logoutController;
//# sourceMappingURL=user.controller.js.map