import { z } from "zod";
import { DateTime } from "luxon";

export const hotelValidator = z.object({
  destination: z.string().min(3, "Must be at least 3 characters").max(100),
  checkIn: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: "Check-in date must be in YYYY-MM-DD format",
  }),
  checkout: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: "Checkout date must be in YYYY-MM-DD format",
  }),
  roomType: z.string().optional(),
  guestDetails: z.object({
    adults: z.number().min(1, "At least 1 adult is required"),
    children: z
      .array(
        z.object({
          age: z.number().min(0).max(17),
        })
      )
      .optional(),
    rooms: z.number().min(1, "At least 1 room is required").default(1),
  }),
  userTimezone: z
    .string()
    .refine((tz) => DateTime.local().setZone(tz).isValid, {
      message:
        'Invalid timezone. Use a valid IANA timezone like "Europe/Berlin".',
    }),
});
