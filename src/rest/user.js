const Joi = require("joi");
const Router = require("@koa/router");

const { hasPermission, permissions } = require("../core/auth");
const userService = require("../service/user");

const validate = require("./_validation");

const getAllUsers = async (ctx) => {
  const users = await userService.getAll();
  ctx.body = users;
};
getAllUsers.validationScheme = null;

const getUserById = async (ctx) => {
  const user = await userService.getById(ctx.params.id);
  ctx.body = user;
};
getUserById.validationScheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
};

const updateUserById = async (ctx) => {
  const user = await userService.updateById(ctx.params.id, ctx.request.body);
  ctx.body = user;
};
updateUserById.validationScheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
  body: {
    name: Joi.string().max(255),
  },
};

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
    prefix: "/users",
  });

  router.get(
    "/",
    hasPermission(permissions.read),
    validate(getAllUsers.validationScheme),
    getAllUsers
  );
  router.get(
    "/:id",
    hasPermission(permissions.read),
    validate(getUserById.validationScheme),
    getUserById
  );
  router.put(
    "/:id",
    hasPermission(permissions.write),
    validate(updateUserById.validationScheme),
    updateUserById
  );
  router.delete(
    "/:id",
    hasPermission(permissions.write),
    validate(deleteUserById.validationScheme),
    deleteUserById
  );

  app.use(router.routes()).use(router.allowedMethods());
};
