import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res, next) => {
  const { username, password, email } = req.body;
  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    return res.status(400).json({ message: "All the fields are required!" });
  }

  const newUser = new User({
    username,
    email,
    password: bcryptjs.hashSync(password, 10),
  });

  try {
    await newUser.save();
    res.status(201).json("User Created!");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
