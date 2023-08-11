const { ProductsModel } = require("../../database/models/product.model");
const { getCategorySchema } = require("../../schemas/product.shema");

const getCategoryProducts = async (req, res) => {
    const { page, limit, category, model } = req.query;

    const skip = (page - 1) * limit;

    const { error } = getCategorySchema.validate({ category });
    if (error) {
        return res.status(400).json({
            error: "Invalid category",
        });
    }


    const query = {};


    if (category) {
        query.category = category;
    }

    if (model) {
        query.model = model;
    }

    try {

        const productsAll = await ProductsModel.find(query);


        const products = await ProductsModel.find(query)
            .skip(skip)
            .limit(limit);

        res.json({ products, total: productsAll.length });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch products" });
    }
};

module.exports = {
    getCategoryProducts,
};

