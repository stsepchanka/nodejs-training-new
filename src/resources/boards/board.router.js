const HttpStatus = require('http-status-codes');
const router = require('express').Router();
const boardsService = require('./board.service');
const boardSchema = require('./board.schema');
const validateSchema = require('../../middleware/validate_schema');

router.route('/').get(async (req, res) => {
  const Boards = await boardsService.getAll();
  res.json(Boards);
});

router.route('/:id').get(async (req, res) => {
  try {
    const board = await boardsService.getById(req.params.id);
    res.json(board);
  } catch (err) {
    res.status(HttpStatus.NOT_FOUND).send(err);
  }
});

router.route('/').post(validateSchema(boardSchema), async (req, res) => {
  try {
    const board = await boardsService.addOne(req.body);
    res.json(board);
  } catch (err) {
    res.status(HttpStatus.BAD_REQUEST).send(err);
  }
});

router.route('/:id').put(validateSchema(boardSchema), async (req, res) => {
  try {
    const board = await boardsService.updateOne(req.params.id, req.body);
    res.json(board);
  } catch (err) {
    res.status(HttpStatus.NOT_FOUND).send(err);
  }
});

router.route('/:id').delete(async (req, res) => {
  try {
    await boardsService.deleteById(req.params.id);
    res.json(HttpStatus.NO_CONTENT);
  } catch (err) {
    res.status(HttpStatus.NOT_FOUND).send(err);
  }
});

module.exports = router;
