import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function isAdmin(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.adminToken;

  if (!token) {
    return res.status(401).json({ message: "Admin token not found" });
  }

  try {
    const decoded = jwt.verify(token, process.env.ADMIN_TOKEN_SECRET!) as {
      role: string;
      email: string;
    };

    if (decoded.role !== "admin" || decoded.email !== process.env.ADMIN_EMAIL) {
      return res.status(403).json({ message: "Forbidden: Not an admin" });
    }

    next();
  } catch (err) {
    console.error("JWT verification failed:", err);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
}
