import { Request, Response, NextFunction } from "express";

export type RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => void | Promise<void>;

export type ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => void;

export type TypedRequestHandler<
  TBody = unknown,
  TParams = unknown,
  TQuery = unknown
> = (
  req: Request<TParams, unknown, TBody, TQuery>,
  res: Response,
  next: NextFunction
) => void | Promise<void>;
