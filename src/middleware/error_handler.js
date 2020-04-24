const { ValidationError } = require('./../errors/validation.error');
const { NotFoundError } = require('./../errors/not_found.error');
const { UnauthorizedError } = require('./../errors/unauthorized.error');
const { ForbiddenError } = require('./../errors/forbidden.error');

const handleValidationError = (err, req, res, next) =>
  err.details
    ? res.status(err.status).json(err.details)
    : res.status(err.status).send(err.text);

const handleError = (err, req, res, next) =>
  res.status(err.status).send(err.text);

const errorHandler = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    handleValidationError(err, req, res, next);
    return;
  } else if (err instanceof NotFoundError) {
    handleError(err, req, res, next);
    return;
  } else if (err instanceof UnauthorizedError) {
    handleError(err, req, res, next);
    return;
  } else if (err instanceof ForbiddenError) {
    handleError(err, req, res, next);
    return;
  }
  next(err);
};

module.exports = { errorHandler };
