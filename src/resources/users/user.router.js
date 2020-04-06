const HttpStatus = require('http-status-codes');
const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const userSchema = require('./user.schema');
const validateSchema = require('./../../middleware/validate_schema');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  // map user fields to exclude secret fields like "password"
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  try {
    const user = await usersService.getById(req.params.id);
    res.json(User.toResponse(user));
  } catch (err) {
    res.status(HttpStatus.NOT_FOUND).send(err);
  }
});

router.route('/').post(validateSchema(userSchema), async (req, res) => {
  try {
    const user = await usersService.addOne(req.body);
    res.json(User.toResponse(user));
  } catch (err) {
    res.status(HttpStatus.BAD_REQUEST).send(err);
  }
});

router.route('/:id').put(validateSchema(userSchema), async (req, res) => {
  try {
    const user = await usersService.updateOne(req.params.id, req.body);
    res.json(User.toResponse(user));
  } catch (err) {
    res.status(HttpStatus.NOT_FOUND).send(err);
  }
});

router.route('/:id').delete(async (req, res) => {
  try {
    await usersService.deleteById(req.params.id);
    res.json(HttpStatus.NO_CONTENT);
  } catch (err) {
    res.status(HttpStatus.NOT_FOUND).send(err);
  }
});

module.exports = router;
