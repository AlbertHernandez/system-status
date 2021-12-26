export interface ErrorHandler {
  run: (error: Error) => Promise<void>;
}
