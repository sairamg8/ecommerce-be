import { z } from "zod";
import {
  AddProductsToCartSchema,
  UpdateCartProductSchema,
} from "./cart_schema";

export type AddProductToCartT = z.infer<typeof AddProductsToCartSchema>["body"];

export type UpdateProductToCartT = z.infer<
  typeof UpdateCartProductSchema
>["body"];
