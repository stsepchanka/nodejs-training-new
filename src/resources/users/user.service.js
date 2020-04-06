const usersRepo = require('./user.memory.repository');
const User = require('./user.model');

const getAll = () => usersRepo.getAll();

const getById = id => usersRepo.getById(id);

const addOne = async data => {
  const user = new User(data);
  await usersRepo.addOne(user);
  return user;
};

const updateOne = (id, user) => usersRepo.updateOne(id, user);

const deleteById = async id => usersRepo.deleteById(id);

module.exports = { getAll, getById, addOne, updateOne, deleteById };
