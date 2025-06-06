import { NextFunction, Request, Response } from "express";

import jwt from "jsonwebtoken";

export const authChecker = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies?.accessToken;

    if (!token) {
      return next({ message: "Token is required", status: 404 });
    }

    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
    req.body.user = user;

    next();
  } catch (err) {
    next({ message: "Invalid or expired token", status: 401 });
  }
};

export const authParser = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.accessToken;

  if (!token) {
    return next();
  }

  try {
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
    req.body.user = user;
  } catch (err) {
    return next();
  }
  next();
};
