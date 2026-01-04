import { z } from "zod";

export const UserSchema = z.object({
  first_name: z.string().min(2),
  last_name: z.string().min(2),
  email: z.email(),
  phone: z.coerce.number(),
  password: z.string().min(6),
  role: z.enum(["admin", "merchant", "user"]).optional(),
  is_verified: z.coerce.boolean().optional(),
  user_meta_data: z.json().optional(),
  profile_pic: z.string().optional(),
});

export const UpdateProfileSchema = z.object({
  body: UserSchema.partial(),
});
