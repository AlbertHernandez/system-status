import httpStatus from "http-status";
import { ClientError } from "./client-error";

export class BadRequestError extends ClientError {
  constructor(message: string) {
    super({
      message,
      code: "error.api.notAcceptable",
      status: httpStatus.BAD_REQUEST,
    });
  }
}
