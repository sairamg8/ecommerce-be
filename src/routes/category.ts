import { Category } from "@/controller/category";
import e from "express";

const Category_Route = e.Router();

Category_Route.get("/", Category.getAllCategories);

export default Category_Route;
