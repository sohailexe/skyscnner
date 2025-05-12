import { Response } from "express";

export const errorParser = (parsed: any, res: Response) => {
  const fieldErrors = parsed.error.flatten().fieldErrors;

  const errorMessages = Object.entries(fieldErrors)
    .map(([field, messages]: any) => `${field}: ${messages?.join(", ")}`)
    .join(" | ");

  return res.status(400).json({
    message: errorMessages,
  });
};
