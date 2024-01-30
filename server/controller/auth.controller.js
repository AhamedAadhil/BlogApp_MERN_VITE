import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorUtils } from "../utils/error.utils.js";

/* REGISTER NEW USER */
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

/* LOGIN */
export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password || email === "" || password === "") {
    return next(errorUtils(400, "All fields are mandatory!"));
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(errorUtils(404, "User not found"));
    }
    const isMatch = bcryptjs.compareSync(password, user.password);
    if (!isMatch) {
      return next(errorUtils(400, "Invalid Credentials!"));
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = user._doc;
    res
      .status(200)
      .cookie("access_token", token, { httpOnly: true })
      .json(rest);
  } catch (error) {
    next(error);
  }
};

/* GOOGLE OAUTH */
export const accessUsingGoogle = async (req, res, next) => {
  try {
    const { username, email, photoUrl } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res
        .status(200)
        .cookie("access_token", token, { httpOnly: true })
        .json(rest);
    } else {
      const genRandomPassword = Math.random().toString(36).slice(-8);
      const hashPassword = bcryptjs.hashSync(genRandomPassword, 10);

      let newUser = new User({
        username: username.includes(" ")
          ? username.replace(/\s+/g, "").toLowerCase() +
            Math.random().toString(9).slice(-4)
          : username.toLowerCase() + Math.random().toString(9).slice(-4),
        email,
        password: hashPassword,
        profilePicture: photoUrl,
      });

      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      res
        .status(201)
        .cookie("access_token", token, { httpOnly: true })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
