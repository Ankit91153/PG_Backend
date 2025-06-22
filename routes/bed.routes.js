import express from 'express';
import {
  addBed,
  getBedsByRoom,
  updateBed,
  deleteBed
} from '../controllers/bed.controller.js';
import { validate } from '../middlewares/validate.js';
import { bedSchema, updateBedSchema } from '../validators/bed.validator.js';
import { checkObjectId } from '../middlewares/checkObjectId.js';

const router = express.Router();

// Create bed
router.post(
  '/',
  validate(bedSchema),
  addBed
);

// Get beds by room
router.get(
  '/room/:roomId',
  checkObjectId('roomId'),
  getBedsByRoom
);

// Update bed
router.put(
  '/:id',
  checkObjectId('id'),
  validate(updateBedSchema),
  updateBed
);

// Delete bed
router.delete(
  '/:id',
  checkObjectId('id'),
  
  deleteBed
);

export default router;
