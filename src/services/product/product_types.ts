import z from "zod";
import { AddProductSchema, FetchAllProductsSchema } from "./product_schema";

export type AddProductT = z.infer<typeof AddProductSchema>["body"];

export type PaginatedT = z.infer<typeof FetchAllProductsSchema>["query"];
