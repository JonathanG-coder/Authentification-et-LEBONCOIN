import { z } from "zod";

export const registerSchema = z
  .object({
    email: z.string().email("Un mail est requis"),
    password: z.string().min(8, "Minimum 8 caractères"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les deux mots de passe ne sont pas identiques",
    path: ["confirmPassword"],
  });
