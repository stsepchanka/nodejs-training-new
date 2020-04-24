const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('./../common/config');

const getToken = payload => {
  return jwt.sign(payload, JWT_SECRET_KEY, {
    expiresIn: 600
  });
};

const verifyToken = (token, cb) => {
  jwt.verify(token, JWT_SECRET_KEY, cb);
};

module.exports = { getToken, verifyToken };
