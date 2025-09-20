const Joi = require('joi');

const passwordSchema = Joi.string()
  .min(8)
  .max(128)
  .pattern(new RegExp('(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#\\$%\\^&\\*])'))
  .messages({
    'string.min': 'Password should have at least 8 characters',
    'string.pattern.base': 'Password must include upper, lower, number and special character'
  });

module.exports = { passwordSchema };
