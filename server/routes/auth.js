const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { validateUser } = require("../middlewares/validation.middleware");
const { autheticateToken } = require("../middlewares/auth.middleware");
router.post("/login", authController.login);
router.post("/signup", validateUser, authController.signup);

router.post("/logout", autheticateToken, authController.logout);

module.exports = router;
