const Joi = require('joi');
const columnSchema = require('./columns/column.schema');

const schema = Joi.object().keys({
  id: Joi.string()
    .uuid()
    .optional(),
  title: Joi.string().required(),
  columns: Joi.array().items(columnSchema)
});

module.exports = schema;
