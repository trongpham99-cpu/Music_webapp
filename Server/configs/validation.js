const joi = require('joi');

const userValidation = data=>{
    const userSchema = joi.object({
        email: joi.string().email().lowercase().required(),
        password: joi.string().min(8).max(16).required().alphanum()
    });
    return userSchema.validate(data);
}

module.exports ={
    userValidation
};

