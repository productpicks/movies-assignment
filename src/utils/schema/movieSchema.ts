import { z } from "zod";

export const movieSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .regex(/^[a-zA-Z0-9\s]+$/, "Name must be alphanumeric"),
  year: z
    .string()
    .optional()
    .transform((val) => (val === "" ? undefined : Number(val)))
    .refine(
      (val) => val === undefined || (!isNaN(val) && val > 0),
      "Punlishing year must be a number"
    ),
});
