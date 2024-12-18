import Joi from 'joi';

const driverValidationSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.base': '"name" should be a type of string',
    'any.required': '"name" is a required field',
  }),
  license: Joi.string().required().messages({
    'string.base': '"license" should be a type of string',
    'any.required': '"license" is a required field',
  }),
  identity_card: Joi.string().optional().messages({
    'string.base': '"identity_card" should be a type of string',
  }),
  phone_number: Joi.string().optional().messages({
    'string.base': '"phone_number" should be a type of string',
  }),
});

export default driverValidationSchema;
