import express from 'express';
import {
  createCard,
  getAllCards,
  getCardById,
  updateCard,
  deleteCard,
} from '../Controller/cardController.js';
import validateRequest from '../middleware/validateRequest.js';
import cardValidationSchema from '../validation/cardValidation.js';
const router = express.Router();

router.route('/')
  .get(getAllCards)     
  .post(validateRequest(cardValidationSchema),createCard);     

router.route('/:id')
  .get(getCardById)  
  .put(updateCard)      
  .delete(deleteCard);   

export default router;
