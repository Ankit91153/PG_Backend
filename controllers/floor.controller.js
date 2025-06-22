// controllers/floorController.js
import Floor from "../models/floor.model.js";
import { successResponse, errorResponse } from "../utils/apiResponse.js";

// Add Floor
export const addFloor = async (req, res,next) => {
  try {
    const { floorNumber } = req.body;
    const existing = await Floor.findOne({ floorNumber });
    if (existing) return errorResponse(res, "Floor already exists", 400);

    const floor = await Floor.create({ floorNumber });
    return successResponse(res, floor, "Floor added successfully", 201);
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

// Get All Floors
export const getFloors = async (req, res,next) => {
  try {
    const floors = await Floor.find().sort({ floorNumber: 1 });
    return successResponse(res, floors, "Floors fetched");
  } catch (error) {
    next(error);
  }
};

// Update Floor
export const updateFloor = async (req, res,next) => {
  try {
    const { id } = req.params;
    const { floorNumber } = req.body;
    const floor = await Floor.findByIdAndUpdate(
      id,
      { floorNumber },
      { new: true }
    );
    if (!floor) return errorResponse(res, "Floor not found", 404);
    return successResponse(res, floor, "Floor updated");
  } catch (error) {
    next(error);
  }
};

// Delete Floor
export const deleteFloor = async (req, res,next) => {
  try {
    const { id } = req.params;
    const floor = await Floor.findOneAndDelete({ _id: id });
    if (!floor) return errorResponse(res, "Floor not found", 404);
    return successResponse(res, {}, "Floor deleted");
  } catch (error) {
    next(error);
  }
};
