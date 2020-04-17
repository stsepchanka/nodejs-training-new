const HttpStatus = require('http-status-codes');
const router = require('express').Router();
const boardService = require('./board.service');
const boardSchema = require('./board.schema');
const Board = require('./board.db.model');
const validateSchema = require('../../middleware/validate_schema');
const { ValidationError } = require('./../../errors/validation.error');
const { NotFoundError } = require('./../../errors/not_found.error');

router.route('/').get(async (req, res, next) => {
  try {
    const boards = await boardService.getAll();
    res.json(boards.map(Board.toResponse));
  } catch (err) {
    return next(new Error(err));
  }
});

router.route('/:id').get(async (req, res, next) => {
  try {
    const board = await boardService.getById(req.params.id);
    res.json(Board.toResponse(board));
  } catch (err) {
    return next(new NotFoundError(err.message));
  }
});

router.route('/').post(validateSchema(boardSchema), async (req, res, next) => {
  try {
    const board = await boardService.addOne(req.body);
    res.json(Board.toResponse(board));
  } catch (err) {
    return next(new ValidationError(err.message));
  }
});

router
  .route('/:id')
  .put(validateSchema(boardSchema), async (req, res, next) => {
    try {
      const board = await boardService.updateOne(req.params.id, req.body);
      res.json(Board.toResponse(board));
    } catch (err) {
      return next(new NotFoundError(err.message));
    }
  });

router.route('/:id').delete(async (req, res, next) => {
  try {
    await boardService.deleteById(req.params.id);
    res.json(HttpStatus.NO_CONTENT);
  } catch (err) {
    return next(new NotFoundError(err.message));
  }
});

module.exports = router;
