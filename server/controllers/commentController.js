const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();
const { validationResult } = require("express-validator");

// GET all comments from post with postId
exports.all_comments_list = async (req, res) => {
  try {
    const { postId } = req.params;

    const comments = await prisma.comment.findMany({
      where: { postId: parseInt(postId, 10) },
    });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: "Error fetching comments" });
  }
};

// GET specific comment
exports.comment_list = async (req, res) => {
  const { id } = req.params;
  try {
    const comment = await prisma.comment.findUnique({
      where: { id: parseInt(id, 10) },
    });
    if (!comment) return res.status(404).json({ error: "comment not found" });
    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: "Error fetching comment" });
  }
};

// POST comment
exports.comment_create = async (req, res) => {
  const { postId } = req.params;
  const { userId, content } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()[0].msg });
  }

  try {
    const newComment = await prisma.comment.create({
      data: {
        content,
        authorId: parseInt(userId, 10),
        postId: parseInt(postId, 10),
      },
    });
    res.status(201).json(newComment);
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ error: "Error creating comment" });
  }
};

//  PUT (update) comment

exports.comment_update = async (req, res) => {
  const { id } = req.params;
  const { content, createdAt, authorId, postId } = req.body;
  try {
    const updatedComment = await prisma.comment.update({
      where: { id: parseInt(id, 10) },
      data: { content, createdAt, authorId, postId },
    });
    res.json(updatedComment);
  } catch (error) {
    res.status(500).json({ error: "Error updating comment" });
  }
};
// DELETE comment
exports.comment_delete = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedComment = await prisma.comment.delete({
      where: { id: parseInt(id, 10) },
    });
    res.json(deletedComment);
  } catch (error) {
    res.status(500).json({ error: "Error deleting comment" });
  }
};
