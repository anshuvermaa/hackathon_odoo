import { z } from 'zod';

export const createOrderSchema = z.object({
  items: z.array(z.object({
    productId: z.number(),
    quantity: z.number().min(1)
  }))
});
