import { z } from 'zod';

export const bedSchema = z.object({
  bedNumber: z
    .string({
      invalid_type_error: 'Bed number must be a string',
      required_error: 'Bed number is required'
    })
    .min(1, 'Bed number cannot be empty'),
  roomId: z
    .string({ required_error: 'Room ID is required' })
    .refine(val => val.length > 0, 'Room ID cannot be empty'),
  tenantId: z
    .string()
    .optional(),
  status: z
    .enum(['available', 'occupied'], {
      errorMap: () => ({ message: 'Status must be available or occupied' })
    })
});
export const updateBedSchema = z.object({
  
  bedNumber: z
    .string({ invalid_type_error: 'Bed number must be a string' })
    .min(1, 'Bed number cannot be empty')
    .optional(),
  status: z
    .enum(['available', 'occupied'], {
      errorMap: () => ({ message: 'Status must be available or occupied' })
    })
    .optional()
});