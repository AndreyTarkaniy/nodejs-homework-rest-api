import Joi from "joi";
import { emailRegexp } from "../constans/user-constants.js";

const userSignupSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(5).required(),
});

const userSigninSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(5).required(),
});

const userVerifyEmailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
});

const userSubscribtionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

export default { userSignupSchema, userSigninSchema, userSubscribtionSchema, userVerifyEmailSchema };
