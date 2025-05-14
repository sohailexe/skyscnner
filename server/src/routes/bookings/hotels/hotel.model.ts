import mongoose, { Schema, Document, model } from "mongoose";

interface Child {
  age: number;
}

interface Guest {
  adults: number;
  children: Child[];
  rooms: number;
}

interface HotelDocument extends Document {
  Destination: string;
  CheckIn: Date;
  CheckOut: Date;
  RoomType?: string;
  GuestDetails: Guest;
  createdAt: Date;
  updatedAt: Date;
  user?: mongoose.Types.ObjectId;
}

const childSchema = new Schema<Child>(
  {
    age: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false }
);

const guestSchema = new Schema<Guest>(
  {
    adults: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },
    children: {
      type: [childSchema],
      default: [],
    },
    rooms: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },
  },
  { _id: false }
);

const HotelSchema = new Schema<HotelDocument>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    Destination: {
      type: String,
      required: true,
      trim: true,
    },
    CheckIn: {
      type: Date,
      required: true,
    },
    CheckOut: {
      type: Date,
      required: true,
      validate: {
        validator: function (this: HotelDocument, value: Date) {
          return value >= this.CheckIn;
        },
        message: "Checkout date must be after or equal to check-in date.",
      },
    },
    RoomType: {
      type: String,
      required: false,
    },
    GuestDetails: {
      type: guestSchema,
      default: {
        adults: 1,
        children: [],
        rooms: 1,
      },
    },
  },
  {
    timestamps: true,
  }
);

export const HotelModel = model<HotelDocument>("Hotel", HotelSchema);
