import { body, validationResult } from 'express-validator';





export const validateRegiseter = [
    body('firstname').isString().withMessage("firstname must be a string").notEmpty().withMessage("Firstname is required"),
    body('lastname').isString().withMessage("lastname must be a string").notEmpty().withMessage("Last name is required"),
    body('email').isEmail().withMessage("email must be a valid email").notEmpty().withMessage("Email is required"),
    body('phone').isString().withMessage('Phone must be a string')
    .notEmpty().withMessage("Phone number is required")
    .isLength({min:10 , max:15}).withMessage("Phone number must be between 10 and 15 characters long")
    .matches(/^(?:\+?234|0)?[1-9]\d{9,14}$/).withMessage('Phone number must be a valid international phone number'),

    body('office').isString().withMessage("office must be a string").notEmpty().withMessage("Office is required"),
    body('gender').isString().withMessage("gender must be a string").notEmpty().withMessage("Gender is required"),    body('uuid').optional().isString().withMessage("uuid must be a string"),
    body('role').isString().withMessage("role must be a string").withMessage("Role is required"),
    body('department').optional().isString().withMessage("department must be a string"),
    body('position').optional().isString().withMessage("position must be a string"),
    body('password').notEmpty().withMessage('password is required').isLength({min:8}).withMessage("password must be at least 8 characters long")
    .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
    .matches(/[0-9]/).withMessage('Password must contain at least one number')
    .matches(/[\W_]/).withMessage('Password must contain at least one special character')
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


export const validateReset = [
    body("email").isEmail().withMessage("must be a valid email").notEmpty().withMessage("email is required"),
    body('password').notEmpty().withMessage('password is required').isLength({min:8}).withMessage("password must be at least 8 characters long")
    .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
    .matches(/[0-9]/).withMessage('Password must contain at least one number')
    .matches(/[\W_]/).withMessage('Password must contain at least one special character')
];


