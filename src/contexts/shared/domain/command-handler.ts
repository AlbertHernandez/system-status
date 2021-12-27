import { Command, CommandClass } from "./command";

export interface CommandHandler<C extends Command> {
  subscribedTo(): CommandClass;
  handle(command: C): Promise<void>;
}
