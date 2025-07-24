const express = require("express");
const router = express.Router({ mergeParams: true });
const commentController = require("../controllers/commentController");
const passport = require("passport");
const { validateComment } = require("../middlewares/validation.middleware");
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),

  commentController.all_comments_list
);
router.post(
  "/",
  validateComment,
  passport.authenticate("jwt", { session: false }),
  commentController.comment_create
);

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  commentController.comment_list
);

router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  commentController.comment_update
);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  commentController.comment_delete
);

module.exports = router;
