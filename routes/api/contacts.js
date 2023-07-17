import express from "express";
import Joi from "joi";

import contactService from "../../models/contacts.js";
import { HttpError } from "../../helpers/index.js";

const contactsRouter = express.Router();

const contactsAddSchema = Joi.object({
  name: Joi.string().required().messages({ "any.required": `"name" must be exist` }),
  email: Joi.string().email().required().messages({ "any.required": `"email" must be exist` }),
  phone: Joi.string().required().messages({ "any.required": `"phone" must be exist` }),
});

contactsRouter.get("/", async (req, res, next) => {
  try {
    const result = await contactService.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

contactsRouter.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactService.getContactById(id);
    if (!result) {
      throw HttpError(404, `Contact with id=${id} - not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

contactsRouter.post("/", async (req, res, next) => {
  try {
    const { error } = contactsAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await contactService.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

contactsRouter.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await contactService.removeContact(id);
    if (!result) {
      throw HttpError(404, `Contact with id=${id} - not found`);
    }

    res.json({
      message: "Delete success",
    });
  } catch (error) {
    next(error);
  }
});

contactsRouter.put("/:id", async (req, res, next) => {
  try {
    const { error } = contactsAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }

    const { id } = req.params;
    const result = await contactService.updateContactById(id, req.body);
    if (!result) {
      throw HttpError(404, `Contact with id=${id} - not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

export default contactsRouter;
