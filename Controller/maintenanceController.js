import db from "../Config/db.js";
import catchAsync from '../utils/catchAsync.js';
import AppError from "../utils/appError.js"

export const createMaintenance = catchAsync(async (req, res, next) => {
    const { car_id, date, chassis_no, engine, cell, type, labour, total_labour_cost, total_parts_cost, grand_total } = req.body;
  
    const [maintenance] = await db('maintenance').insert({
      car_id,
      date,
      chassis_no,
      engine,
      cell,
      type,
      labour,
      total_labour_cost,
      total_parts_cost,
      grand_total,
    }).returning('*');
  
    res.status(201).json({
      status: 'success',
      data: {
        maintenance,
      },
    });
  });
  
  export const getAllMaintenanceRecords = catchAsync(async (req, res, next) => {
    const maintenanceRecords = await db('maintenance')
      .join('cars', 'maintenance.car_id', 'cars.id')
      .select('maintenance.*', 'cars.make', 'cars.model', 'cars.registration_no');
  
    res.status(200).json({
      status: 'success',
      results: maintenanceRecords.length,
      data: {
        maintenanceRecords,
      },
    });
  });
  
  export const getMaintenanceById = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const maintenance = await db('maintenance')
      .where({ 'maintenance.id': id })
      .join('cars', 'maintenance.car_id', 'cars.id')
      .select('maintenance.*', 'cars.make', 'cars.model', 'cars.registration_no')
      .first();
  
    if (!maintenance) {
      return next(new AppError('Maintenance record not found', 404));
    }
  
    res.status(200).json({
      status: 'success',
      data: {
        maintenance,
      },
    });
  });
  
  export const updateMaintenance = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const { date, chassis_no, engine, reg_no, cell, type, labour, total_labour_cost, total_parts_cost, grand_total } = req.body;
  
    const [updatedMaintenance] = await db('maintenance')
      .where({ id })
      .update({
        date,
        chassis_no,
        engine,
        reg_no,
        cell,
        type,
        labour: labour ? JSON.stringify(labour) : undefined ,
        total_labour_cost,
        total_parts_cost,
        grand_total,
      })
      .returning('*');
  
    if (!updatedMaintenance) {
      return next(new AppError('Maintenance record not found', 404));
    }
  
    res.status(200).json({
      status: 'success',
      data: {
        maintenance: updatedMaintenance,
      },
    });
  });
  
  export const deleteMaintenance = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const deleted = await db('maintenance').where({ id }).del();
  
    if (!deleted) {
      return next(new AppError('Maintenance record not found', 404));
    }
  
    res.status(204).json({
      status: 'success',
      data: null,
    });
  });