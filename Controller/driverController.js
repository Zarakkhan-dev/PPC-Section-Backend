import db from "../Config/db.js";
import catchAsync from '../utils/catchAsync.js';
import AppError from "../utils/appError.js";

export const createDriver = catchAsync(async (req, res, next) => {
  const { name, license, identity_card, phone_number } = req.body;


  const [driver] = await db('drivers').insert({
    name,
    license,
    identity_card,
    phone_number
  }).returning('*'); 

  res.status(201).json({
    status: 'success',
    data: {
      driver,
    },
  });
});

export const getAllDrivers = catchAsync(async (req, res, next) => {
  const drivers = await db('drivers').select('*'); 

  res.status(200).json({
    status: 'success',
    results: drivers.length,
    data: {
      drivers,
    },
  });
});


export const getDriverById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  // Fetch driver by ID
  const driver = await db('drivers')
    .where({ 'drivers.id': id })
    .first(); 

  if (!driver) {
    return next(new AppError('Driver not found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      driver,
    },
  });
});

export const updateDriver = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { name, license, identity_card, phone_number } = req.body;

  
  const [updatedDriver] = await db('drivers')
    .where({ id })
    .update({
      name,
      license,
      identity_card,
      phone_number
    })
    .returning('*'); 

  if (!updatedDriver) {
    return next(new AppError('Driver not found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      driver: updatedDriver,
    },
  });
});

export const deleteDriver = catchAsync(async (req, res, next) => {
  const { id } = req.params;


  const deleted = await db('drivers').where({ id }).del();

  if (!deleted) {
    return next(new AppError('Driver not found', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
