import { z } from "zod";

const ACCEPTED_CV_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
];
const MAX_CV_SIZE = 10 * 1024 * 1024; // 10 MB

/** Matches backend StoreApplicationRequest rules */
export const applySchema = z.object({
  full_name: z
    .string()
    .min(1, "Full name is required.")
    .max(255, "Full name must not exceed 255 characters."),
  email: z
    .string()
    .min(1, "Email address is required.")
    .email("Please enter a valid email address.")
    .max(255, "Email must not exceed 255 characters."),
  phone_number: z
    .string()
    .min(1, "Phone number is required.")
    .max(20, "Phone number must not exceed 20 characters."),
  linkedin_profile: z
    .string()
    .url("Please enter a valid URL.")
    .max(255, "LinkedIn profile must not exceed 255 characters.")
    .optional()
    .or(z.literal("")),
  job_post_id: z
    .string()
    .min(1, "Please select a position."),
  cv: z
    .instanceof(File, { message: "A resume/CV file is required." })
    .refine(
      (file) => ACCEPTED_CV_TYPES.includes(file.type),
      "CV must be a PDF or DOCX file.",
    )
    .refine(
      (file) => file.size <= MAX_CV_SIZE,
      "CV file size must not exceed 10 MB.",
    ),
});

export type ApplyFormValues = z.infer<typeof applySchema>;

/** Matches backend MoveApplicationRequest rules */
export const moveApplicationSchema = z.object({
  stage_id: z.coerce
    .number()
    .int()
    .min(1, "A target stage is required to move the application."),
});

export type MoveApplicationFormValues = z.infer<typeof moveApplicationSchema>;
