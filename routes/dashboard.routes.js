
import express from 'express';
import { getDashboardSummary ,getAllTenantDetails} from '../controllers/dashboard.controller.js';

const router = express.Router();

router.get('/summary', getDashboardSummary);
router.get('/tenant-details', getAllTenantDetails);

export default router;
