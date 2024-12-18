import Joi from 'joi';

const bookingValidationSchema = Joi.object({
  car_id: Joi.number().integer().required().messages({
    'number.base': '"car_id" should be a type of number',
    'any.required': '"car_id" is a required field',
  }),
  username: Joi.string().required().messages({
    'string.base': '"username" should be a type of string',
    'any.required': '"username" is a required field',
  }),
  company_name: Joi.string().required().messages({
    'string.base': '"company_name" should be a type of string',
    'any.required': '"company_name" is a required field',
  }),
  start_date: Joi.date().required().messages({
    'date.base': '"start_date" should be a type of date',
    'any.required': '"start_date" is a required field',
  }),
  end_date: Joi.date().required().messages({
    'date.base': '"end_date" should be a type of date',
    'any.required': '"end_date" is a required field',
  }),
  price_per_day: Joi.number().precision(2).required().messages({
    'number.base': '"price_per_day" should be a type of number',
    'any.required': '"price_per_day" is a required field',
  }),
  price_per_month: Joi.number().precision(2).optional().messages({
    'number.base': '"price_per_month" should be a type of number',
  }),
  agreement: Joi.string().optional().messages({
    'string.base': '"agreement" should be a type of string',
  }),
  car_pictures: Joi.array().items(Joi.string()).optional().messages({
    'array.base': '"car_pictures" should be an array of strings',
  }),
  with_driver: Joi.boolean().default(false).optional().messages({
    'boolean.base': '"with_driver" should be a type of boolean',
  }),
  driver_id: Joi.number().integer().optional().allow(null).messages({
    'number.base': '"driver_id" should be a type of number',
  }),
});

export default bookingValidationSchema;
