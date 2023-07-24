const mongoose = require("mongoose");


const userSchema = mongoose.Schema(
    {
        passwordHash: {
            type: String,
            required: [true, "Set password for user"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            trim: true,
            index: true,
        },
        name: {
            type: String,
            default: "Name",
        },
        surname: {
            type: String,
            default: "Surname",
        },
        adress: {
            type: String,
            default: "Adress",
        },
        phone: {
            type: String,
            unique: true,
            default: "+380000000000",
        },
        sessionKey: {
            type: String,
            default: null,
            trim: true,
        },
        refreshToken: {
            type: String,
        },
        accessToken: {
            type: String,
        },

        avatar: {
            type: String,
            // required: true,
        },


        // verify: {
        //     type: Boolean,
        //     default: false,
        // },
        // verificationToken: {
        //     type: String,
        //     // required: [true, 'Verify token is required'],
        //     // default: "",
        // },

    },
    {
        versionKey: false,
        timestamps: false,
    }
);

const UserModel = mongoose.model("user", userSchema);

module.exports = {
    UserModel,
};