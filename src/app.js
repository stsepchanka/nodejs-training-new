const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const { logRequest, logError } = require('./middleware/logging');
const { authorize } = require('./middleware/authorization');
const { errorHandler } = require('./middleware/error_handler');
const { catchUnhandledError } = require('./middleware/catch_unhandled_error');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const loginRouter = require('./auth/login.router');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/', logRequest);

app.use('/login', loginRouter);

app.use('/users', authorize, userRouter);
app.use('/boards', authorize, boardRouter);
app.use('/boards/:boardId/tasks', authorize, taskRouter);

app.use(logError, errorHandler);

app.use(catchUnhandledError);

module.exports = app;
