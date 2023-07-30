import { HttpError } from "../helpers/index.js";
import Contact from "../models/contactsModel.js";
import { controlWrapper } from "../decorators/index.js";
import { query } from "express";

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, ...query } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner, ...query }, "-createdAt -updatedAt", { skip, limit }).populate("owner", "name email");
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
const add = async ({ body, user }, res) => {
  const { _id: owner } = user;
  const result = await Contact.create({ ...body, owner });
  res.status(201).json(result);
};

const deleteByID = async (req, res) => {
  const { id } = req.params;

  const result = await Contact.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404, `Contact with id=${id} - not found`);
  }

  res.json({
    message: "Delete success",
  });
};

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
  deleteByID: controlWrapper(deleteByID),
  updateById: controlWrapper(updateById),
  updateFavorite: controlWrapper(updateFavorite),
};
