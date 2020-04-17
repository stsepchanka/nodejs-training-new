const HttpStatus = require('http-status-codes');
const router = require('express').Router({ mergeParams: true });
const Task = require('./task.db.model');
const tasksService = require('./task.service');
const taskSchema = require('./task.schema');
const validateSchema = require('../../middleware/validate_schema');
const { ValidationError } = require('./../../errors/validation.error');
const { NotFoundError } = require('./../../errors/not_found.error');

router.route('/').get(async (req, res, next) => {
  try {
    const tasks = await tasksService.getAll(req.params.boardId);
    res.json(tasks.map(Task.toResponse));
  } catch (err) {
    return next(new Error(err));
  }
});

router.route('/:id').get(async (req, res, next) => {
  try {
    const task = await tasksService.getById(req.params.boardId, req.params.id);
    res.json(Task.toResponse(task));
  } catch (err) {
    return next(new NotFoundError(err.message));
  }
});

router.route('/').post(validateSchema(taskSchema), async (req, res, next) => {
  try {
    const task = await tasksService.addOne(req.params.boardId, req.body);
    res.json(Task.toResponse(task));
  } catch (err) {
    return next(new ValidationError(err.message));
  }
});

router.route('/:id').put(validateSchema(taskSchema), async (req, res, next) => {
  try {
    const task = await tasksService.updateOne(
      req.params.boardId,
      req.params.id,
      req.body
    );
    res.json(Task.toResponse(task));
  } catch (err) {
    return next(new NotFoundError(err.message));
  }
});

router.route('/:id').delete(async (req, res, next) => {
  try {
    await tasksService.deleteById(req.params.boardId, req.params.id);
    res.json(HttpStatus.NO_CONTENT);
  } catch (err) {
    return next(new NotFoundError(err.message));
  }
});

module.exports = router;
