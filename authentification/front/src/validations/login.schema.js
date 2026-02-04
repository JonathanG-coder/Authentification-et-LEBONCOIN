import {z} from 'zod'

export const registerSchemaLogin = z.object({

    email: z.email("Un email valide est requis"),
    password: z.string().min(8, "Minimum 8 caracteres"),
    // confirmPassword: z.string()
})

// .refine((data) => data.password === data.confirmPassword, {
//     message: "email ou mot de passe mauvais",
//     path: ["confirmPassword"],
// })
