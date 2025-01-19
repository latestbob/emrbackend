import { Response, Request } from "express";
import { Types } from "mongoose";
import { PatientInterface } from "../interfaces/patientInterface";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

import appointmentModel from "../models/appointmentModel";
import officeModel from "../models/officeModel";
import nodemailer from "nodemailer";

import { AppointmentInterface } from "../interfaces/appointInterface";

import userModel from "../models/userModels";
import { UserInterface } from "../interfaces/userInterface";
import billingModel from "../models/billingModel";

//schedule an appointment
export async function scheduleAppointment(
  req: Request<{}, {}, AppointmentInterface>,
  res: Response
) {
  // validate input

 


  const {
    firstname,
    lastname,
    upi,
    email,
    sponsor,
    sponsor_plan,
    office,
    office_uuid,
    
    purpose,
    visit_type,
   
    visit_date,
    scheduled_time,
    is_urgent,
    comment,
  
    vital_weight,
    vital_height,
    vital_blood_pressure,
    vital_temperature,
    vital_pulserate,
    is_billed,
    consultant,
    biller
    
   
  } = req.body;
  try {
   

    const existedOffice = await officeModel.find({ uuid: office_uuid });

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


      const consultantInfo = await userModel.findOne({uuid:consultant});

      
  

    

    const newAppointment = new appointmentModel({
        firstname,
        lastname,
        upi,
        email,
        sponsor,
        sponsor_plan,
        office,
        office_uuid,
        
      
        visit_type,
       
        visit_date,
        scheduled_time,
        is_urgent,
        comment,
      uuid,
        vital_weight,
        vital_height,
        vital_blood_pressure,
        vital_temperature,
        vital_pulserate,
        is_billed,
        purpose,
        consultant:consultantInfo?.firstname + " " + consultantInfo?.lastname,
        consultant_uuid:consultant,
    });

    await newAppointment.save();


    if(is_billed){
      const newBilling =  new billingModel({
        patientUPI: upi,
            encounterId: uuid,
            dateOfService: visit_date,
            placeOfService: office,
            amount: consultantInfo?.fee, 
            currency: "NGN", 
            provider: {
              office_uuid,
              office: office, 
            },
            billing_officer: biller, // Assuming a default billing officer
            billing_service: "Consultation", // Assuming a default billing service
            sponsor,
            sponsor_plan,
            status: "pending", // Assuming default status
      
          });
        
          await newBilling.save();
    }

    

    

    //send notification to user

    return res.status(200).json({
      status: "success",
      message: "Appointment scheduled successfully",
    });
  } catch (error) {
    console.error(error);
  }
}



//get all registered appointments

export async function getAppointments(req: Request<{}, {}>, res: Response) {
    try {
      const appointment = await appointmentModel.find({});
  
      return res.status(200).json({
        status: "success",
        appointments: appointment,
      });
    } catch (error: any) {
      console.error(error);
    }
  }
  

  //get unique patient by upi

export async function getUniqueAppointment(
    req: Request<{ uuid: string }, {}>,
    res: Response
  ) {
    const uuid = req.params.uuid;
  
    try {
      //
  
      const existed = await appointmentModel.findOne({ uuid });
  
      if (!existed) {
        return res.status(400).json({
          status: "failed",
          message: "Appointment not found",
        });
      }
  
      return res.status(200).json({
        status: "success",
        appointment: existed,
      });
    } catch (error: any) {
      console.error(error);
    }
  }


  export async function getUniquePatientAppointment(
    req: Request<{ upi: string }, {}>,
    res: Response
  ) {
    const upi = req.params.upi;
  
    try {
      //
  
      const existed = await appointmentModel.find({ upi: upi });
  
      if (!existed) {
        return res.status(400).json({
          status: "failed",
          message: "Appointment not found",
        });
      }
  
      return res.status(200).json({
        status: "success",
        appointments: existed,
      });
    } catch (error: any) {
      console.error(error);
    }
  }
  
  

  //update unique appointment details

export async function updateUniqueAppointent(
  req: Request<{uuid:string}, {}, AppointmentInterface>,
  res: Response
) {

 const uuid = req.params.uuid;

  const {
   
    sponsor,
    sponsor_plan,
 
    purpose,
    visit_type,
    consultant,
    visit_date,
    scheduled_time,
    is_urgent,
    comment,
  
    vital_weight,
    vital_height,
    vital_blood_pressure,
    vital_temperature,
    vital_pulserate,
    is_billed,
  } = req.body;

  try {
    const appointment = await appointmentModel.findOne({ uuid });

    if (!appointment) {
      return res.status(400).json({
        status: "failed",
        error: "Appointment not scheduled",
      });
    }


    const consultantInfo = await userModel.findOne({uuid:consultant});
    const consultantDetails = consultantInfo?.firstname + " " + consultantInfo?.lastname;


    const updatedFields = {
        ...req.body, // Spread all fields from req.body
           // Add the computed fullname
           consultant:consultantDetails
      };
  
    const updatedAppointment = await appointmentModel.findOneAndUpdate(
      { uuid },
      { $set: updatedFields },
      { new: true, runValidators: true } // new: return the updated user; runValidators: enforce schema validation
    );

    return res.status(200).json({
      status: "success",
      message: "Appointment updated successfully",
      appointment: updatedAppointment,
    });
  } catch (error) {
    console.error(error);
  }
}
