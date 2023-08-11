const { ProductsModel } = require("../../database/models/product.model");
const { createHttpException } = require("../../services");

const getProductsByTitle = async (req, res) => {
    const { title, page, limit } = req.query;

    const skip = (page - 1) * limit;

    if (!title) {
        throw createHttpException(404, "Not found");
    }

    const regex = new RegExp(title, "i");
    const resultAll = await ProductsModel.find({ title: regex });
    const result = await ProductsModel.find({ title: regex })
        .skip(skip)
        .limit(limit);

    if (result.length === 0) {
        throw createHttpException(404, "Not found");
    }

    res.json({ products: result, total: resultAll.length });
};

module.exports = { getProductsByTitle };