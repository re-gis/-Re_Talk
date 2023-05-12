import { generateToken } from "../Config/generateToken.js";
import { User } from "../Models/user.Model.js";
import bcrypt from "bcrypt";

// Login user

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).send({ message: "Enter all fields..." });
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).send({ message: "Email or password invalid!" });
    // verify the password
    const verifiedPass = await bcrypt.compare(password, user.password);
    if (!verifiedPass)
      return res.status(400).send({ message: "Email or password invalid!" });
    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.picture,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Internal server error..." });
  }
};

// Register user

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, picture } = req.body;
    if (!name || !password || !email)
      return res.status(400).send({ message: "Enter all fields..." });
    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).send({ message: "User already exists..." });
    const hashPass = await bcrypt.hash(password, 10);
    // Save user
    const user = await User.create({
      name,
      email,
      password: hashPass,
      picture,
    });

    if (!user)
      return res.status(500).send({ message: "Internal server error..." });
    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.picture,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Internal server error..." });
  }
};
