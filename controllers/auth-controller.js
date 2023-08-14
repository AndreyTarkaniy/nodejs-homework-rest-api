import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
import fs from "fs/promises";
import path from "path";
import gravatar from "gravatar";
import Jimp from "jimp";
import { nanoid } from "nanoid";

import User from "../models/userModel.js";
import { controlWrapper } from "../decorators/index.js";
import { HttpError, sendMail } from "../helpers/index.js";

const { JWT_SECRET, BASE_URL } = process.env;

const authSignup = async (req, res) => {
  const { email, password } = req.body;

  const passwordHash = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();

  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "user with this email is use");
  }

  const newUser = await User.create({ ...req.body, avatarURL, password: passwordHash, verificationToken });

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">Click to verify code</a>`,
  };
  await sendMail(verifyEmail);

  res.status(201).json({
    name: newUser.name,
    email: newUser.email,
    avatarURL: newUser.avatarURL,
  });
};

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  // const { id } = req.user;

  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw HttpError(404, "User not found");
  }

  await User.findByIdAndUpdate(user._id, { verify: true, verificationToken: "" });
  res.json({ message: "Verification successful" });
};

const authSignin = async (req, res) => {
  const { email, password, avatarURL } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "email or password invalid");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "email or password invalid");
  }

  if (!user.verify) {
    throw HttpError(400, "User not found");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    avatarURL,
  });
};

const getCurrent = (req, res) => {
  const { name, email, avatarURL } = req.user;
  res.json({ name, email, avatarURL });
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

const avatarPath = path.resolve("public", "avatars");

const avatarUpdate = async (req, res) => {
  const { id } = req.user;
  const { path: tempPath, filename } = req.file;

  const newPath = path.join(avatarPath, filename);
  await fs.rename(tempPath, newPath);

  const avatarURL = path.join("avatars", filename);
  await Jimp.read(tempPath)
    .then(newAvatar => {
      return newAvatar.resize(250, 250).write(avatarURL);
    })
    .catch(err => {
      console.error(err);
    });

  const updatedUser = await User.findByIdAndUpdate({ _id: id }, { avatarURL }, { new: true });

  res.json({
    avatarURL: updatedUser.avatarURL,
  });
};

export default {
  authSignup: controlWrapper(authSignup),
  verifyEmail: controlWrapper(verifyEmail),
  authSignin: controlWrapper(authSignin),
  getCurrent: controlWrapper(getCurrent),
  authLogout: controlWrapper(authLogout),
  authSubscription: controlWrapper(authSubscription),
  avatarUpdate: controlWrapper(avatarUpdate),
};
