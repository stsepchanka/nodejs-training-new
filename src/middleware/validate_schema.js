const { ValidationError } = require('./../errors/validation.error');

function details(schemaErrors) {
  return schemaErrors.map(({ path, message }) => ({ path, message }));
}

function validateSchema(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
      allowUnknown: false
    });

    if (error && error.isJoi) {
      return next(new ValidationError('Invalid data', details(error.details)));
    }
    next();
  };
}

module.exports = validateSchema;
