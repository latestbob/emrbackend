import { body, validationResult } from 'express-validator';


export const validateOffice = [
    body('name').isString().withMessage('Name must be a string').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Email must be a valid email address').notEmpty().withMessage('Email is required'),
    body('phone').isString().withMessage('Phone must be a string')
    .notEmpty().withMessage("Phone number is required")
    .isLength({min:10 , max:15}).withMessage("Phone number must be between 10 and 15 characters long")
    .matches(/^(?:\+?234|0)?[1-9]\d{9,14}$/).withMessage('Phone number must be a valid international phone number'),

    
  ];