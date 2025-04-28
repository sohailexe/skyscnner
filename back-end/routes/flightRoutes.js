import express from "express";
import { getFlights } from "../controllers/flightController.js";

const router = express.Router();

// Example: /api/flights?origin=SYD&destination=BKK&date=2025-06-01&adults=2
router.get("/", getFlights);

export default router;
