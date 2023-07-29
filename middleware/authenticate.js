import jwt from "jsonwebtoken";
// import "dotenv/config";

import { HttpError } from "../helpers/index.js";
import { controlWrapper } from "../decorators/index.js";
import User from "../models/userModel.js";

const { JWT_SECRET } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    throw HttpError(401);
  }

  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = User.findById(id);
    if (!user) {
      throw HttpError(401);
    }
    next();
  } catch (error) {
    throw HttpError(401);
  }
};

export default controlWrapper(authenticate);
