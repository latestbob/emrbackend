import { body, validationResult } from 'express-validator';




export const validateRole = [
    body('name').isString().withMessage("Role name must be string").notEmpty().withMessage("Role name is required"),
    body('office_uuid').isString().withMessage("office_uuid must be string").notEmpty().withMessage("office_uuid is required"),
    
    
];

// export const updateMiddleware = [
//     body('branch').optional().isString().withMessage("Department branch must be a string"),
//     body('isActive').optional().isBoolean().withMessage("isActive must be either true or false")
// ];