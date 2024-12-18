import db from "../Config/db.js";
import catchAsync from '../utils/catchAsync.js';
import AppError from "../utils/appError.js";

export const createBooking = catchAsync(async (req, res, next) => {
  const {
    car_id,
    username,
    company_name,
    start_date,
    end_date,
    price_per_day,
    price_per_month,
    agreement,
    car_pictures,
    with_driver,
    driver_id, 
  } = req.body;

  const [booking] = await db('bookings').insert({
    car_id,
    username,
    company_name,
    start_date,
    end_date,
    price_per_day,
    price_per_month,
    agreement,
    car_pictures: car_pictures ? JSON.stringify(car_pictures) : undefined,
    with_driver,
    driver_id: with_driver ? driver_id : null,
  }).returning('*');

  res.status(201).json({
    status: 'success',
    data: {
      booking,
    },
  });
});

export const getAllBookings = catchAsync(async (req, res, next) => {
  const bookings = await db('bookings')
    .join('cars', 'bookings.car_id', 'cars.id')
    .leftJoin('drivers', 'bookings.driver_id', 'drivers.id') 
    .select(
      'bookings.*', 
      'cars.make', 'cars.model', 
      'drivers.name as driver_name', 'drivers.license as driver_license' 
    );

  res.status(200).json({
    status: 'success',
    results: bookings.length,
    data: {
      bookings,
    },
  });
});

export const getBookingById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const booking = await db('bookings')
    .where({ 'bookings.id': id })
    .join('cars', 'bookings.car_id', 'cars.id')
    .leftJoin('drivers', 'bookings.driver_id', 'drivers.id') 
    .select(
      'bookings.*',
      'cars.make', 'cars.model',
      'drivers.name as driver_name', 'drivers.license as driver_license' 
    )
    .first();

  if (!booking) {
    return next(new AppError('Booking not found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      booking,
    },
  });
});

export const updateBooking = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const {
    username,
    company_name,
    start_date,
    end_date,
    price_per_day,
    price_per_month,
    agreement,
    car_pictures,
    with_driver,
    driver_id,
  } = req.body;

  const [updatedBooking] = await db('bookings')
    .where({ id })
    .update({
      username,
      company_name,
      start_date,
      end_date,
      price_per_day,
      price_per_month,
      agreement,
      car_pictures: car_pictures ? JSON.stringify(car_pictures) : undefined,
      with_driver,
      driver_id: with_driver ? driver_id : null,
    })
    .returning('*');

  if (!updatedBooking) {
    return next(new AppError('Booking not found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      booking: updatedBooking,
    },
  });
});

export const deleteBooking = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const deleted = await db('bookings').where({ id }).del();

  if (!deleted) {
    return next(new AppError('Booking not found', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
