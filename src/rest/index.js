const Router = require("@koa/router");

const installRatingRouter = require("./_gymRating");
const installHealthRouter = require("./_health");
const installGymRouter = require("./_gym");
const installUserRouter = require("./_user");

/**
 * Install all routes in the given Koa application.
 *
 * @param {Koa} app - The Koa application.
 */
module.exports = (app) => {
  const router = new Router({
    prefix: "/api",
  });

  installRatingRouter(router);

  installGymRouter(router);

  installHealthRouter(router);

  installUserRouter(router);
  app.use(router.routes()).use(router.allowedMethods());
};
