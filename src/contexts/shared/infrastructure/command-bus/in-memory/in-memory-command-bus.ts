import { Command, CommandName } from "../../../domain/command";
import { CommandBus } from "../../../domain/command-bus";
import { CommandHandler } from "../../../domain/command-handler";
import { DependencyName } from "../../../domain/dependency-name";
import {
  instanceToDependencyName,
  ScopeHandler,
} from "../../dependency-injection";
import { CommandNotRegisteredError } from "../../../domain/errors/command-not-registered-error";
import { Logger } from "../../../domain/logger";

export class InMemoryCommandBus implements CommandBus {
  private readonly commandHandlersMap;
  private readonly scopeHandler;

  constructor(dependencies: {
    commandHandlers: Array<CommandHandler<Command>>;
    scopeHandler: ScopeHandler;
  }) {
    this.scopeHandler = dependencies.scopeHandler;
    this.commandHandlersMap = this.formatHandlers(dependencies.commandHandlers);
  }

  private formatHandlers(
    commandHandlers: Array<CommandHandler<Command>>
  ): Map<CommandName, DependencyName> {
    const handlersMap = new Map();

    commandHandlers.forEach((commandHandler) => {
      handlersMap.set(
        commandHandler.subscribedTo().COMMAND_NAME,
        instanceToDependencyName(commandHandler)
      );
    });

    return handlersMap;
  }

  async dispatch(command: Command): Promise<void> {
    const commandHandlerClassName = this.commandHandlersMap.get(
      command.commandName
    );

    if (!commandHandlerClassName) {
      throw new CommandNotRegisteredError(command);
    }

    const childContainer = this.scopeHandler.createScope({
      scopeInfo: {
        commandId: command.commandId,
      },
    });

    const logger = childContainer.resolve<Logger>("logger");

    const handler = childContainer.resolve<CommandHandler<Command>>(
      commandHandlerClassName
    );

    logger.debug({
      message: "Processing command",
      context: command.getDetails(),
    });

    await handler.handle(command);
  }
}
