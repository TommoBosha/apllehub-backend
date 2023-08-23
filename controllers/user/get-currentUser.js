const { UserModel } = require("../../database/models/user.model");
const { ProductsModel } = require("../../database/models/product.model");

const getCurrentUser = async (req, res, next) => {
    const user = req.user;

    const result = await ProductsModel.find({ owner: user._id });
    const fav = await UserModel.findById(user._id).populate("favorite");

    res.json({
        id: user._id,
        email: user.email,
        name: user.name,
        birthday: user.birthday,
        phone: user.phone,
        city: user.city,
        avatar: user.image,
        favorite: fav.favorite,
        products: result,
    });
};

module.exports = {
    getCurrentUser,
};