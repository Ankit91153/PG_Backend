import Room from '../models/room.model.js';
import { errorResponse, successResponse } from '../utils/apiResponse.js';

// Add Room
export const addRoom = async (req, res, next) => {
  try {
    const { roomNumber, floorId, type } = req.body;
    const existing = await Room.findOne({ roomNumber, floorId });
    if (existing) return errorResponse(res, "Room already exists on this floor", 400);

    const room = await Room.create({ roomNumber, floorId, type });
    return successResponse(res, room, 'Room added successfully', 201);
  } catch (error) {
    next(error);
  }
};

// Get Rooms by Floor
export const getRoomsByFloor = async (req, res, next) => {
  try {
    const { floorId } = req.params;
    const rooms = await Room.find({ floorId }).sort({ roomNumber: 1 });
    return successResponse(res, rooms, 'Rooms fetched');
  } catch (error) {
    next(error);
  }
};

// Update Room
export const updateRoom = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { roomNumber, type } = req.body;
    const room = await Room.findByIdAndUpdate(id, { roomNumber, type }, { new: true });
    if (!room) return errorResponse(res, "Room not found", 404);
    return successResponse(res, room, 'Room updated successfully');
  } catch (error) {
    next(error);
  }
};

// Delete Room
export const deleteRoom = async (req, res, next) => {
  try {
    const { id } = req.params;
    const room = await Room.findOneAndDelete({ _id: id });
    if (!room) return errorResponse(res, "Room not found", 404);
    return successResponse(res, {}, 'Room deleted successfully');
  } catch (error) {
    next(error);
  }
};