import Joi from 'joi';

const carValidationSchema = Joi.object({
  make: Joi.string().required().messages({
    'string.base': '"make" should be a type of string',
    'any.required': '"make" is a required field',
  }),
  model: Joi.string().required().messages({
    'string.base': '"model" should be a type of string',
    'any.required': '"model" is a required field',
  }),
  variant: Joi.string().optional().messages({
    'string.base': '"variant" should be a type of string',
  }),
  registration_no: Joi.string().required().messages({
    'string.base': '"registration_no" should be a type of string',
    'any.required': '"registration_no" is a required field',
  }),
  documents: Joi.array().items(Joi.object()).optional().messages({
    'array.base': '"documents" should be an array of objects',
  }),
});

export default carValidationSchema;
