import { Category } from "@/controller/category";
import { validate } from "@/middleware/req.validation";
import {
  CategorySchema,
  DeleteCategorySchema,
  UpdateCategorySchema,
} from "@/services/category/category_schema";
import e from "express";

const Category_Route = e.Router();

Category_Route.get("/", Category.getAllCategories);
Category_Route.post("/", validate(CategorySchema), Category.createCategory);
Category_Route.patch(
  "/:id",
  validate(UpdateCategorySchema),
  Category.updateCategory
);
Category_Route.delete(
  "/:id",
  validate(DeleteCategorySchema),
  Category.deleteCategory
);

export default Category_Route;
