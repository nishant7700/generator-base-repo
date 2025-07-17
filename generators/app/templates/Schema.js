import { objectIdRegex } from "../utils/common";
import { z } from "zod";

export const <%= camelCaseComponentNameNoSpaces %>Schema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters")
});

export const create<%= pascalCaseComponentNameNoSpaces %>Schema = <%= camelCaseComponentNameNoSpaces %>Schema;

export const update<%= pascalCaseComponentNameNoSpaces %>Schema = <%= camelCaseComponentNameNoSpaces %>Schema.partial();

export const <%= camelCaseComponentNameNoSpaces %>ParamsSchema = z.object({
  id: z.string().regex(objectIdRegex, "Invalid <%= camelCaseComponentNameNoSpaces %> ID format")
});

export type <%= pascalCaseComponentNameNoSpaces %> = z.infer<typeof <%= camelCaseComponentNameNoSpaces %>Schema>;
export type Create<%= pascalCaseComponentNameNoSpaces %> = z.infer<typeof create<%= pascalCaseComponentNameNoSpaces %>Schema>;
export type Update<%= pascalCaseComponentNameNoSpaces %> = z.infer<typeof update<%= pascalCaseComponentNameNoSpaces %>Schema>;
export type <%= pascalCaseComponentNameNoSpaces %>Params = z.infer<typeof <%= camelCaseComponentNameNoSpaces %>ParamsSchema>;
