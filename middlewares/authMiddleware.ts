import { body, validationResult } from 'express-validator';





export const validateRegiseter = [

    body('firstname').isString().withMessage("firstname must be a string").notEmpty().withMessage("Firstname is required").matches(/^[A-Za-z]+$/).withMessage("firstname must contain only alphabets"),
    body('lastname').isString().withMessage("lastname must be a string").notEmpty().withMessage("Last name is required").matches(/^[A-Za-z]+$/).withMessage("lastname must contain only alphabets"),
    body('email').isEmail().withMessage("email must be a valid email").notEmpty().withMessage("Email is required"),
    body('phone').isString().withMessage('Phone must be a string')
    .notEmpty().withMessage("Phone number is required")
    .isLength({min:10 , max:15}).withMessage("Phone number must be between 10 and 15 characters long")
    .matches(/^(?:\+?234|0)?[1-9]\d{9,14}$/).withMessage('Phone number must be a valid international phone number'),

    body('office').isString().withMessage("office must be a string").notEmpty().withMessage("Office is required"),
    body('gender').isString().withMessage("gender must be a string").notEmpty().withMessage("Gender is required").isIn(["Male", "Female"]).withMessage("Gender must be either 'Male' or 'Female'"),    
    body('uuid').optional().isString().withMessage("uuid must be a string"),
    body('role').isString().withMessage("role must be a string").notEmpty().withMessage("role is required"),
    body('department').optional().isString().withMessage("department must be a string"),
    body('position').optional().isString().withMessage("position must be a string"),
    body('password').notEmpty().withMessage('password is required').isLength({min:8}).withMessage("password must be at least 8 characters long")
    .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
    .matches(/[0-9]/).withMessage('Password must contain at least one number')
    .matches(/[\W_]/).withMessage('Password must contain at least one special character'),

body('fee').optional().isNumeric().withMessage('Fee must be a number'),
body('aos').optional().isString().withMessage('aos must be a string'),

body('dob').optional().isISO8601().withMessage('Date of birth must be a valid date'),
];

export const validateLogin = [
    body("email").isEmail().withMessage("must be a valid email").notEmpty().withMessage("email is required"),
    body('password').notEmpty().withMessage('password is required').isLength({min:8}).withMessage("password must be at least 8 characters long")
    .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
    .matches(/[0-9]/).withMessage('Password must contain at least one number')
    .matches(/[\W_]/).withMessage('Password must contain at least one special character')
];


export const validateForgot = [
    body("email").isEmail().withMessage("must be a valid email").notEmpty().withMessage("email is required"),
   
];

export const validateToken = [
    body('token').notEmpty().withMessage('Token is required').isString().withMessage('Token must be a string')
];


export const validateReset = [
    body("email").isEmail().withMessage("must be a valid email").notEmpty().withMessage("email is required"),
    body('password').notEmpty().withMessage('password is required').isLength({min:8}).withMessage("password must be at least 8 characters long")
    .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
    .matches(/[0-9]/).withMessage('Password must contain at least one number')
    .matches(/[\W_]/).withMessage('Password must contain at least one special character'),
    body('token').notEmpty().withMessage('Token is required').isString().withMessage('Token must be a string')
];


