import { BackofficeBackendApp } from "./backoffice-backend-app";

try {
  new BackofficeBackendApp().start().catch(handleError);
} catch (e) {
  handleError(e);
}

process.on("uncaughtException", (err) => {
  console.log("uncaughtException", err);
  process.exit(1);
});

function handleError(error: unknown) {
  console.log(error);
  process.exit(1);
}
