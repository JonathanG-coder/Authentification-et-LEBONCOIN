import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Email invalide" }),
  password: z.string().min(6, { message: "Mot de passe trop court" }),
});

export const registerSchema = z
  .object({
    email: z.string().email({ message: "Email invalide" }),
    password: z.string().min(6, { message: "Mot de passe trop court" }),
    confirmPassword: z.string().min(6),
    avatar: z.any().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });
