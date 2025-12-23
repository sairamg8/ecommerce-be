import { AuthController } from "@/controller/auth/singup";
import { validate } from "@/middlware/auth.validation";
import { SignupSchema } from "@/utils/validation";
import e from "express";

const Auth_Route = e.Router();

Auth_Route.post("/signup", validate(SignupSchema), AuthController.signup);

export default Auth_Route;
