const HttpStatus = require('http-status-codes');
const router = require('express').Router();
const User = require('./user.db.model');
const usersService = require('./user.service');
const userSchema = require('./user.schema');
const validateSchema = require('./../../middleware/validate_schema');
const { NotFoundError } = require('./../../errors/not_found.error');

router.route('/').get(async (req, res, next) => {
  try {
    const users = await usersService.getAll();
    res.json(users.map(User.toResponse));
  } catch (err) {
    return next(err);
  }
});

router.route('/:id').get(async (req, res, next) => {
  try {
    const user = await usersService.getById(req.params.id);
    if (user) {
      res.json(User.toResponse(user));
    } else {
      throw new NotFoundError('User is not found');
    }
  } catch (err) {
    return next(err);
  }
});

router.route('/').post(validateSchema(userSchema), async (req, res, next) => {
  try {
    const user = await usersService.addOne(req.body);
    res.json(User.toResponse(user));
  } catch (err) {
    return next(err);
  }
});

router.route('/:id').put(validateSchema(userSchema), async (req, res, next) => {
  try {
    const user = await usersService.updateOne(req.params.id, req.body);
    if (user) {
      res.json(User.toResponse(user));
    } else {
      throw new NotFoundError('User is not found');
    }
  } catch (err) {
    return next(err);
  }
});

router.route('/:id').delete(async (req, res, next) => {
  try {
    const deletedCount = await usersService.deleteById(req.params.id);
    if (deletedCount) {
      res.json(HttpStatus.NO_CONTENT);
    } else {
      throw new NotFoundError('User is not found');
    }
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
