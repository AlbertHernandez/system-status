export class HttpResponse {
  readonly data;
  readonly statusCode;

  constructor(dependencies: { data?: unknown; statusCode?: number }) {
    this.data = dependencies.data;
    this.statusCode = dependencies.statusCode;
  }
}
