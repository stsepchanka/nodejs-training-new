const boardsRepo = require('./board.memory.repositiory');
const Board = require('./board.model');
const Column = require('./columns/column.model');

const getAll = () => boardsRepo.getAll();

const getById = id => boardsRepo.getById(id);

const addOne = async data => {
  const board = new Board(data);
  const columns = board.columns;
  board.columns = columns.map(columnData => new Column(columnData));
  await boardsRepo.addOne(board);
  return board;
};

const updateOne = (id, board) => boardsRepo.updateOne(id, board);

const deleteById = async boardId => boardsRepo.deleteById(boardId);

module.exports = { getAll, getById, addOne, updateOne, deleteById };
