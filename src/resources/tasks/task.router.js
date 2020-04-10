const HttpStatus = require('http-status-codes');
const router = require('express').Router({ mergeParams: true });
const tasksService = require('./task.service');
const taskSchema = require('./task.schema');
const validateSchema = require('../../middleware/validate_schema');

router.route('/').get(async (req, res) => {
  const tasks = await tasksService.getAll(req.params.boardId);
  res.json(tasks);
});

router.route('/:id').get(async (req, res) => {
  try {
    const task = await tasksService.getById(req.params.boardId, req.params.id);
    res.json(task);
  } catch (err) {
    res.status(HttpStatus.NOT_FOUND).send(err);
  }
});

router.route('/').post(validateSchema(taskSchema), async (req, res) => {
  try {
    const task = await tasksService.addOne(req.params.boardId, req.body);
    res.json(task);
  } catch (err) {
    res.status(HttpStatus.BAD_REQUEST).send(err);
  }
});

router.route('/:id').put(validateSchema(taskSchema), async (req, res) => {
  try {
    const task = await tasksService.updateOne(
      req.params.boardId,
      req.params.id,
      req.body
    );
    res.json(task);
  } catch (err) {
    res.status(HttpStatus.NOT_FOUND).send(err);
  }
});

router.route('/:id').delete(async (req, res) => {
  try {
    await tasksService.deleteById(req.params.boardId, req.params.id);
    res.json(HttpStatus.NO_CONTENT);
  } catch (err) {
    res.status(HttpStatus.NOT_FOUND).send(err);
  }
});

module.exports = router;
