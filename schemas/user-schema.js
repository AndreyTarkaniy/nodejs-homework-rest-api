import Joi from "joi";
import { emailRegexp } from "../constans/user-constants.js";

const userSignupSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(5).required(),
});

export default { userSignupSchema };
