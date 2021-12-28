import { BaseError } from "../../../../contexts/shared/domain/errors/base-error";

export class HttpError extends BaseError {
  readonly status: number;

  constructor(dependencies: {
    message: string;
    code: string;
    status: number;
    meta?: Record<string, unknown>;
  }) {
    super({
      ...dependencies,
      isOperational: true,
    });
    this.status = dependencies.status;
  }
}
