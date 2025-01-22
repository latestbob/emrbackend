import { Response, Request } from "express";
import { Types } from "mongoose";
import { PatientInterface } from "../interfaces/patientInterface";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

import officeModel from "../models/officeModel";
import nodemailer from "nodemailer";


import userModel from "../models/userModels";

import drugenericModel from "../models/drugGenericModel";


interface IGeneric extends Document {
    generic_id:string,
    generic: string;
   

}

//schedule an appointment
export async function addDrugGenericName(
  req: Request<{}, {}, IGeneric>,
  res: Response
) {
  // validate input

 


  const {
    generic_id,
    generic
   
  } = req.body;
  try {
    

    

    if (!generic_id || !generic) {
        return res.status(400).json({
            status: "failed",
            error: "Generic Id and Generic name are required",
        });
    }


    const existed = await drugenericModel.findOne({ generic_id });

    // check if diagnosis already exists

    if (existed) {
      return res.status(400).json({
        status: "failed",
        error: "Generic name already exists",
      });
    }


    const newDrugeneric = new drugenericModel({
        generic_id,
        generic

    });

    await newDrugeneric.save();
  

    //send notification to user

    return res.status(200).json({
      status: "success",
      message: "Drug Generic Name Added successfully",
    });
  } catch (error) {
    console.error(error);
  }
}



//fetch all drug generic names
export async function fetchDrugGenericName(req: Request<{}, {}>, res: Response) {

    
    try {
      const generic = await drugenericModel.find({});
  
      return res.status(200).json({
        status: "success",
        generic: generic,
      });
    } catch (error: any) {
      console.error(error);
    }
  }


