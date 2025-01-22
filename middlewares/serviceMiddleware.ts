import { body, validationResult } from 'express-validator';
import { Response, Request, NextFunction } from "express";




export const validateService = [
   
    body('type').isString().withMessage('Type must be a string'),
    body('name').isString().withMessage('Name must be a string'),
    body('price').isNumeric().withMessage('Price must be a number'),
    body('sponsor_uuid').isString().withMessage('Sponsor UUID must be a string'),
    body('plan_code').isString().withMessage('Plan code must be a string'),
  

    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
   
];