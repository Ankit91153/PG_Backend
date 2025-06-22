import Tenant from '../models/tenant.model.js';
import Bed from '../models/bed.model.js';

import { errorResponse, successResponse } from '../utils/apiResponse.js';

// Add Tenant
export const addTenant = async (req, res, next) => {
    try {
      const { name, phone, aadharNumber, bedId } = req.body;
      const documentUrl = req.file ? req.file.path : null;
  
      const bed = await Bed.findById(bedId);
      if (!bed) return errorResponse(res, 'Bed not found', 404);
      if (bed.status === 'occupied') return errorResponse(res, 'Bed is already occupied', 400);
  
      const tenant = await Tenant.create({ name, phone, aadharNumber, bedId, documentUrl });
  
      bed.status = 'occupied';
      bed.tenantId = tenant._id;
      await bed.save();
  
      return successResponse(res, tenant, 'Tenant added successfully', 201);
    } catch (error) {
      next(error);
    }
  };    

// Get Tenants
export const getTenants = async (req, res, next) => {
  try {
    const tenants = await Tenant.find().populate({
      path: 'bedId',
      populate: {
        path: 'roomId',
        populate: {
          path: 'floorId'
        }
      }
    });
    return successResponse(res, tenants, 'Tenants fetched');
  } catch (error) {
    next(error);
  }
};

// Get Tenant by Name
export const getTenantByName = async (req, res, next) => {
  try {
    const { name } = req.params;
    const tenant = await Tenant.findOne({ name: new RegExp('^' + name + '$', 'i') }).populate({
      path: 'bedId',
      populate: {
        path: 'roomId',
        populate: {
          path: 'floorId'
        }
      }
    });
    if (!tenant) return errorResponse(res, "Tenant not found", 400);
    return successResponse(res, tenant, 'Tenant fetched');
  } catch (error) {
    next(error);
  }
};

// Update Tenant
export const updateTenant = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const tenant = await Tenant.findByIdAndUpdate(id, updates, { new: true });
    if (!tenant) return errorResponse(res, "Tenant not found", 400);
    return successResponse(res, tenant, 'Tenant updated');
  } catch (error) {
    next(error);
  }
};

// Delete Tenant
export const deleteTenant = async (req, res, next) => {
  try {
    const { id } = req.params;
    const tenant = await Tenant.findByIdAndDelete(id);
    if (!tenant) return errorResponse(res, "Tenant not found", 400);

    const bed = await Bed.findById(tenant.bedId);
    if (bed) {
      bed.status = 'available';
      bed.tenantId = null;
      await bed.save();
    }

    return successResponse(res, {}, 'Tenant deleted successfully');
  } catch (error) {
    next(error);
  }
};