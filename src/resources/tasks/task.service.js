const tasksRepo = require('./task.db.repository');

const getAll = boardId => tasksRepo.getAll(boardId);

const getById = (boardId, id) => tasksRepo.getById(boardId, id);

const addOne = (boardId, data) => tasksRepo.addOne({ ...data, boardId });

const updateOne = (boardId, id, task) => tasksRepo.updateOne(boardId, id, task);

const deleteById = (boardId, id) => tasksRepo.deleteById(boardId, id);

module.exports = { getAll, getById, addOne, updateOne, deleteById };
