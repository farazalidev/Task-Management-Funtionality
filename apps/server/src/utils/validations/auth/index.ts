import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const RegisterSchema = z.object({
  email: z.string().email(),
  first_name: z.string().min(3).max(36),
  last_name: z.string().min(3).max(36),
  password: z.string().min(8),
});

export type LoginSchemaBody = z.infer<typeof LoginSchema>;
export type RegisterSchemaBody = z.infer<typeof RegisterSchema>;
