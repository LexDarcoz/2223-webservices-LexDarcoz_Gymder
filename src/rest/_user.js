const Joi = require("joi");
const Router = require("@koa/router");
const { hasPermission, permissions, addUserInfo } = require("../core/auth");
const userService = require("../service/user");

const validate = require("./_validation");

const getAllUsers = async (ctx) => {
  const users = await userService.getAll();
  ctx.body = users;
};
getAllUsers.validationScheme = null;

const getUserById = async (ctx) => {
  ctx.body = await userService.getById(Number(ctx.params.id));
};

getUserById.validationScheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
};

const getUserByAuthId = async (ctx) => {
  let userId = 0;
  try {
    const user = await userService.getByAuth0Id(ctx.state.user.sub);
    userId = user.id;
  } catch (err) {
    await addUserInfo(ctx);
    userId = await userService.register({
      auth0id: ctx.state.user.sub,
      fullName: ctx.state.user.name,
    });
  }

  const user = await userService.getByAuth0Id(ctx.state.user.sub);
  ctx.body = user;
};

getUserByAuthId.validationScheme = null;

const updateUserByAuthId = async (ctx) => {
  let userId = 0;
  try {
    const user = await userService.getByAuth0Id(ctx.state.user.sub);
    userId = user.id;
  } catch (err) {
    await addUserInfo(ctx);
    userId = await userService.register({
      auth0id: ctx.state.user.sub,
      fullName: ctx.state.user.name,
    });
  }

  ctx.body = await userService.updateByAuthId(ctx.state.user.sub, {
    fullName: ctx.request.body.fullName,
    phoneNumber: ctx.request.body.phoneNumber,
    emailAddress: ctx.request.body.emailAddress,
    country: ctx.request.body.country,
    state: ctx.request.body.state,
    city: ctx.request.body.city,
    bio: ctx.request.body.bio,
  });
};
updateUserByAuthId.validationScheme = {};

const deleteUserById = async (ctx) => {
  await userService.deleteById(ctx.params.id);
  ctx.status = 204;
};
deleteUserById.validationScheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
};

module.exports = function installUsersRoutes(app) {
  const router = new Router({
    prefix: "/user",
  });

  router.get(
    "/",
    hasPermission(permissions.loggedIn),
    validate(getAllUsers.validationScheme),
    getAllUsers
  );
  router.get(
    "/current",
    hasPermission(permissions.loggedIn),
    validate(getUserByAuthId.validationScheme),
    getUserByAuthId
  );
  router.get(
    "/:id",
    hasPermission(permissions.loggedIn),
    validate(getUserById.validationScheme),
    getUserById
  );
  router.put(
    "/save",
    hasPermission(permissions.loggedIn),
    validate(updateUserByAuthId.validationScheme),
    updateUserByAuthId
  );
  router.delete(
    "/:id",
    hasPermission(permissions.write),
    validate(deleteUserById.validationScheme),
    deleteUserById
  );
  app.use(router.routes()).use(router.allowedMethods());
};
