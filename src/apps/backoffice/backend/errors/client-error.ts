import { HttpError } from "./http-error";

export class ClientError extends HttpError {
  constructor(dependencies: {
    message: string;
    code: string;
    status: number;
    meta?: Record<string, unknown>;
  }) {
    super(dependencies);
  }
}
