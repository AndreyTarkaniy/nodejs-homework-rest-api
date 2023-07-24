import { Schema, model } from "mongoose";

import { handleSaveError } from "./hooks.js";
import { phoneRegexp } from "../constans/contacts-constans.js";

const contactsSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      required: [true, "Set email for contact"],
    },
    phone: {
      type: String,
      match: phoneRegexp,
      required: [true, "Set phone for contact"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

contactsSchema.post("save", handleSaveError);

const Contact = model("contact", contactsSchema);

export default Contact;
