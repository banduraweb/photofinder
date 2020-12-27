const Joi = require('joi');

class Validation {
  static registrationValidation(body) {
    const schema = Joi.object({
      name: Joi.string().min(3).required(),
      email: Joi.string().min(3).required().email(),
      password: Joi.string().min(3).required(),
    });
    return schema.validate(body);
  }

  static loginValidation(body) {
    const schema = Joi.object({
      email: Joi.string().min(3).required().email(),
      password: Joi.string().min(3).required(),
    });
    return schema.validate(body);
  }
}

module.exports = Validation;
