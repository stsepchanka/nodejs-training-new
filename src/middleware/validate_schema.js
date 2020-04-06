const HttpStatus = require('http-status-codes');

function errorResponse(schemaErrors) {
  const errors = schemaErrors.map(({ path, message }) => ({ path, message }));
  return {
    status: 'failed',
    errors
  };
}

function validateSchema(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
      allowUnknown: false
    });

    if (error && error.isJoi) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json(errorResponse(error.details));
    }
    next();
  };
}

module.exports = validateSchema;
