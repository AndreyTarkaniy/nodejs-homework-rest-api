import User from "../models/userModel.js";
import { controlWrapper } from "../decorators/index.js";
import { HttpError } from "../helpers/index.js";

const authSignup = async (req, res) => {
  const newUser = await User.create(req.body);

  res.status(201).json({
    name: newUser.name,
    email: newUser.email,
  });
};

export default {
  authSignup: controlWrapper(authSignup),
};
