const tasks = [
  {
    id: '581e2be4-a245-4dfe-aabd-4af218a3477a',
    title: 'Task 1',
    order: 1,
    description: 'task 1',
    userId: null,
    boardId: '73dc5e41-a308-4188-8c79-888c9c86611d',
    columnId: '73dc5e41-a308-4188-8c79-888c9c86622d'
  },
  {
    id: '73dc5e41-a308-4188-8c79-888c9c866c9d',
    title: 'Task 2',
    order: 2,
    description: 'task 2',
    userId: null,
    boardId: '73dc5e41-a308-4188-8c79-888c9c86611d',
    columnId: '73dc5e41-a308-4188-8c79-888c9c86633d'
  },
  {
    id: '72656ba6-db0d-4cdd-bdc6-ea99f5129013',
    title: 'Task 3',
    order: 1,
    description: 'task 3',
    userId: null,
    boardId: '72656ba6-db0d-4cdd-bdc6-ea99f5129223',
    columnId: '72656ba6-db0d-4cdd-bdc6-ea99f5129333'
  }
];

const getAll = async boardId => {
  return findTasksByBoardId(boardId);
};

const getById = async (boardId, id) => {
  const index = findTaskIndex(boardId, id);

  return tasks[index];
};

const addOne = async newTask => {
  tasks.push(newTask);
};

const updateOne = async (boardId, id, task) => {
  const index = findTaskIndex(boardId, id);

  tasks[index] = task;

  return tasks[index];
};

const deleteById = async (boardId, id) => {
  const index = findTaskIndex(boardId, id);
  tasks.splice(index, 1);
};

const findTaskIndex = (boardId, id) => {
  const index = tasks.findIndex(
    task => task.id === id && task.boardId === boardId
  );

  if (index > -1) {
    return index;
  }

  throw new Error(
    `Task with id=${id} and with boardId=${boardId} is not found `
  );
};

const findTasksByBoardId = boardId => {
  return tasks.filter(task => task.boardId === boardId);
};

module.exports = { getAll, getById, addOne, updateOne, deleteById };
