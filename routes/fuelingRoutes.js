import express from 'express';
import {
  createFueling,
  getAllFuelings,
  getFuelingById,
  updateFueling,
  deleteFueling,
} from '../Controller/fuelingController.js';
import validateRequest from '../middleware/validateRequest.js';
import fuelingValidationSchema from '../validation/fuelingValidation.js';
const router = express.Router();

router.route('/')
  .get(getAllFuelings)   
  .post(validateRequest(fuelingValidationSchema),createFueling);     

router.route('/:id')
  .get(getFuelingById)        
  .put(updateFueling)  
  .delete(deleteFueling);   

export default router;
