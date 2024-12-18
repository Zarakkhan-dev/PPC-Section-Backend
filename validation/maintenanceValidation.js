import Joi from 'joi';

const maintenanceValidationSchema = Joi.object({
  car_id: Joi.number().integer().positive().required().messages({
    'number.base': 'Car ID should be a number.',
    'number.integer': 'Car ID should be an integer.',
    'number.positive': 'Car ID should be a positive number.',
    'any.required': 'Car ID is required.'
  }),

  date: Joi.date().required().messages({
    'date.base': 'Date should be a valid date format.',
    'any.required': 'Date is required.'
  }),

  chassis_no: Joi.string().optional().allow(null).messages({
    'string.base': 'Chassis number should be a string.'
  }),

  engine: Joi.string().optional().allow(null).messages({
    'string.base': 'Engine should be a string.'
  }),

  cell: Joi.string().optional().allow(null).messages({
    'string.base': 'Cell should be a string.'
  }),

  type: Joi.string().optional().allow(null).messages({
    'string.base': 'Type should be a string.'
  }),

  labour: Joi.string().optional().allow(null).messages({
    'string.base': 'Labour should be a string.'
  }),

  total_labour_cost: Joi.number().precision(2).positive().required().messages({
    'number.base': 'Total labour cost should be a number.',
    'number.precision': 'Total labour cost should have up to two decimal places.',
    'number.positive': 'Total labour cost should be a positive number.',
    'any.required': 'Total labour cost is required.'
  }),

  total_parts_cost: Joi.number().precision(2).positive().required().messages({
    'number.base': 'Total parts cost should be a number.',
    'number.precision': 'Total parts cost should have up to two decimal places.',
    'number.positive': 'Total parts cost should be a positive number.',
    'any.required': 'Total parts cost is required.'
  }),

  grand_total: Joi.number().precision(2).positive().required().messages({
    'number.base': 'Grand total should be a number.',
    'number.precision': 'Grand total should have up to two decimal places.',
    'number.positive': 'Grand total should be a positive number.',
    'any.required': 'Grand total is required.'
  })
});

export default maintenanceValidationSchema;
