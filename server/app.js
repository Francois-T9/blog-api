const express = require("express");

const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const assetsPath = path.join(__dirname, "public");
const commentsRoute = require("./routes/comments");
const postsRoute = require("./routes/posts");
const usersRoute = require("./routes/users");
const { PrismaClient } = require("./generated/prisma");
const prisma = new PrismaClient();
// const { execSync } = require("child_process");
// execSync("npx prisma db push", { stdio: "inherit" });
app.use(bodyParser.json());
app.use("/api/posts", postsRoute);
app.use("/api/comments", commentsRoute);
app.use("/api/users", usersRoute);
app.listen(3000, () => {
  console.log("Port 3000");
});
