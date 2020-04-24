const router = require('express').Router();
const jwt = require('./../common/jwt');
const usersService = require('./../resources/users/user.service');
const { ForbiddenError } = require('./../errors/forbidden.error');

router.route('/').post(async (req, res, next) => {
  try {
    const user = await usersService.getByLoginAndPassword(
      req.body.login,
      req.body.password
    );
    if (user) {
      const { id, login } = user;
      const token = jwt.getToken({ id, login });
      res.send({ token });
    } else {
      throw new ForbiddenError('Access is forbidden');
    }
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
