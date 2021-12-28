import Router from "koa-router";
import { handleRequest } from "./handle-request";
import { authorization } from "../middlewares/authorization.middleware";
import { UserType } from "../models/api-user";
import IncidentReportPutController from "../controllers/incident-report-put.controller";

export const register = (router: Router) => {
  router.put(
    "/incidents/:incidentId/reports/:id",
    authorization({ allowedUserTypes: [UserType.Api] }),
    handleRequest(IncidentReportPutController)
  );
};
