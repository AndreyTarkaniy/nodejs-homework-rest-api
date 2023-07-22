import express from "express";

import control from "../../controllers/controllers.js";
import contactsAddSchema from "../../schemas/schemas.js";
import { validateBody } from "../../decorators/index.js";

const contactsRouter = express.Router();

contactsRouter.get("/", control.getAll);

contactsRouter.get("/:id", control.getByID);

contactsRouter.post("/", validateBody(contactsAddSchema), control.add);

contactsRouter.delete("/:id", control.deleteByID);

contactsRouter.put("/:id", validateBody(contactsAddSchema), control.updateById);

export default contactsRouter;
