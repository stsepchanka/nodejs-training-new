const tasks = require('./tasks.data');
const Task = require('./task.model');

const getAll = async boardId => {
  return findTasksByBoardId(boardId);
};

const getById = async (boardId, id) => {
  const index = findTaskIndex(boardId, id);

  return tasks[index];
};

const addOne = async data => {
  const newTask = new Task(data);
  tasks.push(newTask);
};

const updateOne = async (boardId, id, task) => {
  const index = findTaskIndex(boardId, id);

  tasks[index] = task;

  return tasks[index];
};

const deleteById = async (boardId, id) => {
  const index = findTaskIndex(boardId, id);
  tasks.splice(index, 1);
};

const findTaskIndex = (boardId, id) => {
  const index = tasks.findIndex(
    task => task.id === id && task.boardId === boardId
  );

  if (index > -1) {
    return index;
  }

  throw new Error(
    `Task with id=${id} and with boardId=${boardId} is not found `
  );
};

const findTasksByBoardId = boardId => {
  return tasks.filter(task => task.boardId === boardId);
};

module.exports = { getAll, getById, addOne, updateOne, deleteById };
