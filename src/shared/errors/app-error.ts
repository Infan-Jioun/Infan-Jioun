export type ErrorCode =
  | "VALIDATION_ERROR"
  | "DATABASE_ERROR"
  | "AI_SERVICE_ERROR"
  | "NOT_FOUND"
  | "INTERNAL_ERROR";

export class AppError extends Error {
  public readonly code: ErrorCode;
  public readonly details?: unknown;

  constructor(message: string, code: ErrorCode, details?: unknown) {
    super(message);
    this.name = "AppError";
    this.code = code;
    this.details = details;
    Object.setPrototypeOf(this, new.target.prototype);
  }

  public static validation(message: string, details?: unknown): AppError {
    return new AppError(message, "VALIDATION_ERROR", details);
  }

  public static database(message: string, details?: unknown): AppError {
    return new AppError(message, "DATABASE_ERROR", details);
  }

  public static aiService(message: string, details?: unknown): AppError {
    return new AppError(message, "AI_SERVICE_ERROR", details);
  }

  public static notFound(message: string, details?: unknown): AppError {
    return new AppError(message, "NOT_FOUND", details);
  }

  public static internal(message: string, details?: unknown): AppError {
    return new AppError(message, "INTERNAL_ERROR", details);
  }
}

