import { objectIdRegex } from "../utils/common";
import { z } from "zod";

export const userSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters")
});

export const createUserSchema = userSchema;

export const updateUserSchema = userSchema.partial();

export const userParamsSchema = z.object({
  id: z.string().regex(objectIdRegex, "Invalid user ID format")
});

export type User = z.infer<typeof userSchema>;
export type CreateUser = z.infer<typeof createUserSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;
export type UserParams = z.infer<typeof userParamsSchema>;
