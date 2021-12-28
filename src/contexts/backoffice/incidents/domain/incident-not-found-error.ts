import { BaseError } from "../../../shared/domain/errors/base-error";

export class IncidentNotFoundError extends BaseError {
  constructor({ id }: { id: string }) {
    super({
      message: `The incident <${id}> has not been found`,
      code: "error.domain.incident.incidentNotExist",
      meta: {
        id,
      },
      isOperational: true,
    });
  }
}
