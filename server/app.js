const express = require("express");

const bodyParser = require("body-parser");
const app = express();
const commentsRoute = require("./routes/comments");
const postsRoute = require("./routes/posts");
const usersRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const passport = require("passport");
const passportConfig = require("./config/passport");
const cors = require("cors");
app.use(cors());
// ...existing code...
app.use(bodyParser.json());
app.use(passport.initialize());
passportConfig(passport);
app.use("/api/", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/users/:userId/posts", postsRoute);
app.use("/api/users/:userId/posts/:postId/comments", commentsRoute);

app.listen(process.env.PORT, () => {
  console.log(`Port ${process.env.PORT}`);
});
