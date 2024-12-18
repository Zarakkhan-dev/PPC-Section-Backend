import db from "../Config/db.js";
import catchAsync from '../utils/catchAsync.js';
import AppError from "../utils/appError.js"

export const createCard = catchAsync(async (req, res, next) => {
    const {
      
      bank_name,
      holder_name,
      card_number,
      card_charge,
      due_date,
      year_fee,
      status,
      paid_amount,
      extra_pay,
      less_pay,
    } = req.body;
  
    const [card] = await db('cards').insert({
      
      bank_name,
      holder_name,
      card_number,
      card_charge,
      due_date,
      year_fee,
      status,
      paid_amount,
      extra_pay,
      less_pay,
    }).returning('*');
  
    res.status(201).json({
      status: 'success',
      data: {
        card,
      },
    });
  });
  
  export const getAllCards = catchAsync(async (req, res, next) => {
    const cards = await db('cards').select('*');
  
    res.status(200).json({
      status: 'success',
      results: cards.length,
      data: {
        cards,
      },
    });
  });
  
  export const getCardById = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const card = await db('cards').where({ id }).first();
  
    if (!card) {
      return next(new AppError('Card record not found', 404));
    }
  
    res.status(200).json({
      status: 'success',
      data: {
        card,
      },
    });
  });
  
  export const updateCard = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const {
      bank_name,
      holder_name,
      card_number,
      card_charge,
      due_date,
      year_fee,
      status,
      paid_amount,
      extra_pay,
      less_pay,
    } = req.body;
  
    const [updatedCard] = await db('cards')
      .where({ id })
      .update({
        bank_name,
        holder_name,
        card_number,
        card_charge,
        due_date,
        year_fee,
        status,
        paid_amount,
        extra_pay,
        less_pay,
      })
      .returning('*');
  
    if (!updatedCard) {
      return next(new AppError('Card record not found', 404));
    }
  
    res.status(200).json({
      status: 'success',
      data: {
        card: updatedCard,
      },
    });
  });
  
  export const deleteCard = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const deleted = await db('cards').where({ id }).del();
  
    if (!deleted) {
      return next(new AppError('Card record not found', 404));
    }
  
    res.status(204).json({
      status: 'success',
      data: null,
    });
  });