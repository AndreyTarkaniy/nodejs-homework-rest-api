import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

import User from "../models/userModel.js";
import { controlWrapper } from "../decorators/index.js";
import { HttpError } from "../helpers/index.js";

const { JWT_SECRET } = process.env;

const authSignup = async (req, res) => {
  const { email, password } = req.body;

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "user with this email is use");
  }

  const newUser = await User.create({ ...req.body, password: passwordHash });

  res.status(201).json({
    name: newUser.name,
    email: newUser.email,
  });
};

const authSignin = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "email or password invalid");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "email or password invalid");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
  });
};

const getCurrent = (req, res) => {
  const { name, email } = req.user;
  res.json({ name, email });
};

const authLogout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.json({
    message: "Logout success",
  });
};

export default {
  authSignup: controlWrapper(authSignup),
  authSignin: controlWrapper(authSignin),
  getCurrent: controlWrapper(getCurrent),
  authLogout: controlWrapper(authLogout),
};
