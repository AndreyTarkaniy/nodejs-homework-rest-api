import express from "express";

import control from "../../controllers/controllers.js";

const contactsRouter = express.Router();

contactsRouter.get("/", control.getAll);

contactsRouter.get("/:id", control.getByID);

contactsRouter.post("/", control.add);

contactsRouter.delete("/:id", control.deleteByID);

contactsRouter.put("/:id", control.updateById);

export default contactsRouter;
