import { body, validationResult } from 'express-validator';
import { Response, Request, NextFunction } from "express";




export const validateSponsor = [
   
    body('name').notEmpty().withMessage('Name is required'),
    body('contact_email').optional().isEmail().withMessage('Email is invalid'),
    body('contact_person').optional().isString().withMessage('Contact person must be string'),
    body('phone').optional().isMobilePhone('any').withMessage('Phone number is invalid'),
    body('type').notEmpty().withMessage('Type is required'),
    (req:Request, res:Response, next:NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
   
];