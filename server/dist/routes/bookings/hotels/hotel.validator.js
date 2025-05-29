"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hotelValidator = void 0;
const zod_1 = require("zod");
exports.hotelValidator = zod_1.z.object({
    destination: zod_1.z.string().min(3, "Must be at least 3 characters").max(100),
    checkIn: zod_1.z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
        message: "Check-in date must be in YYYY-MM-DD format",
    }),
    checkout: zod_1.z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
        message: "Checkout date must be in YYYY-MM-DD format",
    }),
    roomType: zod_1.z.string().optional(),
    guestDetails: zod_1.z.object({
        adults: zod_1.z.number().min(1, "At least 1 adult is required"),
        children: zod_1.z
            .array(zod_1.z.object({
            age: zod_1.z.number().min(0).max(17),
        }))
            .optional(),
        rooms: zod_1.z.number().min(1, "At least 1 room is required").default(1),
    }),
});
//# sourceMappingURL=hotel.validator.js.map