const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('./../common/config');
const { logger } = require('./../common/logger');

const { usersData, taskData } = require('./db.data');

const connectToDB = cb => {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = mongoose.connection;
  db.on('error', () => {
    logger.error('connection error:');
  });

  db.once('open', () => {
    logger.info('connected to database');
    db.dropCollection('users');
    usersData.map(user => user.save());
    db.dropCollection('tasks');
    taskData.map(task => task.save());
    cb();
  });
};

module.exports = { connectToDB };
