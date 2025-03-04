import { body, validationResult } from 'express-validator';





export const validateAppointment = [

    body('firstname').isString().withMessage("firstname must be a string").notEmpty().withMessage("Firstname is required").matches(/^[A-Za-z]+$/).withMessage("firstname must contain only alphabets"),
    body('lastname').isString().withMessage("lastname must be a string").notEmpty().withMessage("Last name is required").matches(/^[A-Za-z]+$/).withMessage("lastname must contain only alphabets"),
    body('email').isEmail().withMessage("email must be a valid email").notEmpty().withMessage("Email is required"),
    
    body('upi').isString().withMessage("upi must be a string").notEmpty().withMessage("upi is required"),
    body('office').isString().withMessage("office must be a string").notEmpty().withMessage("Office is required"),
    body('office_uuid').isString().withMessage("office_uuid must be a string").notEmpty().withMessage("office_uuid is required"), 
    body('purpose').isString().withMessage("purpose must be a string").notEmpty().withMessage("purpose is required").matches(/^[A-Za-z\s]+$/).withMessage("purpose must contain only alphabets and spaces"),
   

body('vital_height').optional().isNumeric().withMessage("vital_height must be a number"),
body('vital_weight').optional().isNumeric().withMessage("vital_weight must be a number"),
body('vital_blood_pressure').optional().isNumeric().withMessage("vital_blood_pressure must be a number "),
body('vital_temperature').optional().isNumeric().withMessage("vital_temperature must be a number"),
body('vital_pulserate').optional().isNumeric().withMessage("vital_pulserate must be a number"),
body('is_billed').optional().isBoolean().withMessage("is_billed must be a boolean"),
    body('consultant').isString().withMessage("consultant must be a string").notEmpty().withMessage("consultant is required"),
    body('visit_type').isString().withMessage("visit_type must be a string").notEmpty().withMessage("visit_type is required"),
body('visit_date').notEmpty().withMessage("visit_date is required"),
   
    
    body('is_urgent').isBoolean().withMessage("is_urgent must be a boolean").notEmpty().withMessage("is_urgent is required"),
    body('sponsor').isString().withMessage("sponsor must be a string").notEmpty().withMessage("sponsor is required"),
    body('sponsor_plan').isString().withMessage("sponsor_plan must be a string").notEmpty().withMessage("sponsor_plan is required"),
    body('scheduled_time').matches(/^([01]\d|2[0-3]):([0-5]\d)|([1-9]|1[0-2]):([0-5]\d)\s?(?:[APap][Mm])$/).withMessage("scheduled_time must be in the format H:MM am/pm i.e 5:00 pm").notEmpty().withMessage("scheduled_time is required"),

    body('biller').isEmail().withMessage("biller must be a valid email").notEmpty().withMessage("biller is required"),
    body('is_billed').isBoolean().withMessage("is_billed must be a boolean").notEmpty().withMessage("is_billed is required"),

    body('payment_policy').isString().withMessage("payment_policy must be a string").notEmpty().withMessage("payment_policy is required").isIn(['cash', 'claims']).withMessage("payment_policy must be either 'cash' or 'claims'")

];