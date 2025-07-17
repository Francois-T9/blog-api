const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
// user form validation
const validateUser = [
  body("email")
    .isEmail()
    .withMessage("Invalid email format")
    .custom(async (value) => {
      const existingUser = await prisma.user.findUnique({
        where: { email: value },
      });
      if (existingUser) {
        throw new Error("Email is already in use");
      }
      return true;
    }),
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long"),
  body("username")
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long")
    .custom(async (value) => {
      const existingUser = await prisma.user.findUnique({
        where: { username: value },
      });
      if (existingUser) {
        throw new Error("Username is already in use");
      }
      return true;
    }),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

exports.validateUser = validateUser;
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
  const errors = validationResult(req);
  // console.log(errors);
  if (!errors.isEmpty()) {
    // Send the full array of validation errors to the client
    return res.status(400).json({ errors: errors.array()[0].msg });
  }
  const { email, name, username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
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
