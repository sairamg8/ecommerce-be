import { AppError, ValidationError } from "@/utils/AppError";
import { NextFunction, Request, Response } from "express";

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err?.statusCode || 500;
  const message = err?.message || "Something went wrong";

  const isDevelopment = process.env.NODE_ENV !== "production";

  console.log(
    "=========================== From Error Handler ==============================",
    err,
    "=========================== From Error Handler =============================="
  );

  res.status(statusCode).json({
    success: false,
    message: message,
    ...(err instanceof ValidationError && { errors: err.errors }),
    ...(isDevelopment && { stack: err.stack }),
  });
};
