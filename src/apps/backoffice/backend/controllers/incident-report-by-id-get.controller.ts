import { Controller } from "./controller";
import Joi from "joi";
import Koa from "koa";
import { SchemasConfig } from "../middlewares/schema-validation.middleware";
import { uuid } from "../helpers/uuid";
import { HttpResponse } from "../models/http-response";
import { NotFoundError } from "../errors/not-found-error";
import { FindIncidentReportByIdQuery } from "../../../../contexts/backoffice/incident-reports/application/find-by-id/find-incident-report-by-id-query";
import { IncidentReportNotFoundError } from "../../../../contexts/backoffice/incident-reports/domain/incident-report-not-found-error";
import { FindIncidentByIdResponse } from "../../../../contexts/backoffice/incidents/application/find-by-id/find-incident-by-id-response";

export default class IncidentReportByIdGetController extends Controller {
  static schema(): SchemasConfig {
    return {
      params: Joi.object({
        id: uuid.required(),
      }),
    };
  }

  async run(ctx: Koa.Context) {
    const { id } = ctx.params as { id: string };

    try {
      const response = await this.ask<FindIncidentByIdResponse>(
        new FindIncidentReportByIdQuery({ queryId: this.requestId, id })
      );

      return new HttpResponse({
        data: response,
      });
    } catch (error) {
      if (error instanceof IncidentReportNotFoundError) {
        throw new NotFoundError({
          message: error.message,
        });
      }

      throw error;
    }
  }
}
