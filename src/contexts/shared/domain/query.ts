import { Uuid } from "./value-object/uuid";

export type QueryName = string;

export abstract class Query {
  static QUERY_NAME: QueryName;
  readonly queryId;
  readonly occurredOn;
  readonly attributes;
  readonly queryName;

  constructor(dependencies: {
    queryName: QueryName;
    queryId?: string;
    occurredOn?: Date;
    attributes?: Record<string, unknown>;
  }) {
    this.queryId = dependencies.queryId || Uuid.random().value();
    this.occurredOn = dependencies.occurredOn || new Date();
    this.attributes = dependencies.attributes;
    this.queryName = dependencies.queryName;
  }

  getDetails() {
    return {
      queryId: this.queryId,
      occurredOn: this.occurredOn,
      queryName: this.queryName,
      attributes: this.attributes,
    };
  }
}

export type QueryClass = {
  QUERY_NAME: QueryName;
};
