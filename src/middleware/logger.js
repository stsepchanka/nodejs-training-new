const { createLogger, format, transports } = require('winston');

const requestFormat = format.printf(({ timestamp, level, message }) => {
  return `[LOGGER]: ${timestamp} ${level}: ${message}`;
});

const logger = createLogger({
  level: 'silly',
  format: format.combine(format.colorize(), format.timestamp(), requestFormat),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: 'error.log',
      level: 'error',
      format: format.combine(format.uncolorize(), format.json())
    }),
    new transports.File({
      filename: 'info.log',
      level: 'info',
      format: format.combine(format.uncolorize(), format.json())
    })
  ]
});

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

module.exports = { logRequest, logError, logger };
