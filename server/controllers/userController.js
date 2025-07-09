// users mock
const users = [
  { id: 1, firstName: "Jane", lastName: "Smith", age: 20 },
  { id: 2, firstName: "John", lastName: "Smith", age: 30 },
  { id: 3, firstName: "Mary", lastName: "Green", age: 50 },
];

// GET all users
exports.all_users_list = (req, res) => {
  res.json(users);
};

// GET specific user
exports.user_list = (req, res) => {
  const { id } = req.params;
  const user = users.find((user) => user.id === parseInt(id, 10));
  res.json(user.firstName);
};

// POST users
exports.user_create = (req, res) => {
  const { user } = req.body;
  users.push(user);
  res.status(201).json(user);
};

//  PUT (update) users

exports.user_update = (req, res) => {
  const { id } = req.params;
  const { newUser } = req.body;
  const index = users.findIndex((e) => e.id === parseInt(id, 10));
  users[index] = newUser;
  res.json(newUser);
};
// DELETE users
exports.user_delete = (req, res) => {
  const { id } = req.params;

  const index = users.findIndex((e) => e.id === parseInt(id, 10));
  const removedUser = users.splice(index, 1);
  res.json(removedUser);
};
