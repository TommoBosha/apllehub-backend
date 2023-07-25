const express = require("express");
const { controllerWrapper } = require("../../services");
const { signUp } = require("../../controllers/auth/sign-up");
const { signIn } = require("../../controllers/auth/sign-in");
const { userAuthMiddleware } = require("../../middlewares/user-auth.middlewares");
const { logout } = require("../../controllers/auth/logout");


const router = express.Router();

router.post("/register", controllerWrapper(signUp));
// console.log('Received request to /register');

router.post("/login", controllerWrapper(signIn));
// console.log('Received request to /login');

router.post(
    "/logout",
    userAuthMiddleware,
    controllerWrapper(logout)
);



module.exports = router;