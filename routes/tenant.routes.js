import express from 'express';
import {
  addTenant,
  getTenants,
  getTenantByName,
  updateTenant,
  deleteTenant
} from '../controllers/tenant.controller.js';
import { validate } from '../middlewares/validate.js';
import { createTenantSchema, updateTenantSchema } from '../validators/tenant.validator.js';
import { checkObjectId } from '../middlewares/checkObjectId.js';
import { upload } from '../middlewares/uploadFile.js';

const router = express.Router();

router.post('/', upload.single('documentUrl'), (req, res, next) => {
    req.body = {
     
      name: req.body?.name ?? '',
      phone: req.body?.phone ?? '',
      aadharNumber: req.body?.aadharNumber ?? '',
      bedId: req.body?.bedId ?? '',
      documentUrl: req.file?.path ?? undefined
    };
    next();
  }, validate(createTenantSchema), addTenant);
  
  router.get('/', getTenants);
router.get('/search/:name', getTenantByName);
router.put('/:id', checkObjectId('id'), validate(updateTenantSchema), updateTenant);
router.delete('/:id', checkObjectId('id'), deleteTenant);

export default router;