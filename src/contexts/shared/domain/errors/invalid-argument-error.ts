import { BaseError } from "./base-error";

export class InvalidArgumentError extends BaseError {
  constructor(dependencies: {
    message: string;
    meta?: Record<string, unknown>;
  }) {
    super({
      ...dependencies,
      code: "error.domain.invalidArgument",
      isOperational: true,
    });
  }
}
