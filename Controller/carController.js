import db from "../Config/db.js";
import catchAsync from '../utils/catchAsync.js';
import AppError from "../utils/appError.js";

export const createCar = catchAsync(async (req, res, next) => {
  const { make, model, variant, registration_no, documents } = req.body;
  const documentsToSave = documents ? JSON.stringify(documents) : null;

  const [car] = await db('cars').insert({
    make,
    model,
    variant,
    registration_no,
    documents: documentsToSave, 
  }).returning('*');

  res.status(201).json({
    status: 'success',
    data: {
      car,
    },
  });
});

export const getAllCars = catchAsync(async (req, res, next) => {
  const cars = await db('cars').select('*');
  res.status(200).json({
    status: 'success',
    results: cars.length,
    data: cars
  });
});

export const getCarById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const car = await db('cars').where({ id }).first();

  if (!car) {
    return next(new AppError('Car not found', 404));
  }
  car.documents = car.documents ? JSON.parse(car.documents) : null;

  res.status(200).json({
    status: 'success',
    data: {
      car,
    },
  });
});

export const updateCar = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { make, model, variant, registration_no, documents } = req.body;

  // Check if documents are passed and stringify if exists
  const documentsToSave = documents ? JSON.stringify(documents) : null;

  const [updatedCar] = await db('cars')
    .where({ id })
    .update({
      make,
      model,
      variant,
      registration_no,
      documents: documentsToSave, // Save documents as stringified JSON
    })
    .returning('*');

  if (!updatedCar) {
    return next(new AppError('Car not found', 404));
  }

  // Parse documents back to JSON if needed
  updatedCar.documents = updatedCar.documents ? JSON.parse(updatedCar.documents) : null;

  res.status(200).json({
    status: 'success',
    data: {
      car: updatedCar,
    },
  });
});

export const deleteCar = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const deleted = await db('cars').where({ id }).del();

  if (!deleted) {
    return next(new AppError('Car not found', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
