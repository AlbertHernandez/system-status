import { BaseError } from "../../../shared/domain/errors/base-error";

export class IncidentReportNotFoundError extends BaseError {
  constructor({ id }: { id: string }) {
    super({
      message: `The incident report <${id}> has not been found`,
      code: "error.domain.incidentReport.incidentReportNotExist",
      meta: {
        id,
      },
      isOperational: true,
    });
  }
}
