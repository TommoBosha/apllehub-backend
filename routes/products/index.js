const express = require("express");

const { controllerWrapper } = require("../../services");
const { getCategoryProducts } = require("../../controllers/products/getProductsByCategory");

const router = express.Router();

router.get("/", getCategoryProducts);

// router.get("/find", controllerWrapper(noticesController.getProductByTitle));





module.exports = router;