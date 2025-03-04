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
import { BillingInterface } from "../interfaces/billingInterface";
import { ITransaction } from "../interfaces/transactionInterface";
import patientModel from "../models/patientModel";
import encounterModel from "../models/encounterModel";
import moment from "moment";


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
      return res.status(404).json({
        status: "failed",
        error: "office not found",
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




  export async function createEncounterTransaction(
    req: Request<{}, {}, ITransaction>,
    res: Response
  ) {
    // validate input

    

     // validate input

     const errors = validationResult(req);

     if(!errors.isEmpty()){
         return res.status(400).json({
             "status":"failed",
             "error":errors.array(),
         });
     }

    const {
      patientUPI,
      type_uuid,
      date,
      totalAmount,
      paymentStatus,
      paymentMethod,
      paymentReference,
      services,
      createdBy,
      updatedBy,
      createdAt,
      updatedAt,
      sponsor,
      sponsor_plan,
      type
    } = req.body;





    try {

        // Fetch encounter by UUID
    const encounter = await encounterModel.findOne({ uuid: type_uuid });
    if (!encounter) {
      return res.status(404).json({
        status: "failed",
        error: "Encounter not found",
      });
    }

      // const newTransaction: ITransaction = {
      //   patientId,
      //   encounterUuid,
      //   date,
      //   totalAmount,
      //   paymentStatus,
      //   paymentMethod,
      //   paymentReference,
      //   services,
      //   createdBy,
      //   updatedBy,
      //   createdAt,
      //   updatedAt,
      //   sponsor,
      //   sponsor_plan
      // };


      const userExist = await patientModel.findOne({upi : patientUPI});

      if(!userExist){
        return res.status(404).json({
          status: "failed",
          error: "patient not found",
        });
      }



      const newTransaction = new TransactionModel({
        patientUPI,
        type_uuid,
        date: date || new Date(),
        totalAmount,
        paymentStatus,
        paymentMethod,
        paymentReference,
        services,
        billingOfficer: createdBy,
        updatedBy,
        sponsor,
        sponsor_plan,
        createdAt: new Date(),
        updatedAt: new Date(),
        month: moment().format("MMMM"), // Current month
        year: moment().format("YYYY"), // Current year
        type:"encounter"
      });
  
      await newTransaction.save();

      //update encounter status for investigation, imaging and otherservices to billed

      // Function to update billing status for matching service IDs
    const updateBillingStatus = (encounterServices: any[], transactionServices: any[]) => {
      return encounterServices.map((service) => {
        const matchedService = transactionServices.find(
          (tService) => tService._id.toString() === service._id.toString()
      
        );
        return matchedService ? { ...service, billing_status: "billed" } : service;
      });
    };

        // Update only the services with matching IDs

        if (services && services.investigations) {
          encounter.investigations = encounter.investigations ? updateBillingStatus(encounter.investigations, services.investigations) : [];
        }

        if(services && services.imaging){
          encounter.imaging = encounter.imaging ? updateBillingStatus(encounter.imaging, services.imaging) : [];
        }

        if(services && services.otherservices){
          encounter.otherservices = encounter.otherservices ? updateBillingStatus(encounter.otherservices, services.otherservices) : [];
        }
       
       
       
    
        // Set overall encounter billing status
        encounter.status = "billed";
        encounter.billing_officer = createdBy;
    
        await encounter.save();
    

      return res.status(200).json({
        status: "success",
        message: "Transaction created successfully",
        
      });
    } catch (error:any) {
      console.error(error);
    }
   
  
  
  }