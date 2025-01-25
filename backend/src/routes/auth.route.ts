import { Router } from "express";
import passport from "passport";
import { config } from "../config/app.config";
import {
  googleLoginCallback,
  registerUserController,
} from "../controllers/auth.controller";

const failedUrl = `${config.FRONTEND_GOOGLE_CALLBACK_URL}?status=failure`;

const router = Router();

router.post("/register", registerUserController);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: failedUrl,
  }),
  googleLoginCallback
);

export default router;
