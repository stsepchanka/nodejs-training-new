const users = require('../resources/users/users.data');
const User = require('../resources/users/user.db.model');

const usersData = users.map(user => {
  return new User(user);
});

module.exports = { usersData };
