import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";
import compression from "compression";
import "dotenv/config";

import userRoutes from "./routes/userRoutes.js";
import flightRoutes from "./routes/flightRoutes.js";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

const port = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

const app = express();

app.use(cors());
app.use(compression());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//------------routes-------------
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/flights", flightRoutes);

//------------- Serve static files in production
if (process.env.NODE_ENV === "production") {
  // production mode
} else {
  app.get("/", (req, res) => {
    res.send("Hello, World!");
  });
}

//-------------------------------------
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
