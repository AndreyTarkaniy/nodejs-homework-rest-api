import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
import fs from "fs/promises";
import path from "path";
import gravatar from "gravatar";

import User from "../models/userModel.js";
import { controlWrapper } from "../decorators/index.js";
import { HttpError } from "../helpers/index.js";

const { JWT_SECRET } = process.env;

const avatarPath = path.resolve("public", "avatars");

const authSignup = async (req, res) => {
  const { email, password } = req.body;

  const passwordHash = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);

  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "user with this email is use");
  }

  // const { path: oldPath, filename } = req.file;
  // const newPath = path.join(avatarPath, filename);
  // await fs.rename(oldPath, newPath);

  // const avatarURL = path.resolve("avatars", filename);

  const newUser = await User.create({ ...req.body, avatarURL, password: passwordHash });

  res.status(201).json({
    name: newUser.name,
    email: newUser.email,
    avatarURL: newUser.avatarURL,
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

const authSubscription = async (req, res) => {
  const { id } = req.user;
  const result = await User.findByIdAndUpdate({ _id: id }, req.body, { new: true });

  res.json({
    name: result.name,
    email: result.email,
    subscription: result.subscription,
  });
};

export default {
  authSignup: controlWrapper(authSignup),
  authSignin: controlWrapper(authSignin),
  getCurrent: controlWrapper(getCurrent),
  authLogout: controlWrapper(authLogout),
  authSubscription: controlWrapper(authSubscription),
};
