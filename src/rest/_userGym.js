const Joi = require("joi");
const Router = require("@koa/router");
const userGymService = require("../service/userGym");
const userService = require("../service/user");
const validate = require("./_validation.js");
const { addUserInfo } = require("../core/auth");

const getAllUserGyms = async (ctx) => {
  let userAuthId = 0;
  try {
    const user = await userService.getByAuth0Id(ctx.state.user.sub);
    userAuthId = user.id;
  } catch (err) {
    await addUserInfo(ctx);
    userAuthId = await userService.register({
      auth0id: ctx.state.user.sub,
      name: ctx.state.user.name,
    });
  }
  const user = await userService.getByAuth0Id(ctx.state.user.sub);

  ctx.body = await userGymService.getAll(user.id);
};
getAllUserGyms.validationScheme = null;

const createUserGym = async (ctx) => {
  let userId = 0;
  try {
    const user = await userService.getByAuth0Id(ctx.state.user.sub);
    userId = user.id;
  } catch (err) {
    await addUserInfo(ctx);
    userId = await userService.register({
      auth0id: ctx.state.user.sub,
      name: ctx.state.user.name,
    });
  }
  const newUserGym = await userGymService.create(
    userId,
    ctx.request.body.gymId
  );
  ctx.body = newUserGym;
  ctx.status = 201;
};
createUserGym.validationScheme = {};

const deleteGym = async (ctx) => {
  await userGymService.deleteById(ctx.params.id);
  ctx.status = 204;
};
deleteGym.validationScheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
};
module.exports = (app) => {
  const router = new Router({
    prefix: "/userGym",
  });

  router.get("/", validate(getAllUserGyms.validationScheme), getAllUserGyms);
  router.post("/", validate(createUserGym.validationScheme), createUserGym);
  router.delete("/:id", validate(deleteGym.validationScheme), deleteGym);

  app.use(router.routes()).use(router.allowedMethods());
};
