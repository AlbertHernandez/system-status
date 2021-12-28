import httpStatus from "http-status";
import { ClientError } from "./client-error";

export class NotFoundError extends ClientError {
  constructor(dependencies: { message: string }) {
    super({
      message: dependencies.message,
      code: "error.api.notFound",
      status: httpStatus.NOT_FOUND,
    });
  }
}
