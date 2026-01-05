export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly data?: unknown;
  public readonly name: string = "UNKNOWN";

  constructor(
    message: string,
    statusCode = 500,
    name: string = "UNKNOWN",
    data?: unknown
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    this.data = data;
    this.name = name;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequestError extends AppError {
  constructor(
    message: string = "Bad Request",
    info?: {
      name: string;
      data?: unknown;
    }
  ) {
    super(message, 400, info?.name, info?.data);
  }
}

export class UnauthorizedError extends AppError {
  constructor(
    message: string = "Unauthorized",
    name = "unknown",
    data?: unknown
  ) {
    super(message, 401, name, data);
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = "Forbidden", name = "unknown", data?: unknown) {
    super(message, 403, name, data);
  }
}

export class NotFoundError extends AppError {
  constructor(
    message: string = "Resource not found",
    name = "unknown",
    data?: unknown
  ) {
    super(message, 404, name, data);
  }
}

export class ConflictError extends AppError {
  constructor(message: string = "Conflict", name = "unknown", data?: unknown) {
    super(message, 409, name, data);
  }
}

export class ValidationError extends AppError {
  constructor(
    message: string = "Validation failed",
    name = "unknown",
    data?: unknown
  ) {
    super(message, 422, name, data);
  }
}
