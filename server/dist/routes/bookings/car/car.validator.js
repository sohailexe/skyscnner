"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.carBookingValidator = void 0;
const zod_1 = require("zod");
// Time regex for HH:mm (24-hour format)
const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
exports.carBookingValidator = zod_1.z.object({
    pickUpLocation: zod_1.z.string().trim().min(1, "Pick-up location is required."),
    pickUpDate: zod_1.z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Pick-up date must be a valid ISO date.",
    }),
    pickUpTime: zod_1.z
        .string()
        .regex(timeRegex, "Pick-up time must be in HH:mm format (24-hour)."),
    dropOffLocation: zod_1.z.string().trim().min(1, "Drop-off location is required."),
    dropOffDate: zod_1.z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Drop-off date must be a valid ISO date.",
    }),
    dropOffTime: zod_1.z
        .string()
        .regex(timeRegex, "Drop-off time must be in HH:mm format (24-hour)."),
    returnToSameLocation: zod_1.z.boolean(),
});
//# sourceMappingURL=car.validator.js.map