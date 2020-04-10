const tasksRepo = require('./task.memory.repository');
const Task = require('./task.model');

const getAll = boardId => tasksRepo.getAll(boardId);

const getById = (boardId, id) => tasksRepo.getById(boardId, id);

const addOne = async (boardId, data) => {
  const task = new Task({ ...data, boardId });
  await tasksRepo.addOne(task);
  return task;
};

const updateOne = (boardId, id, task) => tasksRepo.updateOne(boardId, id, task);

const deleteById = (boardId, id) => tasksRepo.deleteById(boardId, id);

module.exports = { getAll, getById, addOne, updateOne, deleteById };
