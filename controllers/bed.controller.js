import Bed from '../models/bed.model.js';
import { errorResponse, successResponse } from '../utils/apiResponse.js';
import Room from '../models/room.model.js';

// Add Bed
export const addBed = async (req, res, next) => {
  try {
    const { bedNumber, roomId, status } = req.body;

    // 1. Load room to get its sharing type
    const room = await Room.findById(roomId);
    if (!room) return errorResponse(res, "Room not found", 404)

    // 2. Determine max beds allowed
    const maxBeds = parseInt(room.type[0], 10);  

   
    const currentCount = await Bed.countDocuments({ roomId });

    if (currentCount >= maxBeds) 
        return errorResponse(res, `Cannot add more beds: this is a ${room.type} room (max ${maxBeds} beds).`, 400);
    
      
    const existing = await Bed.findOne({ bedNumber, roomId });

    if (existing) return errorResponse(res, "Bed already exists in this room", 400);

    const bed = await Bed.create({ bedNumber, roomId, status });
    return successResponse(res, bed, 'Bed added successfully', 201);
  } catch (error) {
    next(error);
  }
};

// Get Beds by Room
export const getBedsByRoom = async (req, res, next) => {
  try {
    const { roomId } = req.params;
    const beds = await Bed.find({ roomId }).sort({ bedNumber: 1 });
    return successResponse(res, beds, 'Beds fetched');
  } catch (error) {
    next(error);
  }
};

// Update Bed
export const updateBed = async (req, res, next) => {
    try {
      const { id } = req.params;
      const updates = {};             
      if (req.body.bedNumber !== undefined) updates.bedNumber = req.body.bedNumber;
      if (req.body.status     !== undefined) updates.status     = req.body.status;
    //   if (req.body.tenantId   !== undefined) updates.tenantId   = req.body.tenantId;
  
      const bed = await Bed.findByIdAndUpdate(id, updates, { new: true });
      if (!bed) return errorResponse(res, "Bed not found", 404);
      return successResponse(res, bed, "Bed updated successfully");
    } catch (error) {
      next(error);
    }
  };
  

// Delete Bed
export const deleteBed = async (req, res, next) => {
  try {
    const { id } = req.params;
    const bed = await Bed.findOneAndDelete({ _id: id });
    if (!bed) return errorResponse(res, "Bed not found", 404);
    return successResponse(res, {}, 'Bed deleted successfully');
  } catch (error) {
    next(error);
  }
};
