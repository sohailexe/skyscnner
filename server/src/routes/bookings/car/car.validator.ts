import { z } from "zod";

// Time regex for HH:mm (24-hour format)
const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

export const carBookingValidator = z.object({
  pickUpLocation: z.string().trim().min(1, "Pick-up location is required."),

  pickUpDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Pick-up date must be a valid ISO date.",
  }),

  pickUpTime: z
    .string()
    .regex(timeRegex, "Pick-up time must be in HH:mm format (24-hour)."),

  dropOffLocation: z.string().trim().min(1, "Drop-off location is required."),

  dropOffDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Drop-off date must be a valid ISO date.",
  }),

  dropOffTime: z
    .string()
    .regex(timeRegex, "Drop-off time must be in HH:mm format (24-hour)."),

  returnToSameLocation: z.boolean(),
});
