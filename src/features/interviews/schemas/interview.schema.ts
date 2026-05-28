import { z } from "zod";

/** Matches backend StoreInterviewRequest rules */
export const createInterviewSchema = z.object({
  application_id: z.coerce.number().int().min(1, "The application ID is required to schedule an interview."),
  date: z.string().min(1, "Interview date is required."),
  time: z.string().min(1, "Interview time is required."),
  interviewer: z.string().min(1, "Interviewer name is required."),
  type: z.string().min(1, "Interview type is required (e.g., Technical, HR)."),
});

/** Matches backend UpdateInterviewRequest rules (all fields optional) */
export const updateInterviewSchema = z.object({
  date: z.string().optional(),
  time: z.string().optional(),
  interviewer: z.string().optional(),
  type: z.string().optional(),
});

export type CreateInterviewFormValues = z.infer<typeof createInterviewSchema>;
export type UpdateInterviewFormValues = z.infer<typeof updateInterviewSchema>;
