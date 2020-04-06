const users = [
  {
    id: '581e2be4-a245-4dfe-aabd-4af218a3422a',
    name: 'Petr Petrov',
    login: 'petr_petrov',
    password: 'petr12345'
  },
  {
    id: '73dc5e41-a308-4188-8c79-888c9c866c9d',
    name: 'Nikolai Nikolaev',
    login: 'nikolai_nikolaev',
    password: 'nikolai12345'
  },
  {
    id: '72656ba6-db0d-4cdd-bdc6-ea99f5129013',
    name: 'Semen Semenov',
    login: 'semen_semenov',
    password: 'semen12345'
  }
];

const getAll = async () => {
  return users;
};

const getById = async id => {
  const index = findUserIndex(id);

  return users[index];
};

const addOne = async newUser => {
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
