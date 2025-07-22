const { body } = require("express-validator");
const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

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

const validatePost = [
  body("title")
    .notEmpty()
    .withMessage("A title is required")
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters long"),
];

module.exports = { validateUser, validatePost };
