"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = isAdmin;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function isAdmin(req, res, next) {
    const token = req.cookies.adminToken;
    if (!token) {
        return res.status(401).json({ message: "Admin token not found" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.ADMIN_TOKEN_SECRET);
        if (decoded.role !== "admin" || decoded.email !== process.env.ADMIN_EMAIL) {
            return res.status(403).json({ message: "Forbidden: Not an admin" });
        }
        next();
    }
    catch (err) {
        console.error("JWT verification failed:", err);
        return res.status(403).json({ message: "Invalid or expired token" });
    }
}
//# sourceMappingURL=dashboard.middleware.js.map