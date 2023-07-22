import { HttpError } from "../helpers/index.js";
import contactService from "../models/contacts.js";
import contactsAddSchema from "../schemas/schemas.js";
import { controlWrapper } from "../decorators/index.js";

const getAll = async (req, res) => {
  const result = await contactService.listContacts();
  res.json(result);
};

const getByID = async (req, res) => {
  const { id } = req.params;
  const result = await contactService.getContactById(id);
  if (!result) {
    throw HttpError(404, `Contact with id=${id} - not found`);
  }
  res.json(result);
};
const add = async (req, res) => {
  const { error } = contactsAddSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const result = await contactService.addContact(req.body);
  res.status(201).json(result);
};

const deleteByID = async (req, res) => {
  const { id } = req.params;

  const result = await contactService.removeContact(id);
  if (!result) {
    throw HttpError(404, `Contact with id=${id} - not found`);
  }

  res.json({
    message: "Delete success",
  });
};

const updateById = async (req, res) => {
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
};

export default {
  getAll: controlWrapper(getAll),
  getByID: controlWrapper(getByID),
  add: controlWrapper(add),
  deleteByID: controlWrapper(deleteByID),
  updateById: controlWrapper(updateById),
};
