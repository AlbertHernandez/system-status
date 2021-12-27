export class RequestContext {
  readonly requestId;

  constructor(dependencies: { requestId: string }) {
    this.requestId = dependencies.requestId;
  }

  toPrimitives() {
    return {
      requestId: this.requestId,
    };
  }
}
