import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreateProductSchema = z.object({
  name: z.string().min(3, 'Nama produk minimal 3 karakter'),
  price: z.number().positive('Harga harus lebih dari 0'),
  category: z.string(),
  description: z.string().min(10, 'Deskripsi minimal 10 karakter'),
  userId: z.string(),
});

export type CreateProductDtoType = z.infer<typeof CreateProductSchema>;
export class CreateProductDto extends createZodDto(CreateProductSchema) {}
