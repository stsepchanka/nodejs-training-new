const Joi = require('joi');

const schema = Joi.object().keys({
  id: Joi.string()
    .uuid()
    .optional(),
  title: Joi.string().required(),
  order: Joi.number().required(),
  description: Joi.string().optional(),
  userId: Joi.string()
    .uuid()
    .optional()
    .allow(null),
  boardId: Joi.string()
    .uuid()
    .optional()
    .allow(null),
  columnId: Joi.string()
    .uuid()
    .optional()
    .allow(null)
});

module.exports = schema;
