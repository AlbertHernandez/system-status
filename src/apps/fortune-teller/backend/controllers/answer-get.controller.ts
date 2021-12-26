import { Controller } from "./controller";
import Joi from "joi";
import Koa from "koa";
import { HttpResponse } from "../models/http-response";
import { SchemasConfig } from "../middlewares/schema-validation.middleware";
import { ObtainAnswerResponse } from "../../../../contexts/fortune-teller/answer/application/get-answer/obtain-answer-response";
import { ObtainAnswerQuery } from "../../../../contexts/fortune-teller/answer/application/get-answer/obtain-answer-query";

export default class AnswerGetController extends Controller {
  static schema(): SchemasConfig {
    return {
      query: Joi.object({
        question: Joi.string().required(),
      }),
    };
  }

  async run(ctx: Koa.Context) {
    const { question } = ctx.query as { question: string };
    const answerResponse = await this.ask<ObtainAnswerResponse>(
      new ObtainAnswerQuery(question)
    );

    return new HttpResponse({
      data: {
        answer: answerResponse.answer,
      },
    });
  }
}
