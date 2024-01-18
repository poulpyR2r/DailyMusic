const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwtkey = process.env.JWT_SECRET;
const bcrypt = require("bcryptjs");
const User = require("../Models/user.model");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body);

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ errorMessage: "Please enter all required fields." });
  }

  try {
    const existingUser = await User.findOne({ email });
    console.log(existingUser);

    if (existingUser) {
      return res
        .status(409)
        .json({ errorMessage: "An account with this email already exists." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    res.status(201).json({
      status: "success",
      data: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide both email and password." });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const userData = {
      id: user._id,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(userData, jwtkey, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
