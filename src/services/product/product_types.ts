import z from "zod";
import {
  AddProductSchema,
  FetchAllProductsSchema,
  UpdateProductSchema,
} from "./product_schema";

export type AddProductT = z.infer<typeof AddProductSchema>["body"];
export type AddProductWithUserT = (AddProductT[number] & { user_id: number })[];
export type UpdateProductT = z.infer<typeof UpdateProductSchema>["body"];

export type PaginatedT = z.infer<typeof FetchAllProductsSchema>["query"];
