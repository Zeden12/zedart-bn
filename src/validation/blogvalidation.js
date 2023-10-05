const joi = require('joi');
const blogValidation = joi.object({
    title: joi.string().min(7).required(),
    image: joi.string().required(),
    body: joi.string().min(20).required(),
    author: joi.string().min(5).required()
})

module.exports = blogValidation