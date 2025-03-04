import { body, validationResult } from 'express-validator';
import { Response, Request, NextFunction } from "express";




export const validateSponsor = [
   
    body('name').isString().withMessage('Contact person must be string').notEmpty().withMessage('Name is required'),
    body('contact_email').optional().isEmail().withMessage('Email is invalid'),
    body('contact_person').optional().isString().withMessage('Contact person must be string'),
    body('phone').optional().isMobilePhone('any').withMessage('Phone number is invalid'),
    body('type').notEmpty().withMessage('Type is required'),
  
   
];