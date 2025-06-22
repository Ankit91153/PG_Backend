import mongoose from 'mongoose';
import Tenant from './tenant.model.js';

const bedSchema = new mongoose.Schema({
  bedNumber: {
    type: String,
    required: true
  },
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true
  },
  tenantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tenant',
    default: null
  },
  status: {
    type: String,
    enum: ['available', 'occupied'],
    default: 'available'
  }
});

// Cascade delete tenant when bed is removed (optional)
bedSchema.pre('findOneAndDelete', async function (next) {
  const bedId = this.getQuery()['_id'];
  await Tenant.deleteMany({ bedId });
  next();
});

const Bed = mongoose.model('Bed', bedSchema);
export default Bed;