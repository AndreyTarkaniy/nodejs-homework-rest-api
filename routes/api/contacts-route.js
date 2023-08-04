import express from "express";

import control from "../../controllers/contacts-controllers.js";
import schema from "../../schemas/contacts-schema.js";
import { validateBody } from "../../decorators/index.js";
import { isValideId, authenticate } from "../../middleware/index.js";

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get("/", control.getAll);

contactsRouter.get("/:id", isValideId, control.getByID);

contactsRouter.post("/", validateBody(schema.contactsAddSchema), control.add);

contactsRouter.delete("/:id", isValideId, control.deleteByID);

contactsRouter.put("/:id", isValideId, validateBody(schema.contactsAddSchema), control.updateById);

contactsRouter.patch("/:id/favorite", isValideId, validateBody(schema.contactsUpdateFavorite), control.updateFavorite);

export default contactsRouter;
