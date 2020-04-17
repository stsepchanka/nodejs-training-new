const User = require('./user.db.model');

const getAll = async () => {
  return User.find({}).exec();
};

const getById = async id => {
  return await User.findOne({ _id: id });
};

const addOne = async newUser => {
  return User.create(newUser);
};

const updateOne = async (id, user) => {
  return User.updateOne({ _id: id }, user).exec();
};

const deleteById = async id => {
  return User.deleteOne({ _id: id }).exec().deletedCount;
};

module.exports = { getAll, getById, addOne, updateOne, deleteById };
