import { Response, Request } from "express";
import { Types } from "mongoose";
import { PatientInterface } from "../interfaces/patientInterface";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

import officeModel from "../models/officeModel";
import nodemailer from "nodemailer";


import userModel from "../models/userModels";

import diagnosisModel from "../models/diagnosisModel";


interface IDiagnosis extends Document {
    code:string,
    name: string;
   

}

//schedule an appointment
export async function addDiagnosis(
  req: Request<{}, {}, IDiagnosis>,
  res: Response
) {
  // validate input

 


  const {
    code,
    name
   
  } = req.body;
  try {
    

    

    if (!code || !name) {
        return res.status(400).json({
            status: "failed",
            error: "Code and name are required",
        });
    }


    const existed = await diagnosisModel.findOne({ code });

    // check if diagnosis already exists

    if (existed) {
      return res.status(400).json({
        status: "failed",
        error: "Diagnosis already exists",
      });
    }


    const newDiagnosis = new diagnosisModel({
        code,
        name,
       
    });

    await newDiagnosis.save();
  

    //send notification to user

    return res.status(200).json({
      status: "success",
      message: "Diagnosis Added successfully",
    });
  } catch (error) {
    console.error(error);
  }
}



//get all DIAGNOSIS
export async function fetchAllDiagnosis(req: Request<{}, {}>, res: Response) {

    
    try {
      const diagnosis = await diagnosisModel.find({});
  
      return res.status(200).json({
        status: "success",
        diagnosis: diagnosis,
      });
    } catch (error: any) {
      console.error(error);
    }
  }


