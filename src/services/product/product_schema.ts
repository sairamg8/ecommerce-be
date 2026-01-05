import z from "zod";

const ProductBodySchema = z.object({
  name: z.string("Product name is required"),
  brand: z.string("Brand name is required"),
  category_id: z.number("Category ID should be a valid number"),
  slug: z.string("Slug is required for friendly UI navigation"),
  description: z.string().optional(),
  short_description: z.string().optional(),
  price: z.number("A Valid Price required"),
  sale_price: z.coerce.number("A valid sale price required"),
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
  body: ProductBodySchema.partial(),
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

export const FetchAllProductsSchema = z.object({
  query: z.object({
    page: z.coerce.number().int().positive().optional().default(1),
    limit: z.coerce.number().int().positive().optional().default(5),
    sortBy: z.string().optional(),
    sortOrder: z.enum(["asc", "desc"]).optional().default("desc"),
    search: z.string().optional(),
    category_id: z.string().optional(),
    is_active: z
      .enum(["true", "false"])
      .transform((val) => val === "true")
      .optional(),
    is_featured: z
      .enum(["true", "false"])
      .transform((val) => val === "true")
      .optional(),
    min_price: z.coerce.number().optional(),
    max_price: z.coerce.number().optional(),
  }),
});
