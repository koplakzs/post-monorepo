import { z } from "zod";

export const postSchema = z.object({
  title: z
    .string()
    .min(5, "Judul minimal 5 karakter")
    .max(100, "Judul terlalu panjang"),
  post: z.string().min(10, "Konten minimal 10 karakter"),
});

export type PostFormSchema = z.infer<typeof postSchema>;
