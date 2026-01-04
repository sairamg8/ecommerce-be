import z from "zod";
import { UpdateProfileSchema } from "./user.schema";

export type UpdateProfileT = z.infer<typeof UpdateProfileSchema>["body"];
