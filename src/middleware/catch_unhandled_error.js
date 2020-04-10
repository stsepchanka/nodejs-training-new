const { INTERNAL_SERVER_ERROR, getStatusText } = require('http-status-codes');

const catchUnhandledError = (err, req, res, next) => {
  res.status(INTERNAL_SERVER_ERROR).send(getStatusText(INTERNAL_SERVER_ERROR));
};

module.exports = { catchUnhandledError };
