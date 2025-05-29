"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarBookingModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const CarBookingSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
            validator: function (value) {
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
            validator: function (value) {
                return value >= this.pickUpDate;
            },
            message: "Drop-off date must be after or equal to pick-up date.",
        },
    },
    dropOffTime: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
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
}, {
    timestamps: true,
});
exports.CarBookingModel = (0, mongoose_1.model)("CarBooking", CarBookingSchema);
//# sourceMappingURL=car.model.js.map