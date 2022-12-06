const Joi = require("joi");
const Router = require("@koa/router");

const RatingService = require("../service/gymRating");

const validate = require("./_validation");

const getAllgymRatings = async (ctx) => {
  ctx.body = await RatingService.getAll();
};
getAllgymRatings.validationScheme = {
  query: Joi.object({
    limit: Joi.number().positive().max(1000).optional(),
    offset: Joi.number().min(0).optional(),
  }).and("limit", "offset"),
};

const createRating = async (ctx) => {
  const newRating = await RatingService.create({
    ...ctx.request.body,
    placeId: Number(ctx.request.body.placeId),
    date: new Date(ctx.request.body.date),
  });
  ctx.body = newRating;
  ctx.status = 201;
};
createRating.validationScheme = {
  body: {
    amount: Joi.number().invalid(0),
    date: Joi.date().iso().less("now"),
    placeId: Joi.number().integer().positive(),
    user: Joi.string(),
  },
};

const getgymRatingById = async (ctx) => {
  ctx.body = await RatingService.getById(ctx.params.id);
};
getgymRatingById.validationScheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
};

const updateTransaction = async (ctx) => {
  ctx.body = await RatingService.updateById(ctx.params.id, {
    ...ctx.request.body,
    placeId: Number(ctx.request.body.placeId),
    date: new Date(ctx.request.body.date),
  });
};
updateTransaction.validationScheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
  body: {
    amount: Joi.number().invalid(0),
    date: Joi.date().iso().less("now"),
    placeId: Joi.number().integer().positive(),
    user: Joi.string(),
  },
};

const deleteTransaction = async (ctx) => {
  await RatingService.deleteById(ctx.params.id);
  ctx.status = 204;
};
deleteTransaction.validationScheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
};

module.exports = (app) => {
  const router = new Router({
    prefix: "/gymRating",
  });

  router.get(
    "/",
    validate(getAllgymRatings.validationScheme),
    getAllgymRatings
  );
  router.post("/", validate(createRating.validationScheme), createRating);
  router.get(
    "/:id",
    validate(getgymRatingById.validationScheme),
    getgymRatingById
  );
  router.put(
    "/:id",
    validate(updateTransaction.validationScheme),
    updateTransaction
  );
  router.delete(
    "/:id",
    validate(deleteTransaction.validationScheme),
    deleteTransaction
  );

  app.use(router.routes()).use(router.allowedMethods());
};
