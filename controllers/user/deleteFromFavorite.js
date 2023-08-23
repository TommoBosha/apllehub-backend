const { UserModel } = require("../../database/models/user.model");

const deleteFavoriteProduct = async (req, res, next) => {
    const { id } = req.params;
    const { _id } = req.user;

    const userdel = await UserModel.findById(_id);
    const productExists = userdel.favorite.some((item) => item == id);

    if (!productExists) {
        return res.status(400).json({
            message: "This entry is not in your favorites list",
        });
    }

    const user = await UserModel.findByIdAndUpdate(
        _id,
        { $pull: { favorite: id } },
        { new: true }
    )
        .populate("favorite")
        .select("-passwordHash -sessionKey -products")
        .exec();

    if (!user) {
        return res.status(400).json({
            message: "The user does not exist",
        });
    }

    res.json({ user });
};

module.exports = {
    deleteFavoriteProduct,
};