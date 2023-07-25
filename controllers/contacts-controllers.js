import { HttpError } from "../helpers/index.js";
import Contact from "../models/contactsModel.js";
// import { contactsAddSchema, contactsUpdateFavorite } from "../schemas/schemas.js";
import { controlWrapper } from "../decorators/index.js";

const getAll = async (req, res) => {
  const result = await Contact.find({}, "-createdAt -updatedAt");
  res.json(result);
};

const getByID = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    throw HttpError(404, `Contact with id=${id} - not found`);
  }
  res.json(result);
};
const add = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

// const deleteByID = async (req, res) => {
//   const { id } = req.params;

//   const result = await contactService.removeContact(id);
//   if (!result) {
//     throw HttpError(404, `Contact with id=${id} - not found`);
//   }

//   res.json({
//     message: "Delete success",
//   });
// };

const updateById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, `Contact with id=${id} - not found`);
  }
  res.json(result);
};

const updateFavorite = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, `Contact with id=${id} - not found`);
  }
  res.json(result);
};

export default {
  getAll: controlWrapper(getAll),
  getByID: controlWrapper(getByID),
  add: controlWrapper(add),
  // deleteByID: controlWrapper(deleteByID),
  updateById: controlWrapper(updateById),
  updateFavorite: controlWrapper(updateFavorite),
};
