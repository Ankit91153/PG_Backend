import { z } from 'zod';

export const roomSchema = z.object({
  roomNumber: z
    .string({
      invalid_type_error: 'Room number must be a string',
      required_error: 'Room number is required'
    })
    .min(1, 'Room number cannot be empty'),
  floorId: z
    .string({ required_error: 'Floor ID is required' })
    .refine(val => val.length > 0, 'Floor ID cannot be empty'),
  type: z
    .enum(['1-sharing', '2-sharing', '3-sharing'], {
      errorMap: () => ({ message: 'Type must be one of 1-sharing, 2-sharing, 3-sharing' })
    })
});
export const roomUpdateSchema = z.object({
  roomNumber: z
    .string({
      invalid_type_error: 'Room number must be a string',
      required_error: 'Room number is required'
    })
    .min(1, 'Room number cannot be empty'),
  
  type: z
    .enum(['1-sharing', '2-sharing', '3-sharing'], {
      errorMap: () => ({ message: 'Type must be one of 1-sharing, 2-sharing, 3-sharing' })
    })
});