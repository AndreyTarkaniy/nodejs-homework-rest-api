import { HttpError } from "../helpers/index.js";
import contactService from "../models/contacts.js";
import contactsAddSchema from "../schemas/schemas.js";

const getAll = async (req, res, next) => {
  try {
    const result = await contactService.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getByID = async (req, res, next) => {
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
};
const post = async (req, res, next) => {
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
};

const deleteByID = async (req, res, next) => {
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
};

const putById = async (req, res, next) => {
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
};

export default {
  getAll,
  getByID,
  post,
  deleteByID,
  putById,
};
