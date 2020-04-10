const HttpStatus = require('http-status-codes');
const router = require('express').Router();
const boardsService = require('./board.service');
const boardSchema = require('./board.schema');
const validateSchema = require('../../middleware/validate_schema');
const { ValidationError } = require('./../../errors/validation.error');
const { NotFoundError } = require('./../../errors/not_found.error');

router.route('/').get(async (req, res) => {
  const Boards = await boardsService.getAll();
  res.json(Boards);
});

router.route('/:id').get(async (req, res, next) => {
  try {
    const board = await boardsService.getById(req.params.id);
    res.json(board);
  } catch (err) {
    return next(new NotFoundError(err.message));
  }
});

router.route('/').post(validateSchema(boardSchema), async (req, res, next) => {
  try {
    const board = await boardsService.addOne(req.body);
    res.json(board);
  } catch (err) {
    return next(new ValidationError(err.message));
  }
});

router
  .route('/:id')
  .put(validateSchema(boardSchema), async (req, res, next) => {
    try {
      const board = await boardsService.updateOne(req.params.id, req.body);
      res.json(board);
    } catch (err) {
      return next(new NotFoundError(err.message));
    }
  });

router.route('/:id').delete(async (req, res, next) => {
  try {
    await boardsService.deleteById(req.params.id);
    res.json(HttpStatus.NO_CONTENT);
  } catch (err) {
    return next(new NotFoundError(err.message));
  }
});

module.exports = router;
