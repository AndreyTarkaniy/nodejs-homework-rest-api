import express from "express";

import { validateBody } from "../../decorators/index.js";
import authController from "../../controllers/auth-controller.js";
import schema from "../../schemas/user-schema.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(schema.userSignupSchema), authController.authSignup);

authRouter.post("/login", validateBody(schema.userSigninSchema), authController.authSignin);

export default authRouter;
