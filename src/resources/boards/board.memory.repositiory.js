const boards = [
  {
    id: '581e2be4-a245-4dfe-aabd-4af218a3433a',
    title: 'Project 1',
    columns: [
      {
        id: '581e2be4-a245-4dfe-aabd-4af218a3444a',
        title: 'Backlog',
        order: 1
      },
      { id: '581e2be4-a245-4dfe-aabd-4af218a3455a', title: 'Sprint', order: 2 }
    ]
  },
  {
    id: '73dc5e41-a308-4188-8c79-888c9c86611d',
    title: 'Project 2',
    columns: [
      {
        id: '73dc5e41-a308-4188-8c79-888c9c86622d',
        title: 'Backlog',
        order: 1
      },
      { id: '73dc5e41-a308-4188-8c79-888c9c86633d', title: 'Sprint', order: 2 }
    ]
  },
  {
    id: '72656ba6-db0d-4cdd-bdc6-ea99f5129223',
    title: 'Project 3',
    columns: [
      {
        id: '72656ba6-db0d-4cdd-bdc6-ea99f5129333',
        title: 'Backlog',
        order: 1
      },
      { id: '72656ba6-db0d-4cdd-bdc6-ea99f5129443', title: 'Sprint', order: 2 }
    ]
  }
];

const getAll = async () => {
  return boards;
};

const getById = async id => {
  const index = findBoardIndex(id);

  return boards[index];
};

const addOne = async newBoard => {
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
