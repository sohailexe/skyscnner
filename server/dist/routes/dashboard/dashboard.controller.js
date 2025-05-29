"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminChcker = exports.authenticateAdmin = exports.getCarBookingSearch = exports.getHotelBookingSearch = exports.getFlightSearch = exports.getAllUsers = void 0;
const user_model_1 = require("../user/user.model");
const flights_model_1 = require("../bookings/flights/flights.model");
const hotel_model_1 = require("../bookings/hotels/hotel.model");
const car_model_1 = require("../bookings/car/car.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getAllUsers = async (req, res) => {
    try {
        const users = await user_model_1.User.find().select("-password -refreshToken");
        res.status(200).json(users);
    }
    catch (err) {
        res.status(500).json({ message: "Failed to fetch users", error: err });
    }
};
exports.getAllUsers = getAllUsers;
const adminChcker = async (req, res) => {
    return res.status(200).json({ message: "Auhtenticate as admin" });
};
exports.adminChcker = adminChcker;
const getFlightSearch = async (req, res) => {
    try {
        const flightSearchs = await flights_model_1.FlightModel.find({}).populate({
            path: "user",
            select: "username email gender isVerified",
            strictPopulate: false,
        });
        res.status(200).json(flightSearchs);
    }
    catch (err) {
        res.status(500).json({ message: "Failed to fetch users", error: err });
    }
};
exports.getFlightSearch = getFlightSearch;
const getHotelBookingSearch = async (req, res) => {
    try {
        const hotelSearch = await hotel_model_1.HotelModel.find({}).populate({
            path: "user",
            select: "username email gender isVerified",
            strictPopulate: false,
        });
        res.status(200).json(hotelSearch);
    }
    catch (err) {
        res.status(500).json({ message: "Failed to fetch users", error: err });
    }
};
exports.getHotelBookingSearch = getHotelBookingSearch;
const getCarBookingSearch = async (req, res) => {
    try {
        const carSearch = await car_model_1.CarBookingModel.find({}).populate({
            path: "user",
            select: "username email gender isVerified",
            strictPopulate: false,
        });
        res.status(200).json(carSearch);
    }
    catch (err) {
        res.status(500).json({ message: "Failed to fetch users", error: err });
    }
};
exports.getCarBookingSearch = getCarBookingSearch;
const authenticateAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res
                .status(400)
                .json({ message: "Email and password are required" });
        }
        const validEmail = process.env.ADMIN_EMAIL;
        const validPassword = process.env.ADMIN_PASSWORD;
        const tokenSecret = process.env.ADMIN_TOKEN_SECRET;
        if (!validEmail || !validPassword || !tokenSecret) {
            return res.status(500).json({ message: "Server configuration error" });
        }
        if (email !== validEmail || password !== validPassword) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = jsonwebtoken_1.default.sign({
            role: "admin",
            email: process.env.ADMIN_EMAIL,
        }, tokenSecret, { expiresIn: "30min" });
        res
            .status(200)
            .cookie("adminToken", token, {
            secure: true,
            httpOnly: true,
            sameSite: "none",
        })
            .json({ message: "Admin authenticated" });
    }
    catch (error) {
        console.error("Admin login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.authenticateAdmin = authenticateAdmin;
//# sourceMappingURL=dashboard.controller.js.map