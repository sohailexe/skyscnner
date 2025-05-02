import { Schema, model } from "mongoose";

const otpSchema = new Schema(
  {
    otp: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 60 * 5,
    },
  },
  { timestamps: true }
);

export const Otp = model("Otp", otpSchema);
