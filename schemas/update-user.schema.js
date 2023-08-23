const Joi = require("joi");
const { PHONE_REGEXP, EMAIL_REGEXP } = require("../utils");

const updateUserSchema = Joi.object({
    name: Joi.string().allow(""),
    email: Joi.string().trim().regex(EMAIL_REGEXP),
    phone: Joi.string().regex(PHONE_REGEXP),
    address: Joi.object({
        city: Joi.string(),
        street: Joi.string(),
        building: Joi.string(),
        apartment: Joi.string(),
    }).allow(""),
});

module.exports = {
    updateUserSchema,
};