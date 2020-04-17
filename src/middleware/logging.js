const { logger } = require('./../common/logger');

const logRequest = (req, res, next) => {
  const { url, body, query, method } = req;
  logger.info(`${method}
          url: ${url}
          body: ${JSON.stringify(body)}
          query params: ${JSON.stringify(query)}`);
  next();
};

const logError = (err, req, res, next) => {
  logger.error(JSON.stringify(err));
  next(err);
};

module.exports = { logRequest, logError };
