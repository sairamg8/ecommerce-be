import z from "zod";
import { AddProductSchema } from "./product_schema";

export type AddProductT = z.infer<typeof AddProductSchema>["body"];
