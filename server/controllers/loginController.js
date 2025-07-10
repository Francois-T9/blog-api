const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.user_login = async (req, res) => {
  const username = req.body.username;
  const user = { user: username };
  jwt.sign({ user: user }, process.env.ACCESS_TOKEN_SECRET, (err, token) => {
    res.json({ token });
  });
};

// Authentification function

exports.autheticateToken = function (req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};
