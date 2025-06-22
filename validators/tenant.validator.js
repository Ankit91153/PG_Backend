import { z } from 'zod';

export const createTenantSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  phone: z.string().min(10, 'Phone must be at least 10 digits'),
  aadharNumber: z.string().min(12, 'Aadhar number must be 12 digits'),
  bedId: z.string().min(1, 'Bed ID is required'),
  documentUrl: z.string().optional() 
});

export const updateTenantSchema = z.object({
  name: z.string().min(1, 'Name is required').optional(),
  phone: z.string().min(10, 'Phone must be at least 10 digits').optional(),
  aadharNumber: z.string().min(12, 'Aadhar number must be 12 digits').optional(),
  bedId: z.string().min(1, 'Bed ID is required').optional(),
  documentUrl: z.string().optional()
});