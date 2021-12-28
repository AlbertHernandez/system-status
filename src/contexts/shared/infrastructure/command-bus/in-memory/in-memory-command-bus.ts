import { Command, CommandName } from "../../../domain/command";
import { CommandBus } from "../../../domain/command-bus";
import { CommandHandler } from "../../../domain/command-handler";
import { DependencyName } from "../../../domain/dependency-name";
import {
  instanceToDependencyName,
  ContainerScopeCreator,
} from "../../dependency-injection";
import { CommandNotRegisteredError } from "../../../domain/errors/command-not-registered-error";
import { Logger } from "../../../domain/logger";

export class InMemoryCommandBus implements CommandBus {
  private readonly commandHandlersMap: Map<CommandName, DependencyName>;
  private readonly containerScopeCreator;

  constructor(dependencies: { containerScopeCreator: ContainerScopeCreator }) {
    this.containerScopeCreator = dependencies.containerScopeCreator;
    this.commandHandlersMap = new Map();
  }

  async dispatch(command: Command): Promise<void> {
    const commandHandlerClassName = this.commandHandlersMap.get(
      command.commandName
    );

    if (!commandHandlerClassName) {
      throw new CommandNotRegisteredError(command);
    }

    const childContainer = this.containerScopeCreator.run({
      commandId: command.commandId,
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

  addHandlers(commandHandlers: Array<CommandHandler<Command>>): void {
    commandHandlers.forEach((commandHandler) => {
      this.commandHandlersMap.set(
        commandHandler.subscribedTo().COMMAND_NAME,
        instanceToDependencyName(commandHandler)
      );
    });
  }
}
