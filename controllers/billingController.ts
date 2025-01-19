import { Response, Request } from "express";
import { Types } from "mongoose";
import { PatientInterface } from "../interfaces/patientInterface";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

import officeModel from "../models/officeModel";
import nodemailer from "nodemailer";


import userModel from "../models/userModels";

import billingModel from "../models/billingModel";
import { BillingInterface } from "../interfaces/billingInterface";

//schedule an appointment
export async function createBill(
  req: Request<{}, {}, BillingInterface>,
  res: Response
) {
  // validate input

 


  const {
    patientUPI,
    encounterId,
    dateOfService,
    placeOfService,
    amount,
    currency,
    provider,
    billing_officer,
    billing_service,
    sponsor,
    sponsor_plan,
    status,
   
  } = req.body;
  try {
    // const existedUser = await appointmentModel.findOne({ email });

    // if (existedUser) {
    //   return res.status(400).json({
    //     status: "failed",
    //     error: "patient with email already exists",
    //   });
    // }

    const existedOffice = await officeModel.find({ uuid: provider.office_uuid });

    // check if office doesn't exist

    if (!existedOffice) {
      return res.status(400).json({
        status: "failed",
        error: "office does not exists",
      });
    }

  

    const uuid: string = Math.random()
      .toString(16)
      .substring(2, 10)
      .toUpperCase();



      
  

    

    const newBilling = new billingModel({
        patientUPI,
        encounterId,
        dateOfService,
        placeOfService,
        amount,
        currency,
        provider,
        billing_officer,
        billing_service,
        sponsor,
        sponsor_plan,
        status,
    });

    await newBilling.save();

    //send notification to user

    return res.status(200).json({
      status: "success",
      message: "Billing Created successfully",
    });
  } catch (error) {
    console.error(error);
  }
}



//get all billing encounters
export async function getAllBillingEncounters(req: Request<{}, {}>, res: Response) {

    
    try {
      const billingEncounters = await billingModel.find({});
  
      return res.status(200).json({
        status: "success",
        billing: billingEncounters,
      });
    } catch (error: any) {
      console.error(error);
    }
  }


