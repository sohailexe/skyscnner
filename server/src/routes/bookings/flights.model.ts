import mongoose, { Schema, Document, model } from "mongoose";

interface Child {
  age: number;
}

interface Traveler {
  adults: number;
  children: Child[];
}

interface FlightDocument extends Document {
  From: string;
  To: string;
  DepartureDate: Date;
  ReturnDate: Date;
  TravelerDetails: Traveler;
  createdAt: Date;
  updatedAt: Date;
  user: mongoose.Types.ObjectId;
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

const travelerSchema = new Schema<Traveler>(
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
  },
  { _id: false }
);

const FlightSchema = new Schema<FlightDocument>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    From: {
      type: String,
      required: true,
      trim: true,
    },
    To: {
      type: String,
      required: true,
      trim: true,
    },
    DepartureDate: {
      type: Date,
      required: true,
    },
    ReturnDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (this: FlightDocument, value: Date) {
          return value >= this.DepartureDate;
        },
        message: "Return date must be after or equal to departure date.",
      },
    },
    TravelerDetails: {
      type: travelerSchema,
      default: {
        adults: 1,
        children: [],
      },
    },
  },
  {
    timestamps: true,
  }
);

export const FlightModel = model<FlightDocument>("Flight", FlightSchema);
