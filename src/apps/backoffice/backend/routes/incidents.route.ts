import Router from "koa-router";
import { handleRequest } from "./handle-request";
import { authorization } from "../middlewares/authorization.middleware";
import { UserType } from "../models/api-user";
import IncidentPutController from "../controllers/incident-put.controller";

export const register = (router: Router) => {
  router.put(
    "/incidents",
    authorization({ allowedUserTypes: [UserType.Api] }),
    handleRequest(IncidentPutController)
  );
};
