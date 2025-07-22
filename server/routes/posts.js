const express = require("express");
const router = express.Router({ mergeParams: true });
const { validatePost } = require("../middlewares/validation.middleware");

const postController = require("../controllers/postController");
const passport = require("passport");
// get all blog posts
router.get(
  "/",

  passport.authenticate("jwt", { session: false }),

  postController.all_post_list
);
// create new post

router.post(
  "/",
  validatePost,
  passport.authenticate("jwt", { session: false }),
  postController.post_create
);

// get specific post
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  postController.post_list
);
// update post

router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  postController.post_update
);

// delete post
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  postController.post_delete
);

module.exports = router;
