const Task = require('./task.db.model');

const getAll = async boardId => {
  return Task.find({ boardId }).exec();
};

const getById = async (boardId, id) => {
  return await Task.findOne({ _id: id });
};

const addOne = async newTask => {
  return Task.create(newTask);
};

const updateOne = async (boardId, id, task) => {
  return Task.updateOne({ boardId, _id: id }, task).exec();
};

const deleteById = async (boardId, id) => {
  return (await Task.deleteOne({ boardId, _id: id })).deletedCount;
};

const getTasksByUser = async userId => {
  return Task.find({ userId }).exec();
};

module.exports = {
  getAll,
  getById,
  addOne,
  updateOne,
  deleteById,
  getTasksByUser
};
