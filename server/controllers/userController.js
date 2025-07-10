const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");

// GET all users
exports.all_users_list = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error fetching users" });
  }
};

// GET specific user
exports.user_list = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id, 10) },
    });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Error fetching user" });
  }
};

// POST users
exports.user_create = async (req, res) => {
  const { email, name, username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const newUser = await prisma.user.create({
      data: { email, name, username, password: hashedPassword },
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Error creating user" });
  }
};

//  PUT (update) users

exports.user_update = async (req, res) => {
  const { id } = req.params;
  const { email, name, username, password } = req.body;
  try {
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id, 10) },
      data: { email, name, username, password },
    });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Error updating user" });
  }
};
// DELETE users
exports.user_delete = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await prisma.user.delete({
      where: { id: parseInt(id, 10) },
    });
    res.json(deletedUser);
  } catch (error) {
    res.status(500).json({ error: "Error deleting user" });
  }
};
