import z from "zod";
import { CategorySchema, UpdateCategory } from "./category_schema";

export interface CategoryResponseT {
  id: number;
  name: string;
  slug: string;
  description: string;
  image_url: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

export type NewCategoryT = z.infer<typeof CategorySchema>["body"];

export type UpdateCategoryT = z.infer<typeof UpdateCategory>["body"];
