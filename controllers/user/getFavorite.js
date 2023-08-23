const { UserModel } = require("../../database/models/user.model");

const getFavoriteProducts = async (req, res, next) => {
    const user = req.user;
    const { title, page, limit } = req.query;

    const result = await UserModel.findById(user._id).populate("favorite");

    const regex = new RegExp(title, "i");

    let favoriteProductsAll = result.favorite.filter((product) =>
        regex.test(product.title)
    );
    let favoriteProducts = result.favorite.filter((product) =>
        regex.test(product.title)
    );

    if (page && limit) {
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        favoriteProducts = favoriteProducts.slice(startIndex, endIndex);
    }

    const match = {
        id: user._id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        address: user.city,
        avatar: user.avatar,
        favorite: favoriteProducts,
    };

    res.json({ user: match, total: favoriteProductsAll.length });
};

module.exports = {
    getFavoriteProducts,
};