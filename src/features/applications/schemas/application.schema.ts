import { z } from "zod";

/** Matches backend StoreApplicationRequest rules */
export const applySchema = z.object({
  full_name: z.string().min(1, "Candidate full name is required.").max(255, "Full name must not exceed 255 characters."),
  email: z.string().min(1, "Candidate email is required.").email("Please enter a valid email address.").max(255, "Email must not exceed 255 characters."),
  phone_number: z.string().min(1, "Phone number is required.").max(20, "Phone number must not exceed 20 characters."),
  cv: z
    .instanceof(File, { message: "A CV file is required to apply." })
    .refine((file) => file.type === "application/pdf", "CV must be a PDF file.")
    .refine((file) => file.size <= 2 * 1024 * 1024, "CV file size must not exceed 2 MB."),
});

export type ApplyFormValues = z.infer<typeof applySchema>;

/** Matches backend MoveApplicationRequest rules */
export const moveApplicationSchema = z.object({
  stage_id: z.coerce.number().int().min(1, "A target stage is required to move the application."),
});

export type MoveApplicationFormValues = z.infer<typeof moveApplicationSchema>;
