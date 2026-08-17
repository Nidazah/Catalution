import { z } from "zod";

export const customerSchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  email: z
    .string()
    .trim()
    .email("Invalid email address")
    .max(200)
    .optional()
    .nullable()
    .or(z.literal("").transform(() => null)),
  phone: z
    .string()
    .trim()
    .max(40)
    .optional()
    .nullable()
    .or(z.literal("").transform(() => null)),
});

export type CustomerInput = z.infer<typeof customerSchema>;