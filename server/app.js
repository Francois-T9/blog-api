const express = require("express");

const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const assetsPath = path.join(__dirname, "public");
const commentsRoute = require("./routes/comments");
const postsRoute = require("./routes/posts");
const usersRoute = require("./routes/users");
const loginRoute = require("./routes/login");
const passport = require("passport");
const passportConfig = require("./config/passport");

app.use(bodyParser.json());
app.use(passport.initialize());
passportConfig(passport);
app.use("/api/login", loginRoute);
app.use("/api/users", usersRoute);
app.use("/api/users/:userId/posts", postsRoute);
app.use("/api/users/:userId/posts/:postId/comments", commentsRoute);

app.listen(process.env.PORT, () => {
  console.log(`Port ${process.env.PORT}`);
});
