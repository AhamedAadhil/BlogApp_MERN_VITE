import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";
import { errorUtils } from "../utils/error.utils.js";

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
    return next(errorUtils(400, "All the Fields are Required!"));
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
    next(error);
  }
};
