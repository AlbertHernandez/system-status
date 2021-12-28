import { Controller } from "./controller";
import Joi from "joi";
import Koa from "koa";
import { SchemasConfig } from "../middlewares/schema-validation.middleware";
import { uuid } from "../helpers/uuid";
import { HttpResponse } from "../models/http-response";
import { Status } from "../../../../contexts/backoffice/incident-reports/domain/incident-report-status";
import { CreateIncidentReportCommand } from "../../../../contexts/backoffice/incident-reports/application/create-incident-report-command";
import { IncidentNotFoundError } from "../../../../contexts/backoffice/incidents/domain/incident-not-found-error";
import { NotFoundError } from "../errors/not-found-error";

export default class IncidentReportPutController extends Controller {
  static schema(): SchemasConfig {
    return {
      body: Joi.object({
        message: Joi.string().required(),
        status: Joi.string()
          .valid(...Object.values(Status))
          .required(),
      }),
      params: Joi.object({
        id: uuid.required(),
        incidentId: uuid.required(),
      }),
    };
  }

  async run(ctx: Koa.Context) {
    const { message, status } = ctx.request.body as {
      message: string;
      status: string;
    };

    const { id, incidentId } = ctx.params as { id: string; incidentId: string };

    try {
      await this.dispatch(
        new CreateIncidentReportCommand({
          id,
          incidentId,
          message,
          status,
          commandId: this.requestId,
        })
      );

      return new HttpResponse();
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
