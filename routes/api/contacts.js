import express from "express";

import control from "../../controllers/controllers.js";

const contactsRouter = express.Router();

contactsRouter.get("/", control.getAll);

contactsRouter.get("/:id", control.getByID);

contactsRouter.post("/", control.post);

contactsRouter.delete("/:id", control.deleteByID);

contactsRouter.put("/:id", control.putById);

export default contactsRouter;
