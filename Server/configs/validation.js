const joi = require('joi');

const userValidation = data=>{
    const userSchema = joi.object({
        displayName: joi.string().required(),
        account: joi.string().lowercase().required(),
        email: joi.string().email().lowercase().required(),
        password: joi.string().min(8).max(16).required().alphanum()
    });
    return userSchema.validate(data);
}

const loginValidation = data=>{
    const userSchema = joi.object({
        account: joi.string().lowercase().required(),
        password: joi.string().min(8).max(16).required().alphanum()
    });
    return userSchema.validate(data);
}

module.exports ={
    userValidation,
    loginValidation
};

