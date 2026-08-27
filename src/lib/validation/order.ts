import { z } from "zod";

export const orderItemSchema = z.object({
  productId: z.string().min(1, "Product is required"),
  quantity: z.coerce.number().int().positive("Quantity must be at least 1"),
});

export const orderSchema = z.object({
  customerId: z.string().optional().nullable(),
  status: z.enum(["PENDING", "PAID", "CANCELLED", "REFUNDED"]).default("PENDING"),
  items: z.array(orderItemSchema).min(1, "At least one item is required"),
});

export type OrderInput = z.infer<typeof orderSchema>;
export type OrderItemInput = z.infer<typeof orderItemSchema>;