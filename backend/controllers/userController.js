const User = require("../models/User");

exports.getUsers = async (req, res) => {
  const users = await User.find().sort({ totalPoints: -1 });
  const rankedUsers = users.map((user, index) => ({
    _id: user._id,
    name: user.name,
    totalPoints: user.totalPoints,
    rank: index + 1,
  }));
  res.json(rankedUsers);
};

exports.addUser = async (req, res) => {
  const { name } = req.body;
  const newUser = new User({ name });
  await newUser.save();
  res.status(201).json(newUser);
};
