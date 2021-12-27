import { Uuid } from "./value-object/uuid";

export type CommandName = string;

export abstract class Command {
  static COMMAND_NAME: CommandName;
  readonly commandId;
  readonly occurredOn;
  readonly attributes;
  readonly commandName;

  constructor(dependencies: {
    commandName: string;
    commandId?: string;
    occurredOn?: Date;
    attributes?: Record<string, unknown>;
  }) {
    this.commandId = dependencies.commandId || Uuid.random().value();
    this.occurredOn = dependencies.occurredOn || new Date();
    this.attributes = dependencies.attributes;
    this.commandName = dependencies.commandName;
  }

  getDetails() {
    return {
      commandId: this.commandId,
      occurredOn: this.occurredOn,
      commandName: this.commandName,
      attributes: this.attributes,
    };
  }
}

export type CommandClass = {
  COMMAND_NAME: CommandName;
};
