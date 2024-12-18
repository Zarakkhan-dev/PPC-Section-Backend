import express from 'express';
import {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
} from '../Controller/bookingController.js';
import validateRequest from '../middleware/validateRequest.js';
import bookingValidationSchema from '../validation/bookingValidation.js';
const router = express.Router();

router.route('/')
  .get(getAllBookings)      
  .post(validateRequest(bookingValidationSchema),createBooking);     

router.route('/:id')
  .get(getBookingById)    
  .put(updateBooking)   
  .delete(deleteBooking);  

export default router;
