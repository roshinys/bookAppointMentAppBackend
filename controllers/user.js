const User = require("../model/user");

exports.getUsers = async (req, res, next) => {
  const users = await User.findAll();
  res.json(users);
};

exports.postUser = async (req, res, next) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    if (!email) {
      throw new Error("Email required");
    }
    const newUser = await User.create({ name: name, email: email });
    res.json(newUser);
  } catch (err) {
    console.log(err);
    res.json({ message: "User already Exists or Email is required" });
  }
};
