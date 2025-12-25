import { AuthController } from "@/controller/auth/singup";
import { validate } from "@/middleware/auth.validation";
import {
  ForgotPassword,
  ResetPassword,
  SigninSchema,
  SignupSchema,
} from "@/utils/validation";
import e from "express";

const Auth_Route = e.Router();

Auth_Route.post("/signup", validate(SignupSchema), AuthController.signup);
Auth_Route.post("/login", validate(SigninSchema), AuthController.signin);
Auth_Route.post(
  "/forgot-password",
  validate(ForgotPassword),
  AuthController.forgotPassword
);

Auth_Route.post(
  "/reset-password",
  validate(ResetPassword),
  AuthController.resetPassword
);

export default Auth_Route;
