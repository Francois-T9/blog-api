const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
// ############### Login function ###################

exports.login = async (req, res) => {
  const { username, password } = req.body;

  // query user from client request
  const user = await prisma.user.findUnique({
    where: { username },
  });

  // check if username exists
  if (!user) return res.status(401).json({ message: "User not found" });
  // check if password is valid
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ message: "Invalid credentials" });

  const payload = {
    sub: user.id,
    username: user.username,
  };

  // generate access token

  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  // generate refresh token

  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_EXPIRES_IN,
  });

  // add refreshToken to db
  await prisma.user.update({
    where: { username },
    data: { refreshToken },
  });

  // return responses with user info

  res.json({ accessToken, refreshToken, userId: user.id });
};

// ############ Register function #################""

exports.signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()[0].msg });
  }

  const { email, name, username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const isAdmin = username === process.env.ADMIN_USERNAME;
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        username,
        password: hashedPassword,
        isAdmin: isAdmin,
      },
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error(error); // Add this for debugging
    res.status(500).json({ error: "Error creating user" });
  }
};

// ############### Logout function ####################

exports.logout = async (req, res) => {
  const userId = req.user.sub;

  try {
    await prisma.user.update({
      where: { id: userId },
      data: { refreshToken: null },
    });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
