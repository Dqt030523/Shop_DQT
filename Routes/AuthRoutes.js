const authController = require("../Controllers/Auth/AuthControllers");

const router = require("express").Router();

router.post("/register", authController.registerCustomer);

router.post("/login", authController.loginCustomer);

router.post("/refresh", authController.requestRefreshToken);

router.post("/logout", authController.logoutCustomer);

module.exports = router;
