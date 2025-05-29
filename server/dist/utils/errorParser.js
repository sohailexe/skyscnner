"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorParser = void 0;
const errorParser = (parsed, res) => {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    const errorMessages = Object.entries(fieldErrors)
        .map(([field, messages]) => `${field}: ${messages?.join(", ")}`)
        .join(" | ");
    return res.status(400).json({
        message: errorMessages,
    });
};
exports.errorParser = errorParser;
//# sourceMappingURL=errorParser.js.map