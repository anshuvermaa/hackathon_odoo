// lib/schemas.ts
import { z } from 'zod';

export const registerSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password is required'),
});

export const addProductSchema = z.object({
  title: z.string().min(5, 'Title is too short'),
  description: z.string().min(10, 'Description is too short'),
  price: z.coerce.number().positive('Price must be a positive number'),
  category: z.string().min(3, 'Category is required'),
  condition: z.enum(['New', 'Used - Like New', 'Used - Good', 'Used - Fair']),
});

export const addReviewSchema = z.object({
  rating: z.coerce.number().min(1).max(5),
  comment: z.string().min(10, 'Comment must be at least 10 characters'),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;
export type AddProductSchema = z.infer<typeof addProductSchema>;
export type AddReviewSchema = z.infer<typeof addReviewSchema>;