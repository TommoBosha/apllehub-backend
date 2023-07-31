const { ProductsModel } = require("../../database/models/product.model");
const { getCategorySchema } = require("../../schemas/product.shema");


const getCategoryProducts = async (req, res) => {
    const { page, limit, category } = req.query;

    const skip = (page - 1) * limit;

    const { error } = getCategorySchema.validate({ category });
    if (error) {
        return res.status(400).json({
            error:
                'Invalid category',
        });
    }

    const productsAll = await ProductsModel.find({
        category: category,
    });
    const products = await ProductsModel.find({
        category: category,
    })
        .skip(skip)
        .limit(limit);

    res.json({ products, total: productsAll.length });
};

module.exports = {
    getCategoryProducts,
};