import { body, validationResult } from 'express-validator';
import { Response, Request, NextFunction } from "express";




export const validateEncounter = [


body('payment_policy').isIn(['cash', 'claims']).withMessage('Payment policy must be either cash or claims'),
 
    body('patient').isMongoId().withMessage('Patient must be an object'),
    
 
    body('consultant').isString().withMessage('Consultant must be a string'),
    body('isUrgent').isBoolean().withMessage('IsUrgent must be a boolean'),
    body('comment').optional().isString().withMessage('Comment must be a string'),
    body('status').optional().isString().withMessage('Status must be a string'),
    body('vitals').isObject().withMessage('Vitals must be an object'),
    body('allergies').isObject().withMessage('Allergies must be an object'),
    body('symptoms').optional().isArray().withMessage('Symptoms must be an array'),
    body('family_history').optional().isArray().withMessage('Family history must be an array'),
    body('social_history').optional().isArray().withMessage('Social history must be an array'),
    body('diagnosis').optional().isArray().withMessage('Diagnosis must be an array'),
    body('investigations').optional().isArray().withMessage('Investigations must be an array'),
    body('imaging').optional().isArray().withMessage('Imaging must be an array'),
    body('otherservices').optional().isArray().withMessage('Other services must be an array'),



    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }



   
];