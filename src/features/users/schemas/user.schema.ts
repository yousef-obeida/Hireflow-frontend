import { z } from 'zod';

/** Matches backend StoreUserRequest rules */
export const createUserSchema = z.object({
  name: z.string().min(1, 'Name is required.').max(255, 'Name must not exceed 255 characters.'),
  email: z.string().min(1, 'Email is required.').email('Please enter a valid email address.'),
  password: z.string().min(6, 'Password must be at least 6 characters.'),
  role: z.enum(['admin', 'hr'], { message: 'Role must be either "admin" or "hr".' }),
});

/** Matches backend UpdateUserRequest rules (all fields optional, password optional) */
export const updateUserSchema = z.object({
  name: z.string().min(1, 'Name is required.').max(255, 'Name must not exceed 255 characters.'),
  email: z.string().min(1, 'Email is required.').email('Please enter a valid email address.'),
  password: z.string().min(6, 'Password must be at least 6 characters.').optional().or(z.literal('')),
  role: z.enum(['admin', 'hr'], { message: 'Role must be either "admin" or "hr".' }),
});

export type CreateUserFormValues = z.infer<typeof createUserSchema>;
export type UpdateUserFormValues = z.infer<typeof updateUserSchema>;
