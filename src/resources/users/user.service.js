const usersRepo = require('./user.db.repository');
const boardsRepo = require('./../boards/board.memory.repository');
const tasksRepo = require('./../tasks/task.memory.repository');

const getAll = () => usersRepo.getAll();

const getById = id => usersRepo.getById(id);

const addOne = async user => {
  return await usersRepo.addOne(user);
};

const updateOne = (id, user) => usersRepo.updateOne(id, user);

const deleteById = async id => {
  await usersRepo.deleteById(id);
  const boards = await boardsRepo.getAll();
  if (boards) {
    boards.forEach(async board => {
      const tasks = await tasksRepo.getAll(board.id);
      if (tasks) {
        await Promise.all(
          tasks
            .filter(task => task.userId === id)
            .map(task =>
              tasksRepo.updateOne(board.id, task.id, { ...task, userId: null })
            )
        );
      }
    });
  }
};

module.exports = { getAll, getById, addOne, updateOne, deleteById };
