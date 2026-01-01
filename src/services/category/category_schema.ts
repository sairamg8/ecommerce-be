import z from "zod";

export const CategorySchema = z.object({
  body: z.array(
    z.object({
      name: z.string("Category name mandatory"),
      slug: z
        .string("Category slug mandatory")
        .min(3, "Minimum 3 characters should be"),
      description: z.string().min(10, "At least 10 characters").optional(),
      image_url: z.string().optional(),
    })
  ),
});

export const UpdateCategorySchema = z.object({
  body: CategorySchema.partial().extend({
    is_active: z.boolean().optional(),
  }),

  params: z.object({
    id: z.string().transform(Number),
  }),
});

export const DeleteCategorySchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});
