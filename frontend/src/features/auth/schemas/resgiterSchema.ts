import * as z from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(3, "Nama minimal 3 karakter"),
    email: z.email("Format email tidak valid"),
    password: z.string().min(6, "Password minimal 6 karakter"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password tidak cocok",
    path: ["confirmPassword"],
  });

export type RegisterFormSchema = z.infer<typeof registerSchema>;
