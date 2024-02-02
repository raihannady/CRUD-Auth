const Joi = require("joi");
const Boom = require("boom");

const studentValidation = (data) => {
  const schema = Joi.object({
    fullname: Joi.string().optional().description("fullname of student"),
    nickname: Joi.string().optional().description("nickname of student"),
    lecturer_id: Joi.number().optional().description("lecturer id"),
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const registerValidation = (data) => {
  const schema = Joi.object({
    fullname: Joi.string().required().description("Person's full name"),
    email: Joi.string().required().description("Active email"),
    password: Joi.string()
      .min(8)
      .max(20)
      .required()
      .description("Should be between 8-20 characters"),
    // confirmPassword: Joi.string().min(8).max(20).required().valid(Joi.ref('password')).description('Should match password')
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().description("Active email"),
    password: Joi.string()
      .min(8)
      .max(20)
      .required()
      .description("Should be between 8-20 characters"),
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

module.exports = {
  studentValidation,
  registerValidation,
  loginValidation,
};
