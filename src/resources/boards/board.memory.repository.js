const boards = require('./boards.data');
const Board = require('./board.model');
const Column = require('./columns/column.model');

const getAll = async () => {
  return boards;
};

const getById = async id => {
  const index = findBoardIndex(id);

  return boards[index];
};

const addOne = async data => {
  const newBoard = new Board(data);
  const columns = newBoard.columns;
  newBoard.columns = columns.map(columnData => new Column(columnData));
  if (boards.find(board => board.tilte === newBoard.title)) {
    throw new Error(`Board with title=${newBoard.title} already exists`);
  }
  boards.push(newBoard);
};

const updateOne = async (id, board) => {
  const index = findBoardIndex(id);

  boards[index] = board;

  return boards[index];
};

const deleteById = async id => {
  const index = findBoardIndex(id);

  boards.splice(index, 1);
};

const findBoardIndex = id => {
  const index = boards.findIndex(board => board.id === id);

  if (index > -1) {
    return index;
  }

  throw new Error(`Board with id=${id} is not found`);
};

module.exports = { getAll, getById, addOne, updateOne, deleteById };
