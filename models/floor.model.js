// models/floorModel.js
import mongoose from 'mongoose';
import Room from './room.model.js';
import Bed from './bed.model.js';

const floorSchema = new mongoose.Schema({
  floorNumber: {
    type: Number,
    required: true,
    unique: true,
  }
});

// 🔁 Cascade delete rooms when floor is deleted
floorSchema.pre('findOneAndDelete', async function (next) {
  const floorId = this.getQuery()['_id'];

  const rooms = await Room.find({ floorId }).select('_id');
  const roomIds = rooms.map(r => r._id);

  const beds = await Bed.find({ roomId: { $in: roomIds } }).select('_id');
  const bedIds = beds.map(b => b._id);

  await Tenant.deleteMany({ bedId: { $in: bedIds } });
  await Bed.deleteMany({ roomId: { $in: roomIds } });
  await Room.deleteMany({ floorId });

  next();
});

const Floor = mongoose.model('Floor', floorSchema);
export default Floor;
