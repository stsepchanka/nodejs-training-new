const users = require('./users.data');
const User = require('./user.model');

const getAll = async () => {
  return users;
};

const getById = async id => {
  const index = findUserIndex(id);

  return users[index];
};

const addOne = async data => {
  const newUser = new User(data);
  if (users.find(user => user.login === newUser.login)) {
    throw new Error(`User with login=${newUser.login} already exists`);
  }
  users.push(newUser);
};

const updateOne = async (id, user) => {
  const index = findUserIndex(id);

  users[index] = user;

  return users[index];
};

const deleteById = async id => {
  const index = findUserIndex(id);

  users.splice(index, 1);
};

const findUserIndex = id => {
  const index = users.findIndex(user => user.id === id);

  if (index > -1) {
    return index;
  }

  throw new Error(`User with id=${id} is not found`);
};

module.exports = { getAll, getById, addOne, updateOne, deleteById };
