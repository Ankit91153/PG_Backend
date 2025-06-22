import { z } from 'zod';

export const floorSchema = z.object({
  floorNumber: z
    .number({
      invalid_type_error: 'Floor number must be a number',
      required_error: 'Floor number is required',
    })
    .int('Floor number must be an integer')
    .min(0, 'Floor number must be 0 or higher'),
});
