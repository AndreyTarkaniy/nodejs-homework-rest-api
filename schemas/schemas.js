import Joi from "joi";
import { phoneRegexp } from "../constans/contacts-constans.js";

const contactsAddSchema = Joi.object({
  name: Joi.string().required().messages({ "any.required": `"name" must be exist` }),
  email: Joi.string().email().required().messages({ "any.required": `"email" must be exist` }),
  phone: Joi.string().pattern(phoneRegexp).required().messages({ "any.required": `"phone" must be exist` }),
  favorite: Joi.boolean(),
});

export default contactsAddSchema;
