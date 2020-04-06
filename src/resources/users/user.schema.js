const Joi = require('joi');

const schema = Joi.object().keys({
  id: Joi.string()
    .uuid()
    .optional(),
  name: Joi.string().required(),
  login: Joi.string().required(),
  password: Joi.string().required()
});

module.exports = schema;
