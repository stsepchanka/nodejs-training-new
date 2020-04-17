const users = require('../resources/users/users.data');
const User = require('../resources/users/user.db.model');
const tasks = require('../resources/tasks/tasks.data');
const Task = require('../resources/tasks/task.db.model');
const boards = require('../resources/boards/boards.data');
const Board = require('../resources/boards/board.db.model');

const usersData = users.map(user => {
  return new User(user);
});

const taskData = tasks.map(task => {
  return new Task(task);
});

const boardData = boards.map(board => {
  return new Board(board);
});

module.exports = { usersData, taskData, boardData };
