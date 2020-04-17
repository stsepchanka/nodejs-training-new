const { PORT } = require('./common/config');
const app = require('./app');
const { connectToDB } = require('./db/db.client');
const { logger } = require('./common/logger');

process.on('uncaughtException', error => {
  logger.error(`captured error: ${error.message}`);
  process.exitCode = 1;
});

process.on('unhandledRejection', reason => {
  logger.info(`Unhandled rejection detected: ${reason.message}`);
});

connectToDB(() => {
  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  );
});
