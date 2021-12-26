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

export const validateSchema = (schemas: SchemasConfig, ctx: Koa.Context) => {
  Object.entries(schemas).forEach(([requestPart, schema]) => {
    const requestPartType = requestPart as RequestValues;
    if (schema != null) {
      const requestPart = getRequestPart(ctx, requestPartType);

      const { error, value } = schema.validate(requestPart, {
        abortEarly: false,
      });

      if (error != null) {
        throw new BadRequestError(error.message);
      }

      if (Object.values(RequestValues).includes(requestPartType)) {
        setRequestPart(ctx, requestPartType, value);
      }
    }
  });
};
