const mongoose = require("mongoose");

const MESSENGERS = ["email", "telegram", "viber"];

const OrderSchema = mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: [true, '"name" is required'],
        },
        comment: {
            type: String,
            trim: true,
            min: 0,
            max: 1000,
            default: "",
        },
        phone: {
            type: String,
            trim: true,
            required: [true, '"phone" is required'],
            match: /^\+380\d{9}$/,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            trim: true,
        },
        communicateBy: [
            {
                type: String,
                enum: MESSENGERS,
            },
        ],


    },
    {
        versionKey: false,
        timestamps: true
    }
);

const OrderModel = mongoose.model("order", OrderSchema);

module.exports = {
    OrderModel,
};