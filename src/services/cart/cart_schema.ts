import { z } from "zod";

const ProductSchema = z.object({
  product_id: z.coerce.number("Product ID Required"),
  quantity: z.coerce.number("Quantity Required"),
});

export const AddProductsToCartSchema = z.object({
  body: ProductSchema,
});

export const UpdateCartProductSchema = z.object({
  body: ProductSchema.extend({
    id: z.coerce.number("Cart ID required"),
  }),
});
