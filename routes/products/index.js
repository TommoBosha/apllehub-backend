const express = require("express");

const { controllerWrapper } = require("../../services");
const { getCategoryProducts } = require("../../controllers/products/getProductsByCategory");
const { getProductsByTitle } = require("../../controllers/products/findProductByTitle");
const { getOneProduct } = require("../../controllers/products/getOneProduct");

const router = express.Router();

router.get("/", getCategoryProducts);
router.get("/find", controllerWrapper(getProductsByTitle));
router.get("/:id", controllerWrapper(getOneProduct));







module.exports = router;