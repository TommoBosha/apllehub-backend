const Joi = require("joi");

const addOrderSchema = Joi.object({
    name: Joi.string().required().min(1).max(30).pattern(/^[\p{L}\s]+$/u).messages({
        "any.required": '"name" is required',
    }),
    phone: Joi.string().required().pattern(new RegExp(/^\+380\d{9}$/)).messages({
        "any.required": '"phone" is required',
        "string.pattern.base": 'Invalid "phone" format',
    }),
    email: Joi.string().pattern(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/).required().messages({
        "any.required": '"email" is required',
        "string.pattern.base": 'Invalid "email" format',
    }),
    comment: Joi.string().required().min(0).max(1000).messages({
        "string.min": `"name" should have a minimum length of {#limit}`,
        "string.max": `"name" should have a maximum length of {#limit}`,
    }),
    communicateBy: Joi.array()
        .required()
        .messages({
            "any.required": '"communicateBy" is required',
        }),
});

module.exports = {
    addOrderSchema,
};