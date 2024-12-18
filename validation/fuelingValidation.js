import Joi from 'joi';

const fuelingValidationSchema = Joi.object({
  booking_id: Joi.number().integer().positive().required().messages({
    'number.base': 'Booking ID should be a number.',
    'number.integer': 'Booking ID should be an integer.',
    'number.positive': 'Booking ID should be a positive number.',
    'any.required': 'Booking ID is required.'
  }),

  customer_paid: Joi.boolean().default(false).messages({
    'boolean.base': 'Customer Paid should be a boolean.'
  }),

  verified: Joi.boolean().default(false).messages({
    'boolean.base': 'Verified should be a boolean.'
  })
});

export default fuelingValidationSchema;
