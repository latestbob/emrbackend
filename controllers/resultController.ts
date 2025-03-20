import { Response, Request } from "express";
import mongoose, { Types } from "mongoose";
import { PatientInterface } from "../interfaces/patientInterface";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

import officeModel from "../models/officeModel";
import nodemailer from "nodemailer";


import userModel from "../models/userModels";

import billingModel from "../models/billingModel";
import TransactionModel from "../models/transactionModel"; // Add this line

import { ITransaction } from "../interfaces/transactionInterface";
import patientModel from "../models/patientModel";
import encounterModel from "../models/encounterModel";
import { IAddResult } from "../interfaces/resultInterface";
import resultModel from "../models/resultModel";


//add result


export async function addResult(
    req: Request<{}, {}, IAddResult>,
    res: Response
  ) {
    // validate input

    const errors = validationResult(req);


   if(!errors.isEmpty()){
        return res.status(400).json({
            status:"failed",
            error: errors.array(),
        });
   }

// 

    const { encounterUuid, userType, testType, testDetails, results, uploadedBy } = req.body;
   
    
    try {


        //check if encounter exist

        const encounter = await encounterModel.findOne({uuid:encounterUuid});
        
        if(!encounter){
            return res.status(404).json({
                status: "failed",
                error: "Encounter not found",
              });
        }

      // Check if a result with the same encounterUuid and testName already exists
    const existingResult = await resultModel.findOne({
        encounterUuid,
        "testDetails.testName": testDetails.testName,
      });
  
      if (existingResult) {
        return res.status(400).json({
          message: "A result with this encounterUuid and testName already exists.",
        });
      }
  
        //check if test type

        if(testType == "Pathology Investigations" && userType == "Radiologist"){
            return res.status(400).json({
                status: "failed",
                error: "Radiologist cannot add Pathology Investigations result",
              });
        }

        if(testType == "Imaging Investigations" && userType == "Lab Technician"){
            return res.status(400).json({
                status: "failed",
                error: "Lab Technician cannot add Imaging Investigation result",
              });
        }



      
    
  const status = "completed";
      const newResult = new resultModel({
       encounterUuid, userType, testType, testDetails, status, results, uploadedBy
      });
  
      await newResult.save();

      //update

     // 🔹 Update the corresponding investigation or imaging in the encounter
    if (testType === "Pathology Investigations" && encounter.investigations) {
        const investigation = encounter.investigations.find(
          (inv) => inv.name === testDetails.testName
        );
  
        if (investigation) {
          investigation.has_result = "confirmed";
          await encounter.save();
        }
      }
  
      if (testType === "Imaging Investigations" && encounter.imaging) {
        const imaging = encounter.imaging.find(
          (img) => img.name === testDetails.testName
        );
  
        if (imaging) {
          imaging.has_result = "confirmed";
          await encounter.save();
        }
      }
  
      
  
      //send notification to user
  
      return res.status(200).json({
        status: "success",
        message: "added Added successfully",
      });
    } catch (error) {
      console.error(error);
    }
  }


// get all result associated with an encounter

export async function getEncounterResult(

  req: Request<{ uuid: string }, {}, IAddResult>,
  res: Response
  ) {
  const uuid = req.params.uuid;
  
  try {

    const encounter = await encounterModel.findOne({uuid});

    if(!encounter){
        return res.status(404).json({
            status: "failed",
            error: "Encounter not found",
          });
    }



      const results = await resultModel.find({encounterUuid:uuid});
  
     
  
      return res.status(200).json({
        status: "success",
        results:results,
      });
  } catch (error: any) {
      console.error(error);
  }
  }

  //get unique result

  export async function getUniqueResult(

    req: Request<{ id: string }, {}, IAddResult>,
    res: Response
    ) {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            status: "failed",
            error: "Invalid id format",
          });
      }
    
    try {
  
      
  
  
        const result = await resultModel.findById(id);

        if(!result){
            return res.status(404).json({
                status: "failed",
                error: "result not found",
              });
        }
    
       
    
        return res.status(200).json({
          status: "success",
          result:result,
        });
    } catch (error: any) {
        console.error(error);
    }
    }



    //edit  unique result

    export async function editUniqueResult(

      req: Request<{ id: string }, {}, IAddResult>,
      res: Response
      ) {


      const id = req.params.id;

  const errors = validationResult(req);


   if(!errors.isEmpty()){
        return res.status(400).json({
            status:"failed",
            error: errors.array(),
        });
   }

      


      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            status: "failed",
            error: "Invalid id format",
          });
      }
      const { testType, userType, testDetails, results, uploadedBy } = req.body;
      
      try {

        
        
        const result = await resultModel.findById(id);

        if(!result){
            return res.status(404).json({
                status: "failed",
                error: "result not found",
              });
        }

         //check if test type

         if(testType != result.testType){
                 return res.status(400).json({
              status: "failed",
              error: `${testType} is not associated with this result`,
            });
         }

         if(userType != result.userType){
          return res.status(400).json({
       status: "failed",
       error: `${userType} is not associated with this result`,
     });
  }

  if(testDetails.testName != result.testDetails.testName){
    return res.status(400).json({
 status: "failed",
 error: `${testDetails.testName} is not associated with this result`,
});
}

     
      
          //await resultModel.findOneAndUpdate({ uuid }, req.body);
          await resultModel.findByIdAndUpdate(id, req.body);
      
          return res.status(200).json({
          status: "success",
          message: "result Updated successfully",
          });
      } catch (error: any) {
          console.error(error);
      }
      }
  
  
  