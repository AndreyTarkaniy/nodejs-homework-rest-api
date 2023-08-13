import express from "express";

import { validateBody } from "../../decorators/index.js";
import authController from "../../controllers/auth-controller.js";
import schema from "../../schemas/user-schema.js";
import { upload, authenticate } from "../../middleware/index.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(schema.userSignupSchema), authController.authSignup);

authRouter.post("/login", validateBody(schema.userSigninSchema), authController.authSignin);

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.post("/logout", authenticate, authController.authLogout);

authRouter.patch("/", authenticate, validateBody(schema.userSubscribtionSchema), authController.authSubscription);

authRouter.patch("/avatar", authenticate, upload.single("avatar"), authController.avatarUpdate);

export default authRouter;
