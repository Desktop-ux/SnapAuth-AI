const jwt = require("jsonwebtoken");
const userModel = require("../models/user.models");
const bcypt = require("bcrypt");

async function registerController(req, res) {
  try {
    const { username, password } = req.body;
    const userExists = await userModel.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: "Username already taken" });
    }

    const hashedPassword = await bcypt.hash(password, 10);

    const newUser = await userModel.create({
      username,
      password: hashedPassword,
    });

     const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );
    res.cookie("token", token, { httpOnly: true, maxAge: 3600000 });

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" , err});
  }
}
async function loginCOntroller(req, res) {
  try {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }
    const isPasswordValid = await bcypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid username or password" });
    }
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );
    res.cookie("token", token, { httpOnly: true, maxAge: 3600000 });
    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = { registerController, loginCOntroller };
