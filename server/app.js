const express = require("express");

const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const assetsPath = path.join(__dirname, "public");
const commentsRoute = require("./routes/comments");
const postsRoute = require("./routes/posts");
const usersRoute = require("./routes/users");
const loginRoute = require("./routes/login");
// const { PrismaClient } = require("./generated/prisma");
// const prisma = new PrismaClient();
// const { execSync } = require("child_process");
// execSync("npx prisma db push", { stdio: "inherit" });

app.use(bodyParser.json());
app.use("/api/posts", postsRoute);
app.use("/api/comments", commentsRoute);
app.use("/api/users", usersRoute);
app.use("/api/login", loginRoute);

app.listen(process.env.PORT, () => {
  console.log(`Port ${process.env.PORT}`);
});
