// config/dbConnect.js
import mongoose from 'mongoose';

const mongoConnection = async () => {
  try {
    const baseUrl = process.env.MONGODB_URI;
    const dbName = process.env.MONGODB_DB_NAME;
    const url = `${baseUrl}/${dbName}`;

    await mongoose.connect(url)

    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection failed:', err);
    process.exit(1); // stop server if DB fails
  }
};

export default mongoConnection;
