import z from "zod";

const ProductBodySchema = z.object({
  name: z.string("Product name is required"),
  category_id: z.number("Category ID should be a valid number"),
  slug: z.string("Slug is required for friendly UI navigation"),
  description: z.string().optional(),
  short_description: z.string().optional(),
  price: z.number("A Valid Price required"),
  sale_price: z.number("A valid sale price required"),
  sku: z.number("A Valid number required"),
  stock_quantity: z.number(" Stock quantity should be a valid number "),
  image_url: z.url("A Valid URL required").optional(),
  is_active: z.boolean().optional(),
  is_featured: z.boolean().optional(),
});

export const AddProductSchema = z.object({
  body: z.array(ProductBodySchema),
});

export const UpdateProductSchema = z.object({
  body: ProductBodySchema,
  params: z.object({
    id: z.coerce
      .number()
      .int("Must provide a valid positive number")
      .positive(),
  }),
});

export const DeleteProductSchema = z.object({
  params: z.object({
    id: z.coerce
      .number()
      .positive("Must provide a valid positive number")
      .int("Must provide a valid integer"),
  }),

  query: z.object({
    force: z.coerce.boolean(),
  }),
});
