const { Schema, model } = require("mongoose");
const { CATEGORY_TYPE, MODEL_TYPE } = require("../../enums");

const productSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            enum: Object.values(CATEGORY_TYPE),

        },
        characteristics: {
            type: Object,
            required: true,
        },
        images: {
            type: [String],
            required: true,
        },
        model: {
            type: String,
            enum: Object.values(MODEL_TYPE),

        },
        price: {
            type: String,
            required: true,
        },
        capacity: {
            type: String,
        },
        color: {
            type: String,
        },
        version: {
            type: String,
        },
        size: {
            type: String,
        },

    },
    {
        versionKey: false,
        timestamps: false,
    }
);

const ProductsModel = model("products", productSchema);

module.exports = { ProductsModel };