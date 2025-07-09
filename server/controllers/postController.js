// GET all post
exports.all_post_list = (req, res) => {
  res.send("NOT IMPLEMENTED: Post list");
};

// GET specific post
exports.post_list = (req, res) => {
  const { id } = req.params;
  res.send(`getting post with id ${id}`);
};

// POST post
exports.post_create = (req, res) => {
  res.send("NOT IMPLEMENTED: Create post");
  res.json(req.body);
};

//  PUT (update) post

exports.post_update = (req, res) => {
  const { id } = req.params;
  res.json(req.body);
};
// DELETE post
exports.post_delete = (req, res) => {
  const { id } = req.params;
  res.json({ deleted: id });
};
