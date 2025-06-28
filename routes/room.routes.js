import express from 'express';
import {
  addRoom,
  getRoomsByFloor,
  updateRoom,
  deleteRoom,
  getAllRooms
} from '../controllers/room.controller.js';
import { validate } from '../middlewares/validate.js';
import { roomSchema, roomUpdateSchema } from '../validators/room.validator.js';
import { checkObjectId } from '../middlewares/checkObjectId.js';

const router = express.Router();

// Create room (validate body)
router.post(
  '/',
  validate(roomSchema),
  addRoom
);

// Get rooms by floor (validate floorId param)
router.get(
  '/floor/:floorId',
  checkObjectId('floorId'),
  getRoomsByFloor
);

router.get(
  '/',
  getAllRooms
);

// Update room (validate id param and body)
router.put(
  '/:id',
  checkObjectId('id'),
  validate(roomUpdateSchema),
  updateRoom
);

// Delete room (validate id param)
router.delete(
  '/:id',
  checkObjectId('id'),
  deleteRoom
);

export default router;