import Joi from 'joi';

const cardValidationSchema = Joi.object({
  bank_name: Joi.string().required().messages({
    'string.base': 'Bank name should be a string.',
    'any.required': 'Bank name is required.'
  }),

  holder_name: Joi.string().required().messages({
    'string.base': 'Holder name should be a string.',
    'any.required': 'Holder name is required.'
  }),

  card_number: Joi.string().length(16).required().messages({
    'string.base': 'Card number should be a string.',
    'string.length': 'Card number should be exactly 16 characters.',
    'any.required': 'Card number is required.'
  }),

  card_charge: Joi.number().precision(2).optional().messages({
    'number.base': 'Card charge should be a number.',
    'number.precision': 'Card charge should have up to two decimal places.'
  }),

  due_date: Joi.date().optional().messages({
    'date.base': 'Due date should be a valid date.'
  }),

  year_fee: Joi.number().precision(2).optional().messages({
    'number.base': 'Yearly fee should be a number.',
    'number.precision': 'Yearly fee should have up to two decimal places.'
  }),

  status: Joi.string().valid('paid', 'pending', 'overdue').default('pending').messages({
    'any.only': 'Status must be one of [paid, pending, overdue].'
  }),

  paid_amount: Joi.number().precision(2).optional().messages({
    'number.base': 'Paid amount should be a number.',
    'number.precision': 'Paid amount should have up to two decimal places.'
  }),

  extra_pay: Joi.number().precision(2).optional().messages({
    'number.base': 'Extra pay should be a number.',
    'number.precision': 'Extra pay should have up to two decimal places.'
  }),

  less_pay: Joi.number().precision(2).optional().messages({
    'number.base': 'Less pay should be a number.',
    'number.precision': 'Less pay should have up to two decimal places.'
  })
});

export default cardValidationSchema;
