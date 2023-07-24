const { UserModel } = require("../../database/models/user.model");
const { addUserSchema } = require("../../schemas/add-user.schema");
const { createHash, createHttpException } = require("../../services");
const { REGISTER_IMAGE } = require("../../utils");

const signUp = async (req, res, next) => {
    const { email, password, name, surname, phone } = req.body;

    const { error } = addUserSchema.validate({ email, password });
    if (error) {
        const invalidField = error.details[0].path[0];
        throw createHttpException(
            400,
            `Missing or not valid field ${invalidField} => ${error.message}`
        );
    }

    const userWithEmail = await UserModel.findOne({ email });
    if (userWithEmail) {
        throw createHttpException(409, "Email in use");
    }

    const userWithPhone = await UserModel.findOne({ phone });
    if (userWithPhone) {
        throw createHttpException(409, "Phone number already in use");
    }

    const passwordHash = await createHash(password);
    const image = REGISTER_IMAGE;

    const newUser = await UserModel.create({
        email,
        passwordHash,
        name,
        surname,
        phone,
        image,
    });

    res.status(201).json({
        user: {
            id: newUser._id,
            email: newUser.email,
            name: newUser.name,
            surname: newUser.surname,
            phone: newUser.phone,
            image: newUser.image,
            isNewUser: true,
        },
    });
};

module.exports = {
    signUp,
};