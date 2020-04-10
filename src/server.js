const { PORT } = require('./common/config');
const app = require('./app');

process.on('uncaughtException', error => {
  console.error(`captured error: ${error.message}`);
  process.exitCode = 1;
});

process.on('unhandledRejection', reason => {
  console.error(`Unhandled rejection detected: ${reason.message}`);
  process.exitCode = 1;
});

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);
