const encryptor = require('./../../common/encryptor');
const usersRepo = require('./user.db.repository');
const tasksRepo = require('./../tasks/task.db.repository');

const getAll = () => usersRepo.getAll();

const getById = id => usersRepo.getById(id);

const addOne = async data => {
  const password = await encryptor.encrypt(data.password);
  const user = { ...data, password };
  return usersRepo.addOne(user);
};

const updateOne = (id, user) => usersRepo.updateOne(id, user);

const deleteById = async id => {
  const deletedCount = await usersRepo.deleteById(id);
  if (deletedCount) {
    const tasks = await tasksRepo.getTasksByUser(id);
    if (tasks && tasks.length) {
      await Promise.all(
        tasks
          .filter(task => task.userId === id)
          .map(async task => {
            return await tasksRepo.updateOne(task.boardId, task._id, {
              userId: null
            });
          })
      );
    }
  }
  return deletedCount;
};

const getByLoginAndPassword = async (login, password) => {
  const user = await usersRepo.getByLogin(login);
  const ok = user && (await encryptor.compare(password, user.password));
  if (ok) {
    return user;
  }
  return null;
};

module.exports = {
  getAll,
  getById,
  addOne,
  updateOne,
  deleteById,
  getByLoginAndPassword
};
