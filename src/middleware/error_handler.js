const { ValidationError } = require('./../errors/validation.error');
const { NotFoundError } = require('./../errors/not_found.error');

const handleValidationError = (err, req, res, next) =>
  err.details
    ? res.status(err.status).json(err.details)
    : res.status(err.status).send(err.text);

const handleNotFoundError = (err, req, res, next) =>
  res.status(err.status).send(err.text);

const errorHandler = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    handleValidationError(err, req, res, next);
    return;
  } else if (err instanceof NotFoundError) {
    handleNotFoundError(err, req, res, next);
    return;
  }
  next(err);
};

module.exports = { errorHandler };
