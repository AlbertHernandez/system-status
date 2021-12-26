import * as Koa from "koa";
import Joi from "joi";
import { BadRequestError } from "../errors/bad-request-error";

enum RequestValues {
  Body = "body",
  Query = "query",
  Headers = "headers",
  Params = "params",
}

export interface SchemasConfig {
  body?: Joi.ObjectSchema;
  query?: Joi.ObjectSchema;
  headers?: Joi.ObjectSchema;
  params?: Joi.ObjectSchema;
}

function getRequestPart(
  ctx: Koa.ParameterizedContext,
  requestPart: RequestValues
): NodeJS.Dict<any> {
  if (requestPart === RequestValues.Params) {
    return ctx.params;
  }

  return ctx.request[requestPart];
}

function setRequestPart(
  ctx: Koa.ParameterizedContext,
  requestPart: RequestValues,
  value: any
): void {
  if (requestPart === RequestValues.Params) {
    ctx.params = value;
  } else {
    ctx.request[requestPart] = value;
  }
}

export const validateSchema = async (
  schemas: SchemasConfig,
  ctx: Koa.Context
) => {
  for (const [requestPart, schema] of Object.entries(schemas)) {
    const requestPartType = requestPart as RequestValues;
    if (schema != null) {
      const requestPart = getRequestPart(ctx, requestPartType);

      try {
        const value = await schema.validateAsync(requestPart, {
          abortEarly: false,
        });
        if (Object.values(RequestValues).includes(requestPartType)) {
          setRequestPart(ctx, requestPartType, value);
        }
      } catch (error) {
        if (!(error instanceof Error)) {
          throw error;
        }

        throw new BadRequestError(error.message);
      }
    }
  }
};
