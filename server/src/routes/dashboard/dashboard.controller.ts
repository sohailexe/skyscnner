import { Request, Response } from "express";
import { User } from "../user/user.model";
import { FlightModel } from "../bookings/flights/flights.model";
import { HotelModel } from "../bookings/hotels/hotel.model";
import { CarBookingModel } from "../bookings/car/car.model";
import jwt from "jsonwebtoken";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select("-password -refreshToken");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users", error: err });
  }
};

const adminChcker = async (req: Request, res: Response) => {
  return res.status(200).json({ message: "Auhtenticate as admin" });
};
const getFlightSearch = async (req: Request, res: Response) => {
  try {
    const flightSearchs = await FlightModel.find({}).populate({
      path: "user",
      select: "username email gender isVerified",
      strictPopulate: false,
    });

    res.status(200).json(flightSearchs);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users", error: err });
  }
};
const getHotelBookingSearch = async (req: Request, res: Response) => {
  try {
    const hotelSearch = await HotelModel.find({}).populate({
      path: "user",
      select: "username email gender isVerified",
      strictPopulate: false,
    });

    res.status(200).json(hotelSearch);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users", error: err });
  }
};

const getCarBookingSearch = async (req: Request, res: Response) => {
  try {
    const carSearch = await CarBookingModel.find({}).populate({
      path: "user",
      select: "username email gender isVerified",
      strictPopulate: false,
    });

    res.status(200).json(carSearch);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users", error: err });
  }
};

const authenticateAdmin = async (req: Request, res: Response) => {
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

    const token = jwt.sign(
      {
        role: "admin",
        email: process.env.ADMIN_EMAIL,
      },
      tokenSecret,
      { expiresIn: "30min" }
    );

    res
      .status(200)
      .cookie("adminToken", token, {
        secure: true,
        httpOnly: true,
        sameSite: "none",
      })
      .json({ message: "Admin authenticated" });
  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export {
  getAllUsers,
  getFlightSearch,
  getHotelBookingSearch,
  getCarBookingSearch,
  authenticateAdmin,
  adminChcker,
};
