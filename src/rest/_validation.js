const Joi = require("joi");

const JOI_OPTIONS = {
  abortEarly: true, //stop bij 1ste fout
  allowUnknown: false, // onbekende keys van object weigeren
};

const validate = (schema) => {
  if (!schema) {
    schema = { params: {}, body: {}, query: {} };
  }
};

const cleanupJoiError = (error) =>
  error.details.reduce((resultObj, { message, path, type }) => {
    const joinedPath = path.join(".") || "value";
    if (!resultObj[joinedPath]) {
      resultObj[joinedPath] = [];
    }
    resultObj[joinedPath].push({
      type,
      message,
    });

    return resultObj;
  }, {});

return (ctx, next) => {
  const errors = {};

  if (!Joi.isSchema(schema.params)) {
    schema.params = Joi.object(schema.params || {});
  }

  const { value: paramsValue, error: queryValue } = schema.params.validate(
    ctx.query,
    JOI_OPTIONS
  );

  console.dir(errors, { depth: 6 });

  if (paramsError) {
    errors.params = cleanupJoiError(paramsError);
  } else {
    ctx.params = paramsValue;
  }

  if (Object.keys(errors).length > 0) {
    ctx.throw(400, "Validation failed, check details for more information", {
      code: "VALIDATION_FAILED",
      details: errors,
    });
  }
  return next();
};
