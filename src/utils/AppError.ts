export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly data?: unknown;

  constructor(message: string, statusCode = 500, data?: unknown) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    this.data = data;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequestError extends AppError {
  constructor(message: string = "Bad Request", data?: unknown) {
    super(message, 400, data);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = "Unauthorized", data?: unknown) {
    super(message, 401, data);
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = "Forbidden", data?: unknown) {
    super(message, 403, data);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = "Resource not found", data?: unknown) {
    super(message, 404, data);
  }
}

export class ConflictError extends AppError {
  constructor(message: string = "Conflict", data?: unknown) {
    super(message, 409, data);
  }
}

export class ValidationError extends AppError {
  constructor(message: string = "Validation failed", data?: unknown) {
    super(message, 422, data);
  }
}
