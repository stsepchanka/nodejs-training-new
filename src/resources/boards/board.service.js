const boardRepo = require('./board.db.repository');
const tasksRepo = require('./../tasks/task.db.repository');

const getAll = () => boardRepo.getAll();

const getById = id => boardRepo.getById(id);

const addOne = board => boardRepo.addOne(board);

const updateOne = (id, board) => boardRepo.updateOne(id, board);

const deleteById = async boardId => {
  const deletedCount = await boardRepo.deleteById(boardId);
  if (deletedCount) {
    const tasks = await tasksRepo.getAll(boardId);
    if (tasks) {
      await Promise.all(
        tasks.map(task => tasksRepo.deleteById(boardId, task.id))
      );
    }
  }
  return deletedCount;
};

module.exports = { getAll, getById, addOne, updateOne, deleteById };
