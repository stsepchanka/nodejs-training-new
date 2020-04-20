const HttpStatus = require('http-status-codes');
const router = require('express').Router();
const boardService = require('./board.service');
const boardSchema = require('./board.schema');
const Board = require('./board.db.model');
const validateSchema = require('../../middleware/validate_schema');
const { NotFoundError } = require('./../../errors/not_found.error');

router.route('/').get(async (req, res, next) => {
  try {
    const boards = await boardService.getAll();
    res.json(boards.map(Board.toResponse));
  } catch (err) {
    return next(err);
  }
});

router.route('/:id').get(async (req, res, next) => {
  try {
    const board = await boardService.getById(req.params.id);
    if (board) {
      res.json(Board.toResponse(board));
    } else {
      throw new NotFoundError('Board is not found');
    }
  } catch (err) {
    return next(err);
  }
});

router.route('/').post(validateSchema(boardSchema), async (req, res, next) => {
  try {
    const board = await boardService.addOne(req.body);
    res.json(Board.toResponse(board));
  } catch (err) {
    return next(err);
  }
});

router
  .route('/:id')
  .put(validateSchema(boardSchema), async (req, res, next) => {
    try {
      const board = await boardService.updateOne(req.params.id, req.body);
      if (board) {
        res.json(Board.toResponse(board));
      } else {
        throw new NotFoundError('Board is not found');
      }
    } catch (err) {
      return next(err);
    }
  });

router.route('/:id').delete(async (req, res, next) => {
  try {
    const deletedCount = await boardService.deleteById(req.params.id);
    if (deletedCount) {
      res.json(HttpStatus.NO_CONTENT);
    } else {
      throw new NotFoundError('Board is not found');
    }
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
