import { Response, Request, NextFunction } from "express";
import mongoose, { Types } from "mongoose";
import { PatientInterface } from "../interfaces/patientInterface";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

import officeModel from "../models/officeModel";
import nodemailer from "nodemailer";

import userModel from "../models/userModels";
import patientModel from "../models/patientModel";
import encounterModel from "../models/encounterModel";
import { IEncounter } from "../interfaces/encounterInterface";
import appointmentModel from "../models/appointmentModel";


//schedule an appointment
export async function addEncounter(
  req: Request<{}, {}, IEncounter>,
  res: Response
) {


  const {
    payment_policy,
    patient,
    consultant,
    isUrgent,
    comment,
    status,
    vitals,
    allergies,
    symptoms,
    family_history,
    social_history,
    diagnosis,
    investigations,
    imaging,
    otherservices,
    appointment_uuid
  
    
  } = req.body;

  try {
  
    const patientExists = await patientModel.findById(patient);

    if (!patientExists) {
        return res.status(404).json({
            status: "failed",
            error: "Patient not found",
        });
    }

    // check if appointment exists

    const appointmentExists = await appointmentModel.findOne({uuid:appointment_uuid});

    if (!appointmentExists) {
        return res.status(404).json({
            status: "failed",
            error: "appointment not found",
        });
    }



    const request_date = new Date();


    const uuid: string = Math.random()
      .toString(16)
      .substring(2, 10)
      .toUpperCase();

    const newEncounter = new encounterModel({
   
      uuid,
      request_date,

      payment_policy,
      patient,
      consultant,
      isUrgent,
      comment,
      status,
      vitals,
      allergies,
      symptoms,
      family_history,
      social_history,
      diagnosis,
      investigations,
      imaging,
      otherservices,
      appointment_uuid,
    });

    await newEncounter.save();

    //send notification to user

    await appointmentModel.updateOne(
      { uuid: appointment_uuid },
      { $set: { status: "consulted" } }
    );

    return res.status(200).json({
      status: "success",
      message: "Encounter saved successfully",
    });
  } catch (error) {
    console.error(error);
  }
}


//fetch all encounter

//fetch all sponsor
export async function fetchAllEncounter(req: Request<{}, {}>, res: Response) {

    try {
      const encounter = await encounterModel.find({});

      return res.status(200).json({
        status: "success",
        encounters: encounter,
      });
    } catch (error: any) {
      console.error(error);
    }
  }


  //fetch unique encounter

  export async function fetchUniqueEncounter(

    req: Request<{ uuid: string }, {}>,
    res: Response
    ) {
    const uuid = req.params.uuid;
    
    try {
        const existed = await encounterModel.findOne({ uuid });
    
        if (!existed) {
        return res.status(400).json({
            status: "failed",
            error: "Encounter does not exists",
        });
        }
  
       
  
        return res.status(200).json({
          status: "success",
          encounter: existed,
        });
    
       
    } catch (error: any) {
        console.error(error);
    }
    }
  

    //fetch encounters by patient id


    export async function fetchEncountersByPatientId(
        req: Request<{ id: string }>,
        res: Response,
        next: NextFunction
      ) {
        const { id } = req.params;

         // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      status: "failed",
      error: "Invalid patient ID format",
    });
  }

      
        try {
          // Check if patient exists
          const patientExists = await patientModel.findById(id);
      
          if (!patientExists) {
            return res.status(404).json({
              status: "failed",
              error: "Patient does not exist",
            });
          }
      
          // Fetch encounters for the patient
          const encounters = await encounterModel.find({ patient: id });
      
          if (encounters.length === 0) {
            return res.status(404).json({
              status: "failed",
              error: "No encounters found for this patient",
            });
          }
      
          // Return encounters
          return res.status(200).json({
            status: "success",
            encounters,
          });
      
        } catch (error) {
          console.error(error);
          return res.status(500).json({
            status: "error",
            message: "An unexpected error occurred",
          });
        }
      }


      //fetch encounter by billing status



  export async function fetchEncountersByBillingStatus(

    // req: Request<{ status: string }, {}>,
    req: Request<{ status: string }, {}, {}, { consultant?: string }>,
    res: Response
    ) {
    const status = req.params.status;
    const consultant = req.query.consultant;

    const allowedStatus = ["awaiting billing", "billed", "invoiced"];


    if (!allowedStatus.includes(status)) {
        return res.status(400).json({
            status: "failed",
            error: "Status can only be 'awaiting billing', 'billed', or 'invoiced'",
        });
    }
    
    try {

      const filter: any = { status };

      if (consultant) {
          filter.consultant = consultant; // Add consultant filter if provided
      }


        const existed = await encounterModel.find(filter).populate("patient");
    
      
  
        return res.status(200).json({
          status: "success",
          encounters: existed,
        });
    
       
    } catch (error: any) {
        console.error(error);
    }
    }
  


    //fetch unique encounter by appointment_uuid

  export async function fetchEncounterByAppointmentUuid(

    req: Request<{ appointment_uuid: string }, {}>,
    res: Response
    ) {
    const appointment_uuid = req.params.appointment_uuid;
    
    try {
        const existed = await encounterModel.findOne({ appointment_uuid }).populate("patient");
    
        if (!existed) {
        return res.status(404).json({
            status: "failed",
            error: "Encounter not found",
        });
        }
  
       
  
        return res.status(200).json({
          status: "success",
          encounter: existed,
        });
    
       
    } catch (error: any) {
        console.error(error);
    }
    }
  


    //updated enconunter / consultation by appointment_uuid

    export async function updateConsultationEncounter(
      req: Request<{appointment_uuid: string }, {}, IEncounter>,
      res: Response
    ) {


        // validate input

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({
            "status":"failed",
            "error":errors.array(),
        });
    }

    
      const {
    
        comment,
    
        vitals,
        allergies,
        symptoms,
        family_history,
        social_history,
        diagnosis,
        investigations,
        imaging,
        otherservices,
        appointment_uuid
      
        
      } = req.body;
    
      try {
      

        const appointment_uuid = req.params.appointment_uuid;

        const existed = await encounterModel.findOne({ appointment_uuid });
    
        if (!existed) {
        return res.status(404).json({
            status: "failed",
            error: "Encounter not found",
        });
        }
    

       
       
       

        await encounterModel.updateOne(
          { appointment_uuid },
          {
            $set: {
              
            
          
              // comment,
        
              vitals,
              allergies,
              symptoms,
              family_history,
              social_history,
              diagnosis,
              investigations,
              imaging,
              otherservices,
          
             
            },
          }
        );
    
        //send notification to user
    
    
        return res.status(200).json({
          status: "success",
          message: "Encounter update successfully",
        });
      } catch (error) {
        console.error(error);
      }
    }