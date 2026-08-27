import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  sku: z.string().min(1, "SKU is required").max(64),
  price: z.coerce.number().positive("Price must be greater than 0"),
  stock: z.coerce.number().int().min(0, "Stock cannot be negative"),
  categoryId: z.string().optional().nullable(),
});

export type ProductInput = z.infer<typeof productSchema>;
