import Router from "koa-router";

export const getHealthRouter = () => {
  return new Router({
    prefix: "/health",
  });
};
