const User = require('./user.db.model');

const getAll = async () => {
  return User.find({}).exec();
};

const getById = async id => {
  return await User.findOne({ _id: id });
};

const getByLogin = async login => {
  return await User.findOne({ login });
};

const addOne = async newUser => {
  return User.create(newUser);
};

const updateOne = async (id, user) => {
  return User.updateOne({ _id: id }, user).exec();
};

const deleteById = async id => {
  return (await User.deleteOne({ _id: id })).deletedCount;
};

module.exports = {
  getAll,
  getById,
  addOne,
  updateOne,
  deleteById,
  getByLogin
};
