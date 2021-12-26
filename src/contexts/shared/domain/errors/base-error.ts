export class BaseError extends Error {
  code;
  meta?;
  status?;
  isOperational;

  constructor(dependencies: {
    message: string;
    isOperational?: boolean;
    status?: number;
    code?: string;
    meta?: Record<string, unknown>;
  }) {
    super(dependencies.message);

    this.status = dependencies.status;
    this.isOperational = dependencies.isOperational || false;
    this.code = dependencies.code ?? "error.unexpected";
    this.meta = dependencies.meta;
    this.name = this.constructor.name;

    Error.captureStackTrace(this, this.constructor);
  }
}
