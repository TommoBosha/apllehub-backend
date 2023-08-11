const { ProductsModel } = require("../../database/models/product.model");
const { createHttpException } = require("../../services");

const getOneProduct = async (req, res) => {
    const { id } = req.params;

    const result = await ProductsModel.findById(id);

    if (!result) {
        throw createHttpException(404, "Not found");
    }

    res.json(result);
};

module.exports = {
    getOneProduct,
};