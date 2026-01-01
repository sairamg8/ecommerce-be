import { z } from "zod";

export const SignupSchema = z.object({
  body: z.object({
    first_name: z.string().min(2),
    last_name: z.string().min(2),
    email: z.email(),
    phone: z.coerce.number(),
    password: z.string().min(6),
    role: z.enum(["admin", "merchant", "user"]).optional(),
    is_verified: z.coerce.boolean().optional(),
    user_meta_data: z.json().optional(),
    profile_pic: z.string().optional(),
  }),
});
export type SingUpT = z.infer<typeof SignupSchema>["body"];

export const SigninSchema = z.object({
  body: z.object({
    email: z.email("InValid Email address provided"),
    password: z.string().min(6, "Minimum 6 characters required"),
  }),
});
export type SingInT = z.infer<typeof SignupSchema>["body"];

export const ForgotPassword = z.object({
  body: z.object({
    email: z.email("InValid Email Provided"),
  }),
});
export type ForgotPasswordT = z.infer<typeof ForgotPassword>["body"];

export const ResetPassword = z.object({
  body: z.object({
    resetToken: z.string("Reset Token Required"),
    password: z.string().min(6, "Minimum 6 Characters"),
    confirmPassword: z.string().min(6, "Minimum 6 Characters"),
  }),
});
export type ResetPasswordT = z.infer<typeof ResetPassword>["body"];
