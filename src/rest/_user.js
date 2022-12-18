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

const getUserByAuthId = async (ctx) => {
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
      name: ctx.state.user.name,
    });
  }

  const user = await userService.updateById(ctx.state.user.sub);
  ctx.body = user;
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

/**
 * Install user routes in the given router.
 *
 * @param {Router} app - The parent router.
 */
module.exports = function installUsersRoutes(app) {
  const router = new Router({
    prefix: "/user",
  });

  router.get(
    "/",

    validate(getAllUsers.validationScheme),
    getAllUsers
  );
  router.get(
    "/current",

    validate(getUserByAuthId.validationScheme),
    getUserByAuthId
  );
  router.put(
    "/save",
    hasPermission(permissions.write),
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
