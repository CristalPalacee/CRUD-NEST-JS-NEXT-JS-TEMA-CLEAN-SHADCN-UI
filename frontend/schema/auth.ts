import { z } from 'zod';

// Skema untuk Login
export const loginSchema = z.object({
  email: z.string().email('Format email tidak valid'),
  password: z.string().min(1, 'Password wajib diisi'),
});

// Skema untuk Register (Extend dari login + name)
export const registerSchema = loginSchema.extend({
  name: z.string().min(2, 'Nama minimal 2 karakter'),
  confirmPassword: z.string().min(8, 'Konfirmasi password minimal 8 karakter'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Password tidak cocok",
  path: ["confirmPassword"], // Error akan muncul di field confirmPassword
});

// Type Inference agar TypeScript tahu bentuk datanya
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;