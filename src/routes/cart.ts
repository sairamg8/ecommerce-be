import { CartController } from "@/controller/cart";
import { validate } from "@/middleware/req.validation";
import {
  AddProductsToCartSchema,
  UpdateCartProductSchema,
} from "@/services/cart/cart_schema";
import e from "express";

const Cart_Route = e.Router();

Cart_Route.get("/", CartController.FetchCartItems);
Cart_Route.post(
  "/",
  validate(AddProductsToCartSchema),
  CartController.CreateCartItems
);
Cart_Route.patch(
  "/",
  validate(UpdateCartProductSchema),
  CartController.UpdateCartItems
);
Cart_Route.delete("/:id", CartController.DeleteCartItem);

export default Cart_Route;
