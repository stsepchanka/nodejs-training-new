const users = require('../resources/users/users.data');
const User = require('../resources/users/user.db.model');
const tasks = require('../resources/tasks/tasks.data');
const Task = require('../resources/tasks/task.db.model');

const usersData = users.map(user => {
  return new User(user);
});

const taskData = tasks.map(task => {
  return new Task(task);
});

module.exports = { usersData, taskData };
