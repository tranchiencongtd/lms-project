import * as z from "zod";
import { UserRole } from "@prisma/client";

export const SettingsSchema = z.object({
  name: z.optional(z.string()),
  isTwoFactorEnabled: z.optional(z.boolean()),
  role: z.enum([UserRole.ADMIN, UserRole.USER]),
  email: z.optional(z.string().email()),
  password: z.optional(z.string().min(6)),
  newPassword: z.optional(z.string().min(6)),
})
  .refine((data) => {
    if (data.password && !data.newPassword) {
      return false;
    }

    return true;
  }, {
    message: "Mật khẩu mới không được để trống!",
    path: ["newPassword"]
  })
  .refine((data) => {
    if (data.newPassword && !data.password) {
      return false;
    }

    return true;
  }, {
    message: "Mật khẩu không được để trống!",
    path: ["password"]
  })

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum of 6 characters required",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email không được để trống",
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email không được để trống",
  }),
  password: z.string().min(1, {
    message: "Mật khẩu không được để trống",
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email không được để trống",
  }),
  password: z.string().min(6, {
    message: "Mật khẩu tối thiểu có 6 ký tự",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
});
