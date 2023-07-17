import express from "express";

import contactService from "../../models/contacts.js";
import { HttpError } from "../../helpers/index.js";
const contactsRouter = express.Router();

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
      throw HttpError(404, `Movie with id=${id} - not found`);
      // const error = new Error(`Movie with id=${id} - not found`);
      // error.status = 404;
      // throw error;
      // return res.status(404).json({
      //   message: `Movie with id=${id} - not found`,
      // });
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

// contactsRouter.post("/", async (req, res, next) => {
//   const result = await contactService.addContact();
//   res.json(result);
// });

// contactsRouter.delete("/:contactId", async (req, res, next) => {
//   const result = await contactService.removeContact(id);
//   res.json(result);
// });

// contactsRouter.put("/:contactId", async (req, res, next) => {
//   const result = await contactService.updateContactById(id);
//   res.json(result);
// });

export default contactsRouter;
