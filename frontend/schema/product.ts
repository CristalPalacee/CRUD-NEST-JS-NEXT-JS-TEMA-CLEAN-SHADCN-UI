import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(3, 'Nama produk minimal 3 karakter'),
  price: z.coerce.number().min(1000, 'Harga minimal 1.000'),
  category: z.string().min(1, 'Pilih kategori'),
  description: z.string().min(10, 'Deskripsi minimal 10 karakter'),
  userId: z.string().optional().default("cmv0gl0fz0000ngutu8ns7aob"),
});

export type ProductInput = z.input<typeof productSchema>;
export type ProductOutput = z.output<typeof productSchema>;

export interface Product extends ProductOutput {
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductResponse {
  success: boolean;
  data: Product[]; // Ini supaya .data bisa dibaca di hooks
  messages?: string;
}