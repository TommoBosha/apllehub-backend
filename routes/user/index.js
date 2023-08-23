const express = require("express");
const { controllerWrapper } = require("../../services");
const { userAuthMiddleware } = require("../../middlewares/user-auth.middlewares");
const { getCurrentUser } = require("../../controllers/user/get-currentUser");
const { updateUser } = require("../../controllers/user/updateUser");
const { handleUpload } = require("../../middlewares/uploadCloud");
const { updateAvatar } = require("../../controllers/user/updateAvatar");
const { addProductToFavirite } = require("../../controllers/user/addFavorite");
const { getFavoriteProducts } = require("../../controllers/user/getFavorite");
const { deleteFavoriteProduct } = require("../../controllers/user/deleteFromFavorite");

const router = express.Router();

router.get(
    "/current",
    userAuthMiddleware,
    controllerWrapper(getCurrentUser)
);

router.patch(
    "/update",
    userAuthMiddleware,
    controllerWrapper(updateUser)
);

router.patch(
    "/avatar",
    handleUpload,
    userAuthMiddleware,
    controllerWrapper(updateAvatar)
);

router.get(
    "/favorite",
    userAuthMiddleware,
    controllerWrapper(getFavoriteProducts)
);

router.post(
    "/favorite/:id",
    userAuthMiddleware,
    controllerWrapper(addProductToFavirite)
);

router.delete(
    "/favorite/:id",
    userAuthMiddleware,
    controllerWrapper(deleteFavoriteProduct)
);

module.exports = router;