const Joi = require("joi");
const Router = require("@koa/router");

const { hasPermission, permissions } = require("../core/auth");
const placeService = require("../service/place");

const validate = require("./_validation.js");

const getAllPlaces = async (ctx) => {
  ctx.body = await placeService.getAll();
};
getAllPlaces.validationScheme = null;

const createPlace = async (ctx) => {
  const newPlace = await placeService.create(ctx.request.body);
  ctx.body = newPlace;
  ctx.status = 201;
};
createPlace.validationScheme = {
  body: {
    name: Joi.string().max(255),
    rating: Joi.number().min(1).max(5).integer().optional(),
  },
};

const getPlaceById = async (ctx) => {
  ctx.body = await placeService.getById(Number(ctx.params.id));
};
getPlaceById.validationScheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
};

const updatePlace = async (ctx) => {
  ctx.body = await placeService.updateById(ctx.params.id, ctx.request.body);
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

const deletePlace = async (ctx) => {
  await placeService.deleteById(ctx.params.id);
  ctx.status = 204;
};
deletePlace.validationScheme = {
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
    prefix: "/places",
  });

  router.get(
    "/",
    hasPermission(permissions.read),
    validate(getAllPlaces.validationScheme),
    getAllPlaces
  );
  router.post(
    "/",
    hasPermission(permissions.write),
    validate(createPlace.validationScheme),
    createPlace
  );
  router.get(
    "/:id",
    hasPermission(permissions.read),
    validate(getPlaceById.validationScheme),
    getPlaceById
  );
  router.put(
    "/:id",
    hasPermission(permissions.write),
    validate(updatePlace.validationScheme),
    updatePlace
  );
  router.delete(
    "/:id",
    hasPermission(permissions.write),
    validate(deletePlace.validationScheme),
    deletePlace
  );

  app.use(router.routes()).use(router.allowedMethods());
};
