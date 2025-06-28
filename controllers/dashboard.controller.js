// controllers/dashboard.controller.js
import Floor from '../models/floor.model.js';
import Room from '../models/room.model.js';
import Bed from '../models/bed.model.js';
import Tenant from '../models/tenant.model.js';
import { successResponse } from '../utils/apiResponse.js';

export const getDashboardSummary = async (req, res, next) => {
    try {
      const [totalFloors, totalRooms, totalBeds, totalTenants, tenantList] = await Promise.all([
        Floor.countDocuments(),
        Room.countDocuments(),
        Bed.countDocuments(),
        Tenant.countDocuments(),
        // Tenant.find()
        //   .populate({
        //     path: 'bedId',
        //     populate: {
        //       path: 'roomId',
        //       populate: {
        //         path: 'floorId',
        //       }
        //     }
        //   })
        //   .select('name phone aadharNumber documentUrl bedId')
      ]);
  
      // Format tenants to return clean details
    //   const formattedTenants = tenantList.map(t => ({
    //     name: t.name,
    //     phone: t.phone,
    //     aadharNumber: t.aadharNumber,
    //     documentUrl: t.documentUrl,
    //     floorNumber: t.bedId?.roomId?.floorId?.floorNumber || null,
    //     roomNumber: t.bedId?.roomId?.roomNumber || null,
    //     bedNumber: t.bedId?.bedNumber || null,
    //   }));
  
      successResponse(res, {
        totalFloors,
        totalRooms,
        totalBeds,
        totalTenants,
        // tenants: formattedTenants
      }, 'Dashboard summary fetched');
    } catch (err) {
      next(err);
    }
  };
  

  export const getAllTenantDetails = async (req, res, next) => {
    try {
      const tenants = await Tenant.find()
        .populate({
          path: 'bedId',
          populate: {
            path: 'roomId',
            populate: {
              path: 'floorId'
            }
          }
        })
        .select('name phone aadharNumber documentUrl bedId');
  
      const formattedTenants = tenants.map(t => ({
        name: t.name,
        phone: t.phone,
        aadharNumber: t.aadharNumber,
        documentUrl: t.documentUrl,
        floorNumber: t.bedId?.roomId?.floorId?.floorNumber || null,
        roomNumber: t.bedId?.roomId?.roomNumber || null,
        bedNumber: t.bedId?.bedNumber || null,
      }));
  
      res.status(200).json({
        success: true,
        message: 'Tenant details fetched',
        data: formattedTenants
      });
    } catch (err) {
      next(err);
    }
  };