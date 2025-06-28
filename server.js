// server.js
import express from 'express';
import dotenv from 'dotenv';
import mongoConnection from './config/dbConnect.js';
import errorHandler from './middlewares/errorHandler.js';
import floorRoutes from './routes/floor.routes.js'
import roomRoutes from './routes/room.routes.js'
import bedRoutes from './routes/bed.routes.js'
import tenantRoutes from './routes/tenant.routes.js'
import dashboardRoutes from './routes/dashboard.routes.js'
import cors from 'cors';
dotenv.config(); // load .env file

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(errorHandler);

// Routes
app.get("/ping", (req, res) => {
  res.status(200).json({ success: true, message: "Server is live!" })
})
app.use('/api/v1/floor',floorRoutes)
app.use('/api/v1/room',roomRoutes)
app.use('/api/v1/bed',bedRoutes)
app.use('/api/v1/tenant',tenantRoutes)
app.use('/api/v1/dashboard', dashboardRoutes);



// MongoDb Connection
await mongoConnection();


// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
