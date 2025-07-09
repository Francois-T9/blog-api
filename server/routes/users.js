const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// get all blog posts
router.get("/", userController.all_users_list);
// create new post

router.post("/", userController.user_create);

// get specific post
router.get("/:id", userController.user_list);
// update post

router.put("/:id", userController.user_update);

// delete post
router.delete("/:id", userController.user_delete);

module.exports = router;
