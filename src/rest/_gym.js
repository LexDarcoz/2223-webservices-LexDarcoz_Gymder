const Joi = require("joi");
const Router = require("@koa/router");

const gymService = require("../service/gym");

const validate = require("./_validation.js");

const getAllGyms = async (ctx) => {
  ctx.body = await gymService.getAll();
};
getAllGyms.validationScheme = null;

const createGym = async (ctx) => {
  const newGym = await gymService.create(ctx.request.body);
  ctx.body = newGym;
  ctx.status = 201;
};
createGym.validationScheme = {
  body: {
    name: Joi.string().max(255),
    emailAddress: Joi.string().max(255),
    owner: Joi.string().max(255),
    description: Joi.string().max(255),
  },
};

const getGymById = async (ctx) => {
  ctx.body = await gymService.getById(Number(ctx.params.id));
};
getGymById.validationScheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
};

const updatePlace = async (ctx) => {
  ctx.body = await gymService.updateById(ctx.params.id, ctx.request.body);
};
updatePlace.validationScheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
  body: {
    name: Joi.string().max(255),
    rating: Joi.number().min(1).max(5).integer(),
  },
};

const deleteGym = async (ctx) => {
  await gymService.deleteById(ctx.params.id);
  ctx.status = 204;
};
deleteGym.validationScheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
};

/**
 * Install transaction routes in the given router.
 *
 * @param {Router} app - The parent router.
 */
module.exports = (app) => {
  const router = new Router({
    prefix: "/gym",
  });

  router.get(
    "/",

    validate(getAllGyms.validationScheme),
    getAllGyms
  );
  router.post(
    "/",

    validate(createGym.validationScheme),
    createGym
  );
  router.get(
    "/:id",

    validate(getGymById.validationScheme),
    getGymById
  );
  router.put(
    "/:id",

    validate(updatePlace.validationScheme),
    updatePlace
  );
  router.delete(
    "/:id",

    validate(deleteGym.validationScheme),
    deleteGym
  );

  app.use(router.routes()).use(router.allowedMethods());
};
