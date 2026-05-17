import { z } from 'zod'

export const checkoutItemSchema = z.object({
  productId: z.string().uuid(),
  quantity: z.number().int().positive(),
})

export const checkoutSchema = z.object({
  items: z.array(checkoutItemSchema).min(1),
})

export type CheckoutInput = z.infer<typeof checkoutSchema>
