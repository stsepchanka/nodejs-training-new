const jwt = require('../common/jwt');
const { UnauthorizedError } = require('./../errors/unauthorized.error');

const authorize = (req, res, next) => {
  let token = req.headers.authorization;

  if (token) {
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length);
    }
    jwt.verifyToken(token, err => {
      if (err) {
        return next(new UnauthorizedError('Failed authentication token'));
      }
      return next();
    });
  } else {
    return next(new UnauthorizedError('Failed authentication token'));
  }
};

module.exports = { authorize };
