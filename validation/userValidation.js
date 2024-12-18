import Joi from 'joi';

const userValidationSchema = Joi.object({
    username: Joi.string()
        .min(3)
        .max(30)
        .required()
        .messages({
            'string.base': 'Username should be a type of text',
            'string.empty': 'Username cannot be empty',
            'string.min': 'Username should have a minimum length of {#limit}',
            'string.max': 'Username should have a maximum length of {#limit}',
            'any.required': 'Username is required'
        }),

    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.email': 'Please enter a valid email address',
            'any.required': 'Email is required'
        }),

    password: Joi.string()
        .min(6)
        .required()
        .messages({
            'string.empty': 'Password cannot be empty',
            'string.min': 'Password should have a minimum length of {#limit}',
            'any.required': 'Password is required'
        }),

    role: Joi.string()
        .valid('admin', 'user')
        .default('admin')
        .messages({
            'string.base': 'Role should be a type of text',
            'any.only': 'Role must be either "admin" or "user"'
        }),

    accessToken: Joi.string().optional(),

    refreshToken: Joi.string().optional(),

    resetPasswordToken: Joi.string().optional(),

    resetPasswordExpires: Joi.date().optional()
});

export default userValidationSchema