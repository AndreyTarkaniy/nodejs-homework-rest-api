import bcrypt from "bcryptjs";

import User from "../models/userModel.js";
import { controlWrapper } from "../decorators/index.js";
import { HttpError } from "../helpers/index.js";

const authSignup = async (req, res) => {
  const { password } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: passwordHash });

  res.status(201).json({
    name: newUser.name,
    email: newUser.email,
  });
  //   console.log(req.body);
};

export default {
  authSignup: controlWrapper(authSignup),
};
