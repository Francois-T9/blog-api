const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const loginController = require("../controllers/loginController");

router.get(
  "/",

  commentController.all_comments_list
);
router.post("/", commentController.comment_create);

router.get("/:id", commentController.comment_list);

router.put("/:id", commentController.comment_update);
router.delete("/:id", commentController.comment_delete);

module.exports = router;
