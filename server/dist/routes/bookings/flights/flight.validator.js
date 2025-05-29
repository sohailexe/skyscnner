"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flightValidator = void 0;
const zod_1 = require("zod");
const luxon_1 = require("luxon");
exports.flightValidator = zod_1.z.object({
    fromLocation: zod_1.z.string().min(3).max(3),
    toLocation: zod_1.z.string().min(3).max(3),
    departureDate: zod_1.z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    returnDate: zod_1.z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    traverlerDetails: zod_1.z.object({
        adults: zod_1.z.number().min(1),
        children: zod_1.z
            .array(zod_1.z.object({
            age: zod_1.z.number().min(0).max(17),
        }))
            .optional(),
    }),
    userTimezone: zod_1.z
        .string()
        .refine((tz) => luxon_1.DateTime.local().setZone(tz).isValid, {
        message: 'Invalid timezone. Must be a valid IANA timezone like "Asia/Karachi".',
    }),
});
//# sourceMappingURL=flight.validator.js.map