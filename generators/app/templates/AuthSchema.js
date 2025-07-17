import { z } from "zod";

// Schema for user registration
export const registerSchema = z.object({
  name: z
    .string()
    .min(3)
    .max(50),
  email: z.string().email(),
  password: z.string().min(6),
  phone: z.string().regex(/^[0-9]{10}$/)
});

// Schema for user login
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
});

// Schema for refreshing access token
export const refreshTokenSchema = z.object({
  refreshToken: z.string()
});

// Schema for forgetting password
export const forgetPasswordSchema = z.object({
  email: z.string().email()
});

// Schema for resetting password
export const resetPasswordSchema = z.object({
  resetToken: z.string(),
  newPassword: z.string().min(6)
});
