import { body, validationResult } from 'express-validator';




export const validateResult = [
    body("encounterUuid").isString().notEmpty().withMessage("User type is required"),
    body("userType").isIn(["Lab Technician", "Radiologist"]).withMessage("userType should be either Lab Technician or Radiologist"),
  
  body("testType")
    .isIn(["Pathology Investigations", "Imaging Investigations"])
    .withMessage("Invalid test type"),
  
  body("testDetails.testName").isString().notEmpty().withMessage("Test name is required"),
  body("testDetails.sampleType").optional().isString(),
  
  body("results.resultFile").optional().isString(),
  body("results.notes").optional().isString(),
  
  body("uploadedBy").optional().isString(),
    
];

