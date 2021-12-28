import Router from "koa-router";
import { handleRequest } from "./handle-request";
import { authorization } from "../middlewares/authorization.middleware";
import { UserType } from "../models/api-user";
import IncidentPutController from "../controllers/incident-put.controller";
import IncidentByIdGetController from "../controllers/incident-by-id-get.controller";

export const register = (router: Router) => {
  router.put(
    "/incidents/:id",
    authorization({ allowedUserTypes: [UserType.Api] }),
    handleRequest(IncidentPutController)
  );
  router.get(
    "/incidents/:id",
    authorization({ allowedUserTypes: [UserType.Api] }),
    handleRequest(IncidentByIdGetController)
  );
};
