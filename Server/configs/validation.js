const Joi = require("joi");

const userValidate = (email, password) => {
  const userSchema = Joi.object({
    email: Joi.string().lowercase().required(),
    password: Joi.string().min(4).max(32).required(),
  });

  return userSchema.validate(data);
};

module.exports = {
  userValidate,
};
