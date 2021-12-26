import httpStatus from "http-status";
import { ClientError } from "./client-error";

export class UnauthorizedError extends ClientError {
  constructor() {
    super({
      message: "Unauthorized",
      code: "error.api.unauthorized",
      status: httpStatus.UNAUTHORIZED,
    });
  }
}
