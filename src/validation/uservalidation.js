const joi = require("joi")
const userValidation = joi.object({
    username: joi.string().min(5).required(),
    email: joi.string().email().required(),
    password: joi.string().min(5).max(11).required(),
    role: joi.string()
})

module.exports = userValidation