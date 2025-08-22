import z from "zod";

export const loginSchema = z.object({
   email: z.email(),
   password: z.string().min(1, "Minimum of 1 character required"),
});