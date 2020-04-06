const boardsRepo = require('./board.memory.repository');
const tasksRepo = require('./../tasks/task.memory.repository');
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

const deleteById = async boardId => {
  await boardsRepo.deleteById(boardId);
  const tasks = await tasksRepo.getAll(boardId);
  if (tasks) {
    await Promise.all(
      tasks.map(task => tasksRepo.deleteById(boardId, task.id))
    );
  }
};

module.exports = { getAll, getById, addOne, updateOne, deleteById };
