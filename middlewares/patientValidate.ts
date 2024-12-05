import { body, validationResult } from 'express-validator';





export const validatePatientRegiseter = [
    body('title').isString().withMessage("title must be a string").notEmpty().withMessage("title is required"),
    body('firstname').isString().withMessage("firstname must be a string").notEmpty().withMessage("Firstname is required"),
    body('lastname').isString().withMessage("lastname must be a string").notEmpty().withMessage("Last name is required"),
    body('email').isEmail().withMessage("email must be a valid email").notEmpty().withMessage("Email is required"),
    body('phone').isString().withMessage('Phone must be a string')
    .notEmpty().withMessage("Phone number is required")
    .isLength({min:10 , max:15}).withMessage("Phone number must be between 10 and 15 characters long")
    .matches(/^(?:\+?234|0)?[1-9]\d{9,14}$/).withMessage('Phone number must be a valid international phone number'),

    body('office').isString().withMessage("office must be a string").notEmpty().withMessage("Office is required"),
    body('gender').isString().withMessage("gender must be a string").notEmpty().withMessage("Gender is required"),    body('uuid').optional().isString().withMessage("uuid must be a string"),
    body('dob').isString().withMessage("DOB must be a string").withMessage("DOB is required"),
    body('position').optional().isString().withMessage("position must be a string"),
   
];