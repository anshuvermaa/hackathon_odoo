import { z } from 'zod';

export const createProductSchema = z.object({
  title: z.string().min(2),
  description: z.string().optional(),
  price: z.number().nonnegative(),
  condition: z.enum(['new','like_new','good','fair']),
  categoryId: z.number().optional()
});

export const listQuerySchema = z.object({
  q: z.string().optional(),
  categoryId: z.string().optional(),
  minPrice: z.string().optional(),
  maxPrice: z.string().optional(),
  page: z.string().optional(),
  pageSize: z.string().optional()
});
