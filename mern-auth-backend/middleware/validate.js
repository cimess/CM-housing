// usage: validate(schema)
const Joi = require('joi');

function validate(schema) {
  return (req, res, next) => {
    const toValidate = {};
    if (schema.body) toValidate.body = req.body;
    if (schema.params) toValidate.params = req.params;
    if (schema.query) toValidate.query = req.query;
    const result = Joi.compile(schema).validate(toValidate, { abortEarly: false });
    if (result.error) {
      return res.status(400).json({ error: result.error.details.map(d => d.message) });
    }
    next();
  };
}

module.exports = validate;
