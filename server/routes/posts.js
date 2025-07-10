const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const loginController = require("../controllers/loginController");
// get all blog posts
router.get("/", loginController.autheticateToken, postController.all_post_list);
// create new post

router.post("/", postController.post_create);

// get specific post
router.get("/:id", postController.post_list);
// update post

router.put("/:id", postController.post_update);

// delete post
router.delete("/:id", postController.post_delete);

module.exports = router;
