import express from 'express';
import {
  createMaintenance,
  getAllMaintenanceRecords,
  getMaintenanceById,
  updateMaintenance,
  deleteMaintenance,
} from '../Controller/maintenanceController.js';
import validateRequest from '../middleware/validateRequest.js';
import maintenanceValidationSchema from '../validation/maintenanceValidation.js';
const router = express.Router();

router.route('/')
  .get(getAllMaintenanceRecords)    
  .post(validateRequest(maintenanceValidationSchema),createMaintenance);          

router.route('/:id')
  .get(getMaintenanceById)        
  .put(updateMaintenance)          
  .delete(deleteMaintenance);     

export default router;
