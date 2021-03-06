import dotenv from "dotenv";
import convict from "convict";

dotenv.config();

const config = convict({
  server: {
    port: {
      doc: "Port of the server",
      format: "Number",
      default: 3000,
      env: "BACKOFFICE_PORT",
    },
    user: {
      generic: {
        apiKey: {
          doc: "Api Key of the generic user",
          format: "String",
          env: "BACKOFFICE_GENERIC_USER_API_KEY",
          default: "",
        },
      },
    },
  },
  env: {
    doc: "The application environment.",
    format: ["production", "beta", "test", "development"],
    default: "development",
    env: "BACKOFFICE_NODE_ENV",
  },
  logger: {
    level: {
      doc: "Level of the logger",
      format: ["debug", "info", "warn", "error", "fatal"],
      default: "fatal",
      env: "BACKOFFICE_LOGGER_LEVEL",
    },
    isEnabled: {
      doc: "Indicates if logger is enabled",
      format: "Boolean",
      default: true,
      env: "BACKOFFICE_LOGGER_ENABLE",
    },
  },
});

config.loadFile([
  __dirname + "/default.json",
  __dirname + "/" + config.get("env") + ".json",
]);

config.validate();

export { config };
