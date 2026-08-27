import { z } from "zod";

export const pricingFeatureSchema = z.object({
  text: z.string().min(1, "Feature text is required"),
  included: z.boolean(),
});

export const pricingPlanSchema = z.object({
  name: z.string().min(1, "Name is required"),
  monthly: z.string().min(1, "Monthly price is required"),
  yearly: z.string().min(1, "Yearly price is required"),
  features: z.array(pricingFeatureSchema).min(1, "At least one feature is required"),
  active: z.boolean().optional().default(true),
  published: z.boolean().optional().default(true),
  sortOrder: z.number().int().optional().default(0),
});

export const pricingPlanUpdateSchema = pricingPlanSchema.partial();