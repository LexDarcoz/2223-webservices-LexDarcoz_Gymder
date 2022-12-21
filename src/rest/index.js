const Router = require("@koa/router");
const path = require("path");
const serve = require("koa-static");

const installHealthRouter = require("./_health");
const installGymRouter = require("./_gym");
const installUserRouter = require("./_user");
const installUserGymRouter = require("./_userGym");

/**
 * Install all routes in the given Koa application.
 *
 * @param {Koa} app - The Koa application.
 */

module.exports = (app) => {
  const router = new Router({
    prefix: "/api",
  });

  installUserGymRouter(router);

  installGymRouter(router);

  installHealthRouter(router);

  installUserRouter(router);

  app.use(serve(path.join(__dirname, "../../uploads")));

  app.use(router.routes()).use(router.allowedMethods());
};
