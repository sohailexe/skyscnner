import mongoose, { Schema, Document, model } from "mongoose";

interface CarBookingDocument extends Document {
  pickUpLocation: string;
  pickUpDate: Date;
  pickUpTime: string;
  dropOffLocation: string;
  dropOffDate: Date;
  dropOffTime: string;
  returnToSameLocation: boolean;
  user?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const CarBookingSchema = new Schema<CarBookingDocument>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    pickUpLocation: {
      type: String,
      required: true,
      trim: true,
    },
    pickUpDate: {
      type: Date,
      required: true,
    },
    pickUpTime: {
      type: String,
      required: true,
      validate: {
        validator: function (value: string) {
          return /^([01]\d|2[0-3]):([0-5]\d)$/.test(value);
        },
        message: "Pickup time must be in HH:mm format.",
      },
    },
    dropOffLocation: {
      type: String,
      required: true,
      trim: true,
    },
    dropOffDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (this: CarBookingDocument, value: Date) {
          return value >= this.pickUpDate;
        },
        message: "Drop-off date must be after or equal to pick-up date.",
      },
    },
    dropOffTime: {
      type: String,
      required: true,
      validate: {
        validator: function (value: string) {
          return /^([01]\d|2[0-3]):([0-5]\d)$/.test(value);
        },
        message: "Drop-off time must be in HH:mm format.",
      },
    },
    returnToSameLocation: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const CarBookingModel = model<CarBookingDocument>(
  "CarBooking",
  CarBookingSchema
);
