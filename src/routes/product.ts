import { ProductController } from "@/controller/product";
import { validate } from "@/middleware/req.validation";
import {
  AddProductSchema,
  DeleteProductSchema,
  UpdateProductSchema,
} from "@/services/product/product_schema";
import e from "express";

const ProductRouter = e.Router();

ProductRouter.get("/", ProductController.FetchAllProducts);
ProductRouter.post(
  "/",
  validate(AddProductSchema),
  ProductController.AddProduct
);
ProductRouter.patch(
  "/:id",
  validate(UpdateProductSchema),
  ProductController.UpdateProduct
);
ProductRouter.delete(
  "/:id",
  validate(DeleteProductSchema),
  ProductController.DeleteProduct
);
export default ProductRouter;
