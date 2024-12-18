import db from "../Config/db.js";
import catchAsync from '../utils/catchAsync.js';
import AppError from "../utils/appError.js";

export const createFueling = catchAsync(async (req, res, next) => {
    const { booking_id, customer_paid, verified, total_amount_paid, remaining_amount_left, bill_paid } = req.body;

    const [fueling] = await db('fueling').insert({
        booking_id,
        customer_paid: customer_paid !== undefined ? customer_paid : false,
        verified: verified !== undefined ? verified : false,
        total_amount_paid: total_amount_paid || 0.00,
        remaining_amount_left: remaining_amount_left || 0.00,
        bill_paid: bill_paid !== undefined ? bill_paid : false,
    }).returning('*');
  
    res.status(201).json({
        status: 'success',
        data: {
            fueling,
        },
    });
});

export const getAllFuelings = catchAsync(async (req, res, next) => {
    const fuelings = await db('fueling')
        .join('bookings', 'fueling.booking_id', 'bookings.id')
        .select('fueling.*', 'bookings.username', 'bookings.company_name');

    res.status(200).json({
        status: 'success',
        results: fuelings.length,
        data: {
            fuelings,
        },
    });
});

export const getFuelingById = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const fueling = await db('fueling')
        .where({ 'fueling.id': id })
        .join('bookings', 'fueling.booking_id', 'bookings.id')
        .select('fueling.*', 'bookings.username', 'bookings.company_name')
        .first();

    if (!fueling) {
        return next(new AppError('Fueling record not found', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            fueling,
        },
    });
});

export const updateFueling = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const { customer_paid, verified, total_amount_paid, remaining_amount_left, bill_paid } = req.body;

    const [updatedFueling] = await db('fueling')
        .where({ id })
        .update({
            customer_paid: customer_paid !== undefined ? customer_paid : false,
            verified: verified !== undefined ? verified : false,
            total_amount_paid: total_amount_paid || 0.00,
            remaining_amount_left: remaining_amount_left || 0.00,
            bill_paid: bill_paid !== undefined ? bill_paid : false,
        })
        .returning('*');

    if (!updatedFueling) {
        return next(new AppError('Fueling record not found', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            fueling: updatedFueling,
        },
    });
});

export const deleteFueling = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const deleted = await db('fueling').where({ id }).del();

    if (!deleted) {
        return next(new AppError('Fueling record not found', 404));
    }

    res.status(204).json({
        status: 'success',
        data: null,
    });
});
