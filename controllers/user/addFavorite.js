const { UserModel } = require("../../database/models/user.model");
const { ProductsModel } = require("../../database/models/product.model");
const { createHttpException } = require("../../services");

const addProductToFavirite = async (req, res, next) => {
    const { id } = req.params;
    const { _id } = req.user;

    const products = await ProductsModel.findById(id).catch((error) => {
        throw createHttpException(404, "This entry is not found");
    });

    const user = await UserModel.findOneAndUpdate(
        { _id, favorite: { $ne: id } },
        { $push: { favorite: id } },
        { new: true }
    ).populate("favorite");

    if (!user) {
        return res.status(400).json({
            message: "This entry has already been added to the favorites list",
        });
    }

    const userWithProducts = await UserModel.findById(user._id)
        .populate("favorite")
        .select("-passwordHash -sessionKey -products")
        .exec();

    res.json({ user: userWithProducts });
};

module.exports = {
    addProductToFavirite,
};