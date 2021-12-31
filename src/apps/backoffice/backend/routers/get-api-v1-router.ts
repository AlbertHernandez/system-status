import Router from "koa-router";

export const getApiV1Router = () => {
  return new Router({
    prefix: "/api/v1",
  });
};
