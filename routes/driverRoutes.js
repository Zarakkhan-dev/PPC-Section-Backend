import express from 'express';
import {
  createDriver,
  getAllDrivers,
  getDriverById,
  updateDriver,
  deleteDriver,
} from '../Controller/driverController.js';
import validateRequest from '../middleware/validateRequest.js';
import driverValidationSchema from '../validation/driverValidation.js';
const router = express.Router();

router.route('/')
  .get(getAllDrivers)      
  .post(validateRequest(driverValidationSchema),createDriver);    

router.route('/:id')
  .get(getDriverById)         
  .put(updateDriver)  
  .delete(deleteDriver);      

export default router;
