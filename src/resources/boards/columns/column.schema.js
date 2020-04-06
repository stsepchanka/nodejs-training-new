const Joi = require('joi');

const schema = Joi.object().keys({
  id: Joi.string()
    .uuid()
    .optional(),
  title: Joi.string().required(),
  order: Joi.number().required()
});

module.exports = schema;
