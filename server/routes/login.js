const express = require("express");
const router = express.Router();
const loginController = require("../controllers/loginController");

router.post("/", loginController.user_login);

module.exports = router;
