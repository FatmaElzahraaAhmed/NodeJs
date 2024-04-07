const User = require("../Models/UserModel");
4;
async function Register(req, res) {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function Login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    res.json({ message: "Login successful", user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = {
  Register,
  Login,
};
