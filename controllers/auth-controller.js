import bcrypt from "bcryptjs";

import User from "../models/userModel.js";
import { controlWrapper } from "../decorators/index.js";
import { HttpError } from "../helpers/index.js";

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

  const token = "";

  res.json({
    token,
  });
};

export default {
  authSignup: controlWrapper(authSignup),
  authSignin: controlWrapper(authSignin),
};
