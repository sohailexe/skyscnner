import { z } from "zod";
import { DateTime } from "luxon";

export const flightValidator = z.object({
  fromLocation: z.string().min(3).max(3),
  toLocation: z.string().min(3).max(3),
  departureDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  returnDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
  traverlerDetails: z.object({
    adults: z.number().min(1),
    children: z
      .array(
        z.object({
          age: z.number().min(0).max(17),
        })
      )
      .optional(),
  }),
  userTimezone: z
    .string()
    .refine((tz) => DateTime.local().setZone(tz).isValid, {
      message:
        'Invalid timezone. Must be a valid IANA timezone like "Asia/Karachi".',
    }),
});
