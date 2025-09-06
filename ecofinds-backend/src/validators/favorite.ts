import { z } from 'zod';

export const toggleFavoriteSchema = z.object({
  productId: z.number()
});
