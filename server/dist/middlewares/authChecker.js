"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authParser = exports.authChecker = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authChecker = (req, res, next) => {
    try {
        const token = req.cookies?.accessToken;
        if (!token) {
            return next({ message: "Token is required", status: 404 });
        }
        const user = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.body.user = user;
        next();
    }
    catch (err) {
        next({ message: "Invalid or expired token", status: 401 });
    }
};
exports.authChecker = authChecker;
const authParser = (req, res, next) => {
    const token = req.cookies?.accessToken;
    if (!token) {
        return next();
    }
    try {
        const user = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.body.user = user;
    }
    catch (err) {
        return next();
    }
    next();
};
exports.authParser = authParser;
//# sourceMappingURL=authChecker.js.map