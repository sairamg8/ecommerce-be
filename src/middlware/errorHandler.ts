import { AppError } from "@/types";
import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err?.statusCode || 500;
  const message = err?.message || "Something went wrong";

  const isDevelopment = process.env.NODE_ENV !== "production";

  console.log(err);

  res.status(statusCode).json({
    success: false,
    message: err.message,
    ...(isDevelopment && { stack: err.stack }),
  });
};
