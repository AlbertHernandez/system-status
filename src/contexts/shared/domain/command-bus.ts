import { Command } from "./command";
import { CommandHandler } from "./command-handler";

export interface CommandBus {
  dispatch(command: Command): Promise<void>;
  addHandlers(commandHandlers: Array<CommandHandler<Command>>): void;
}
