const Joi = require("joi");
const Router = require("@koa/router");
// const multer = require("@koa/multer");
const gymService = require("../service/gym");

const validate = require("./_validation.js");

// var imgconfig = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, "./uploads");
//   },
//   filename: (req, file, callback) => {
//     callback(null, `Gym-${Date.now()}.${file.originalname}`);
//   },
// });

// const isImage = (req, file, callback) => {
//   if (file.mimetype.startsWith("image")) {
//     callback(null, true);
//   } else {
//     callback(null, Error("only image is allowed"));
//   }
// };

// const maxSize = 5 * 1000 * 1000;
// const upload = multer({
//   storage: imgconfig,
//   fileFilter: isImage,
//   limits: {
//     fileSize: maxSize,
//   },
// });

const getAllGyms = async (ctx) => {
  ctx.body = await gymService.getAll();
};
getAllGyms.validationScheme = null;

const createGym = async (ctx) => {
  // const filename = ctx.request.file ? ctx.request.file.filename : null;  , filename
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
    // image: Joi.optional(),
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

    // upload.single("image"),
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

    // upload.single("image"),
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
