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


//schedule an appointment

//get all billing encounters
export async function getAllTransactions(req: Request<{}, {}>, res: Response) {

    
    try {
      const transactions = await TransactionModel.find({});
  
      return res.status(200).json({
        status: "success",
        transactions: transactions,
      });
    } catch (error: any) {
      console.error(error);
    }
  }


//get transaction by type_uuid

export async function getTransactionByUuid(req:Request<{type_uuid:string}>, res:Response){


    const type_uuid :string = req.params.type_uuid;



    try {

        // check if oofice with such uuid exists;

        const check = await TransactionModel.findOne({type_uuid});

        if(!check){
            return res.status(404).json({
                status:"failed",
                error:"transaction not found",
            });


        }

        else{
            

            return res.status(200).json({
                status:"success",
                transaction : check
            });
        }

       
        
    } catch (error) {
        return res.status(200).json({
            status:"failed",
            message: 'Server Error', error,
        });
    }
}



//get transaction by patient upi

export async function getTransactionByPatientUpi(req:Request<{upi:string}>, res:Response){


    const upi :string = req.params.upi;



    try {

        // check if oofice with such uuid exists;

        const patient = await patientModel.findOne({upi});

        if(!patient){
            return res.status(404).json({
                status:"failed",
                message: 'patient not found',
            });
        }

        const check = await TransactionModel.find({patientUPI : upi});

       
            

            return res.status(200).json({
                status:"success",
                transactions : check
            });
        

       
        
    } catch (error) {
        return res.status(500).json({
            status:"failed",
            message: 'Server Error', error,
        });
    }
}