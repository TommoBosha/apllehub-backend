const Joi = require("joi");
const { MODEL_TYPE } = require("../enums");


const addProductSchema = Joi.object({
    title: Joi.string().required(),
    category: Joi.string().valid("ipad", "iphone", "watch", "headphones").required(),
    characteristics: Joi.object().required(),
    images: Joi.array().items(Joi.string()).required(),
    model: Joi.string().valid(...Object.values(MODEL_TYPE)).required(),
    price: Joi.string().required(),
    capacity: Joi.string(),
    color: Joi.string(),
    version: Joi.string(),
    size: Joi.string(),
});

const getCategorySchema = Joi.object({
    category: Joi.string().valid("ipad", "iphone", "watch", "headphones"),
    model: Joi.string().valid(...Object.values(MODEL_TYPE)),
});

module.exports = {
    addProductSchema,
    getCategorySchema
};