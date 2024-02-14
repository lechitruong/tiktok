import Joi from 'joi';
export const validateString = Joi.string().required();
export const validateEmail = Joi.string().required();
export const validatePassword = Joi.string().required().min(6);
