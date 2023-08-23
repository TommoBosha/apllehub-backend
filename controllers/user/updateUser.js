const { UserModel } = require("../../database/models/user.model");
const { updateUserSchema } = require("../../schemas/update-user.schema");
const { createHttpException } = require("../../services");

const updateUser = async (req, res, next) => {
    const user = req.user;
    const { name, email, phone } = req.body;

    const { error } = updateUserSchema.validate({
        name,
        email,
        phone,
    });
    if (error) {
        const invalidField = error.details[0].path[0];
        throw createHttpException(
            400,
            `Missing or not valid field ${invalidField} => ${error.message}`
        );
    }

    const result = await UserModel.findByIdAndUpdate(
        user._id,
        {
            name,
            email,
            phone,

        },
        { new: true }
    )
        .select("-passwordHash -sessionKey -favorite -products")
        .exec()
        .catch((error) => {
            throw createHttpException(400, error.message);
        });

    if (result === null) {
        throw createHttpException(404, "Not found");
    }

    res.json(result);
};

module.exports = {
    updateUser,
};