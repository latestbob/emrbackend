import { body, validationResult } from 'express-validator';





export const validatePatientRegiseter = [
    body('title').isString().withMessage("title must be a string").notEmpty().withMessage("title is required").matches(/^[A-Za-z]+$/).withMessage("title must contain only alphabets"),
    body('firstname').isString().withMessage("firstname must be a string").notEmpty().withMessage("Firstname is required").matches(/^[A-Za-z]+$/).withMessage("firstname must contain only alphabets"),
    body('lastname').isString().withMessage("lastname must be a string").notEmpty().withMessage("Last name is required").matches(/^[A-Za-z]+$/).withMessage("lastname must contain only alphabets"),
    body('email').isEmail().withMessage("email must be a valid email").notEmpty().withMessage("Email is required"),
    body('phone').isString().withMessage('Phone must be a string')
    .notEmpty().withMessage("Phone number is required")
    .isLength({min:10 , max:15}).withMessage("Phone number must be between 10 and 15 characters long")
    .matches(/^(?:\+?234|0)?[1-9]\d{9,14}$/).withMessage('Phone number must be a valid international phone number'),

    body('office').isString().withMessage("office must be a string").notEmpty().withMessage("office is required"),
    body('office_uuid').isString().withMessage("office_uuid must be a string").notEmpty().withMessage("office_uuid is required"),
    body('gender').isString().withMessage("gender must be a string").notEmpty().withMessage("Gender is required").isIn(["Male", "Female"]).withMessage("Gender must be either 'Male' or 'Female'"),    
    body('uuid').optional({ checkFalsy: true }).isString().withMessage("uuid must be a string"),
    // body('dob').isString().withMessage("DOB must be a string").withMessage("DOB is required"),
    body('dob').isISO8601().withMessage("DOB must be a valid date in the format YYYY-MM-DD").notEmpty().withMessage("dob is required"),
    body('position').optional({ checkFalsy: true }).isString().withMessage("position must be a string"),
   

    // optional fields

    body('middlename').optional({ checkFalsy: true }).isString().withMessage("string must be a string").matches(/^[A-Za-z]+$/).withMessage("middlename must contain only alphabets"),
    body('marital_status').optional({ checkFalsy: true }).isString().withMessage("marital_status must be a string").isIn(["Single", "Married", "Divorced", "Widowed", "Seperated", "Engaged", "Prefer Not to Say"]).withMessage("marital_status must be one of: Single, Married, Divorced, Widowed, Seperated, Engaged, Prefer Not to Say"),
    body('city').optional({ checkFalsy: true }).isString().withMessage("city must be a string").matches(/^[A-Za-z\s]+$/).withMessage("city must contain only alphabets and spaces"),
    body('state').optional({ checkFalsy: true }).isString().withMessage("state must be a string").matches(/^[A-Za-z\s]+$/).withMessage("state must contain only alphabets and spaces"),
    body('religion').optional({ checkFalsy: true }).isString().withMessage("religion must be a string").isIn(["Christianity", "Islam", "Traditional", "Others"]).withMessage("religion must be one of : Christianity, Islam, Traditional, Others"),
    body('occupation').optional({ checkFalsy: true }).isString().withMessage("occupation must be a string").matches(/^[A-Za-z\s]+$/).withMessage("occupation must contain only alphabets and spaces"),
    body('blood_group').optional({ checkFalsy: true }).isString().withMessage("blood_group must be a string").isIn(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]).withMessage("blood_group must be one of : A+, A-, B+, B-, AB+, AB-, O+, O-"),
    body('genotype').optional({ checkFalsy: true }).isString().withMessage("genotype must be a string").isIn(["AA", "AS", "SS", "AC", "SC"]).withMessage("genotype must be one of : AA, AS, SS, AC, SC"),
    body('next_of_kin').optional({ checkFalsy: true }).isString().withMessage("next_of_kin must be a string").matches(/^[A-Za-z\s]+$/).withMessage("next_of_kin must contain only alphabets and spaces"),
    body('next_of_kin_relationship').optional({ checkFalsy: true }).isString().withMessage("next_of_kin_relationship must be a string").isIn(["Spouse", "Parent", "Child", "Sibling", "Grandpartent", "Grandchild", "Aunt", "Uncle", "Cousin"]).withMessage("next_of_kin_relationship must be one of : Spouse, Parent, Child, Sibling, Grandparent, Grandchild, Aunt, Uncle, Cousin"),
];



