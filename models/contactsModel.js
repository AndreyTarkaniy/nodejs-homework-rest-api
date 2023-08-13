import { Schema, model } from "mongoose";

import { handleSaveError, handleUpdateValide } from "./hooks.js";
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
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

contactsSchema.pre("findByIdAndUpdate", handleUpdateValide);

contactsSchema.post("save", handleSaveError);
contactsSchema.post("findByIdAndUpdate", handleSaveError);

const Contact = model("contact", contactsSchema);

export default Contact;
