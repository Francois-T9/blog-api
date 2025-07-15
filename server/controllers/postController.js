const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

// GET all posts
exports.all_post_list = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(userId);
    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId, 10) },
    });
    if (!user) return res.status(404).json({ error: "User not found" });

    const posts = await prisma.post.findMany();
    res.json({ posts: posts });
  } catch (error) {
    res.status(500).json({ error: "Error fetching posts" });
  }
};

// GET specific comment
exports.post_list = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await prisma.post.findUnique({
      where: { id: parseInt(id, 10) },
    });
    if (!post) return res.status(404).json({ error: "post not found" });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Error fetching post" });
  }
};

// POST comment
exports.post_create = async (req, res) => {
  const { userId } = req.params;
  console.log(userId);
  const { title } = req.body;
  try {
    const newPost = await prisma.post.create({
      data: { title, authorId: parseInt(userId, 10) },
    });
    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Error creating post" });
  }
};

//  PUT (update) comment

exports.post_update = async (req, res) => {
  const { id } = req.params;
  const { title, authorId } = req.body;
  try {
    const updatedPost = await prisma.post.update({
      where: { id: parseInt(id, 10) },
      data: { title, authorId },
    });
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: "Error updating post" });
  }
};
// DELETE comment
exports.post_delete = async (req, res) => {
  const { id } = req.params;
  try {
    // Delete all comments for this post first
    await prisma.comment.deleteMany({
      where: { postId: parseInt(id, 10) },
    });
    // Now delete the post
    const deletedPost = await prisma.post.delete({
      where: { id: parseInt(id, 10) },
    });
    res.json(deletedPost);
  } catch (error) {
    console.error("Error deleting post:", error);
    res
      .status(500)
      .json({ error: "Error deleting post", details: error.message });
  }
};
