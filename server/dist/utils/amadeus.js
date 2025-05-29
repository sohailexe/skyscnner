"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCityCode = exports.amadeus = void 0;
const amadeus_1 = __importDefault(require("amadeus"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.amadeus = new amadeus_1.default({
    clientId: process.env.AMADEUS_API_KEY,
    clientSecret: process.env.AMADEUS_API_SECRET,
});
const getCityCode = async (city) => {
    try {
        const response = await exports.amadeus.referenceData.locations.get({
            keyword: city,
            subType: "CITY",
        });
        const results = response.data.map((item) => ({
            cityName: item.address.cityName,
            iataCode: item.iataCode,
            country: item.address.countryName,
        }));
        return results;
    }
    catch (err) {
        console.error("Error fetching city:", err.response?.data || err.message);
        return [];
    }
};
exports.getCityCode = getCityCode;
//# sourceMappingURL=amadeus.js.map