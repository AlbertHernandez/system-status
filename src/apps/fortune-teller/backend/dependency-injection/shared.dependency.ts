import * as Awilix from "awilix";
import { PinoLogger } from "../../../../contexts/shared/infrastructure/pino-logger";
import { ErrorHandler } from "../../../../contexts/shared/infrastructure/error-handler";
import { config } from "../../../../contexts/fortune-teller/shared/infrastructure/config";
import { InMemoryQueryBus } from "../../../../contexts/shared/infrastructure/query-bus/in-memory-query-bus";
import { QueryHandlersInformation } from "../../../../contexts/shared/infrastructure/query-bus/query-handlers-information";
import { ObtainPredictionQueryHandler } from "../../../../contexts/fortune-teller/predict/application/create/obtain-prediction-query-handler";
import camelcase from "camelcase";
import { Class } from "../../../../contexts/shared/domain/class";
import { ObtainAnswerQueryHandler } from "../../../../contexts/fortune-teller/answer/application/get-answer/obtain-answer-query-handler";

export const register = (container: Awilix.AwilixContainer) => {
  container.register({
    logger: Awilix.asClass(PinoLogger).inject(() => {
      return {
        level: config.get("logger.level"),
        isEnabled: config.get("logger.isEnabled"),
      };
    }),
    errorHandler: Awilix.asClass(ErrorHandler),
    queryHandlers: Awilix.asFunction(
      ({
        parentContainer,
        queryHandlerClassNames,
      }: {
        parentContainer: Awilix.AwilixContainer;
        queryHandlerClassNames: Class<unknown>[];
      }) =>
        queryHandlerClassNames.map((handlerClassName) =>
          parentContainer.resolve(camelcase(handlerClassName.name))
        )
    ).inject((parentContainer: Awilix.AwilixContainer) => ({
      parentContainer,
      queryHandlerClassNames: [
        ObtainPredictionQueryHandler,
        ObtainAnswerQueryHandler,
      ],
    })),
    queryHandlersInformation: Awilix.asClass(QueryHandlersInformation),
    queryBus: Awilix.asClass(InMemoryQueryBus),
  });
};
