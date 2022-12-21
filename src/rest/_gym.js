const Joi = require("joi");
const Router = require("@koa/router");
const multer = require("@koa/multer");
const gymService = require("../service/gym");
const userService = require("../service/user");
const validate = require("./_validation.js");
const { addUserInfo } = require("../core/auth");
var imgconfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads");
  },
  filename: (req, file, callback) => {
    callback(null, `gym-${Date.now()}.${file.originalname}`);
  },
});

const isImage = (req, file, callback) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback(null, Error("Only images are allowed"));
  }
};

const maxSize = 5 * 1000 * 1000;
const upload = multer({
  storage: imgconfig,
  fileFilter: isImage,
  limits: {
    fileSize: maxSize,
  },
});

const getAllGyms = async (ctx) => {
  ctx.body = await gymService.getAll();
};
getAllGyms.validationScheme = null;

const createGym = async (ctx) => {
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

  const filename = ctx.request.file ? ctx.request.file.filename : null;
  const newGym = await gymService.create({ ...ctx.request.body }, filename);
  ctx.body = newGym;
  ctx.status = 201;
};
createGym.validationScheme = {
  body: {
    name: Joi.string().max(255),
    owner: Joi.string().max(255),
    emailAddress: Joi.string().max(255),
    description: Joi.string().max(255),
    address: Joi.string().max(255),
    image: Joi.optional(),
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

    upload.single("image"),
    validate(createGym.validationScheme),
    createGym
  );
  router.get(
    "/:id",

    validate(getGymById.validationScheme),
    getGymById
  );

  app.use(router.routes()).use(router.allowedMethods());
};
