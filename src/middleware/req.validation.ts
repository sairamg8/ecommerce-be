import { ValidationError } from "@/utils/AppError";
import { NextFunction, Request, Response } from "express";
import { ZodError, ZodObject } from "zod";

export const validate = (schema: ZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const transformedErrors = error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        }));
        throw new ValidationError(
          "Auth Validation Failed11111",
          "ZODError",
          transformedErrors
        );
      }

      throw new ValidationError("Auth Validation Failed");
    }
  };
};
