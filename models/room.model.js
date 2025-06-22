import mongoose from 'mongoose';
import Bed from './bed.model.js';

const roomSchema = new mongoose.Schema({
  roomNumber: {
    type: String,
    required: true
  },
  floorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Floor',
    required: true
  },
  type: {
    type: String,
    enum: ['1-sharing', '2-sharing', '3-sharing'],
    required: true
  }
});

// Cascade delete beds when a room is deleted
roomSchema.pre('findOneAndDelete', async function (next) {
  const roomId = this.getQuery()['_id'];

  const beds = await Bed.find({ roomId }).select('_id');
  const bedIds = beds.map(b => b._id);

  await Tenant.deleteMany({ bedId: { $in: bedIds } });
  await Bed.deleteMany({ roomId });

  next();
});

const Room = mongoose.model('Room', roomSchema);
export default Room;