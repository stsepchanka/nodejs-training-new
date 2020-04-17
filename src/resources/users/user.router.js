const HttpStatus = require('http-status-codes');
const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const userSchema = require('./user.schema');
const validateSchema = require('./../../middleware/validate_schema');
const { ValidationError } = require('./../../errors/validation.error');
const { NotFoundError } = require('./../../errors/not_found.error');

router.route('/').get(async (req, res, next) => {
  try {
    const users = await usersService.getAll();
    res.json(users.map(User.toResponse));
  } catch (err) {
    return next(new Error(err));
  }
});

router.route('/:id').get(async (req, res, next) => {
  try {
    const user = await usersService.getById(req.params.id);
    res.json(User.toResponse(user));
  } catch (err) {
    return next(new NotFoundError(err.message));
  }
});

router.route('/').post(validateSchema(userSchema), async (req, res, next) => {
  try {
    const user = await usersService.addOne(req.body);
    res.json(User.toResponse(user));
  } catch (err) {
    return next(new ValidationError(err.message));
  }
});

router.route('/:id').put(validateSchema(userSchema), async (req, res, next) => {
  try {
    const user = await usersService.updateOne(req.params.id, req.body);
    res.json(User.toResponse(user));
  } catch (err) {
    return next(new NotFoundError(err));
  }
});

router.route('/:id').delete(async (req, res, next) => {
  try {
    await usersService.deleteById(req.params.id);
    res.json(HttpStatus.NO_CONTENT);
  } catch (err) {
    return next(new NotFoundError(err));
  }
});

module.exports = router;
