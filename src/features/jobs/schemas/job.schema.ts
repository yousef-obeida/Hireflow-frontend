import { z } from "zod";

/** Matches backend StoreJobRequest rules */
export const createJobSchema = z.object({
  title: z.string().min(1, "Job title is required.").max(255, "Job title must not exceed 255 characters."),
  description: z.string().min(1, "Job description is required."),
  requirments: z.string().min(1, "Job requirements are required."),
  status: z.enum(["open", "closed"], { message: 'Job status must be either "open" or "closed".' }),
  Location: z.enum(["onsite", "remote", "hybrid"], { message: "Job location must be one of: onsite, remote, or hybrid." }),
  salary: z.coerce.number().int("Salary must be a valid number.").nullable().optional(),
});

/** Matches backend UpdateJobRequest rules (all fields optional) */
export const updateJobSchema = createJobSchema.partial();

export type CreateJobFormValues = z.infer<typeof createJobSchema>;
export type UpdateJobFormValues = z.infer<typeof updateJobSchema>;
