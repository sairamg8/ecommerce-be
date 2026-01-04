import UserController from "@/controller/user";
import { UpdateProfileSchema } from "@/controller/user/user.schema";
import { validate } from "@/middleware/req.validation";
import e from "express";

const User_Route = e.Router();

User_Route.get("/profile", UserController.ProfileInfo);
User_Route.patch(
  "/profile/update",
  validate(UpdateProfileSchema),
  UserController.UpdateProfile
);

User_Route.get("/products", UserController.FetchAllProductsBelongsToUser);

User_Route.get("/categories", UserController.FetchAllCategoriesBelongsToUser);

export default User_Route;
