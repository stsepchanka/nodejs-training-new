const Board = require('./board.db.model');

const getAll = async () => {
  return Board.find({}).exec();
};

const getById = async id => {
  return await Board.findOne({ _id: id });
};

const addOne = async newBoard => {
  return Board.create(newBoard);
};

const updateOne = async (id, board) => {
  return await Board.findOneAndUpdate({ _id: id }, board, { new: true });
};

const deleteById = async id => {
  return (await Board.deleteOne({ _id: id })).deletedCount;
};

module.exports = { getAll, getById, addOne, updateOne, deleteById };
