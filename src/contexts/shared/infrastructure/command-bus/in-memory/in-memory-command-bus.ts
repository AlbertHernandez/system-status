import { Command } from "../../../domain/command";
import { CommandBus } from "../../../domain/command-bus";
import { CommandHandlersInformation } from "./command-handlers-information";

export class InMemoryCommandBus implements CommandBus {
  private commandHandlersInformation;

  constructor(dependencies: {
    commandHandlersInformation: CommandHandlersInformation;
  }) {
    this.commandHandlersInformation = dependencies.commandHandlersInformation;
  }

  async dispatch(command: Command): Promise<void> {
    const handler = this.commandHandlersInformation.search(command);

    await handler.handle(command);
  }
}
