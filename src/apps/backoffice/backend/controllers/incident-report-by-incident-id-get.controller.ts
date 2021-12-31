import { Controller } from "./controller";
import Joi from "joi";
import { Context } from "koa";
import { SchemasConfig } from "../middlewares/schema-validation.middleware";
import { uuid } from "../helpers/uuid";
import { HttpResponse } from "../models/http-response";
import { NotFoundError } from "../errors/not-found-error";
import { IncidentNotFoundError } from "../../../../contexts/backoffice/shared/domain/incident-not-found-error";
import { FindIncidentReportByIncidentIdQuery } from "../../../../contexts/backoffice/incident-reports/application/find-by-incident-id/find-incident-report-by-incident-id-query";
import { FindIncidentReportByIncidentIdResponse } from "../../../../contexts/backoffice/incident-reports/application/find-by-incident-id/find-incident-report-by-incident-id-response";

export default class IncidentReportByIncidentIdGetController extends Controller {
  static schema(): SchemasConfig {
    return {
      params: Joi.object({
        incidentId: uuid.required(),
      }),
    };
  }

  async run(ctx: Context) {
    const { incidentId } = ctx.params as { incidentId: string };

    try {
      const response = await this.ask<FindIncidentReportByIncidentIdResponse>(
        new FindIncidentReportByIncidentIdQuery({
          queryId: this.requestId,
          incidentId,
        })
      );

      return new HttpResponse({
        data: response.incidentReports,
      });
    } catch (error) {
      if (error instanceof IncidentNotFoundError) {
        throw new NotFoundError({
          message: error.message,
        });
      }

      throw error;
    }
  }
}
