import { z } from "zod";

/** Matches backend StoreUserRequest rules */
export const createUserSchema = z.object({
  name: z.string().min(1, "User name is required.").max(255, "User name must not exceed 255 characters."),
  email: z.string().min(1, "Email address is required.").email("Please enter a valid email address.").max(255, "Email must not exceed 255 characters."),
  password: z.string().min(8, "Password must be at least 8 characters long."),
  role: z.enum(["admin", "hr"], { message: 'Role must be either "admin" or "hr".' }),
});

/** Matches backend UpdateUserRequest rules (all fields optional) */
export const updateUserSchema = z.object({
  name: z.string().max(255, "User name must not exceed 255 characters.").optional(),
  email: z.string().email("Please enter a valid email address.").max(255, "Email must not exceed 255 characters.").optional(),
  password: z.string().min(8, "Password must be at least 8 characters long.").optional().or(z.literal("")),
  role: z.enum(["admin", "hr"], { message: 'Role must be either "admin" or "hr".' }).optional(),
});

export type CreateUserFormValues = z.infer<typeof createUserSchema>;
export type UpdateUserFormValues = z.infer<typeof updateUserSchema>;
