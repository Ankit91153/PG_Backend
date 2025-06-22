// routes/floorRoutes.js
import express from 'express';
import {
  addFloor,
  getFloors,
  updateFloor,
  deleteFloor
} from '../controllers/floor.controller.js';
import { validate } from '../middlewares/validate.js';
import { floorSchema } from '../validators/floor.validator.js';
import { checkObjectId } from '../middlewares/checkObjectId.js';

const router = express.Router();

router.post('/', validate(floorSchema), addFloor);
router.get('/', getFloors);
router.put('/:id',checkObjectId('id'),  validate(floorSchema), updateFloor);
router.delete('/:id', checkObjectId('id'), deleteFloor);

export default router;
