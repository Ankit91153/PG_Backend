import mongoose from 'mongoose';

const tenantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  aadharNumber: {
    type: String,
    required: true,
    unique: true
  },
  documentUrl: {
    type: String, 
    default: null
  },
  bedId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bed',
    required: true
  },
  joinedAt: {
    type: Date,
    default: Date.now
  }
});

const   Tenant = mongoose.model('Tenant', tenantSchema);
export default Tenant;