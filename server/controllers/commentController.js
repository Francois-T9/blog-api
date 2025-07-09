// GET all comments
exports.all_comments_list = (req, res) => {
  res.send("NOT IMPLEMENTED: comment list");
};

// GET specific comment
exports.comment_list = (req, res) => {
  const { id } = req.params;
  res.send(`get comment with id ${id}`);
};

// POST comment
exports.comment_create = (req, res) => {
  res.send("NOT IMPLEMENTED: Create comment");
  res.json(req.body);
};

//  PUT (update) comment

exports.comment_update = (req, res) => {
  const { id } = req.params;
  res.json(req.body);
};
// DELETE comment
exports.comment_delete = (req, res) => {
  const { id } = req.params;
  res.json({ deleted: id });
};
