import { body, validationResult } from 'express-validator';



export const validateChangePassword = [
    body("email").isEmail().withMessage("must be a valid email").notEmpty().withMessage("email is required"),
    body('password').notEmpty().withMessage('password is required').isLength({min:8}).withMessage("password must be at least 8 characters long")
    .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
    .matches(/[0-9]/).withMessage('Password must contain at least one number')
    .matches(/[\W_]/).withMessage('Password must contain at least one special character')
];
