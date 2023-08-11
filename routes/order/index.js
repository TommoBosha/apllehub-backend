const express = require("express");
const { controllerWrapper } = require("../../services");
const { userAuthMiddleware } = require("../../middlewares/user-auth.middlewares");
const { orderCreate } = require("../../controllers/order-controllers");




const router = express.Router();

router.post("/add-order", controllerWrapper(orderCreate));



module.exports = router;