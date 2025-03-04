import { body, validationResult } from 'express-validator';





export const validateTransaction = [

    
    body('patientUPI').isString().notEmpty(),
    body('encounterUuid').optional().isString(),
    body('date').isISO8601().toDate(),
    body('totalAmount').isNumeric(),
    body('paymentStatus').isIn(['pending', 'paid', 'failed']),
    body('paymentMethod').isIn(['cash', 'card', 'claims']),
    body('paymentReference').optional().isString(),
    body('services.investigations').optional().isArray(),
    body('services.investigations.*._id').isString().notEmpty(),
    body('services.investigations.*.name').isString().notEmpty(),
    body('services.investigations.*.amount').isNumeric(),
    body('services.investigations.*.billingStatus').isIn(['pending', 'invoiced', 'billed']),
    body('services.imaging').optional().isArray(),
    body('services.imaging.*._id').isString().notEmpty(),
    body('services.imaging.*.name').isString().notEmpty(),
    body('services.imaging.*.amount').isNumeric(),
    body('services.imaging.*.billingStatus').isIn(['pending', 'invoiced', 'billed']),
    body('services.otherservices').optional().isArray(),
    body('services.otherservices.*._id').isString().notEmpty(),
    body('services.otherservices.*.name').isString().notEmpty(),
    body('services.otherservices.*.amount').isNumeric(),
    body('services.otherservices.*.billingStatus').isIn(['pending', 'invoiced', 'billed']),
    body('createdBy').isString().notEmpty(),
    body('updatedBy').optional().isString(),
    body('createdAt').isISO8601().toDate(),
    body('updatedAt').optional().isISO8601().toDate(),
    body('sponsor').isString().notEmpty(),
    body('sponsor_plan').isString().notEmpty(),
];