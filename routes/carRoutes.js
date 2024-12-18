import express from 'express';
import {
  createCar,
  getAllCars,
  getCarById,
  updateCar,
  deleteCar,
} from '../Controller/carController.js';
import validateRequest from '../middleware/validateRequest.js';
import carValidationSchema from '../validation/carValidation.js';
const router = express.Router();

router.route('/')
  .get(getAllCars)     
  .post(validateRequest(carValidationSchema),createCar);      

router.route('/:id')
  .get(getCarById)       
  .put(updateCar)    
  .delete(deleteCar);    

export default router;
