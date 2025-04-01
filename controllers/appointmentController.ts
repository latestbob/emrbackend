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
import TransactionModel from "../models/transactionModel";

import moment from "moment";
import patientModel from "../models/patientModel";

//schedule an appointment
export async function scheduleAppointment(
  req: Request<{}, {}, AppointmentInterface>,
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
    biller,
    payment_policy,
    
   
  } = req.body;
  try {
   

    const existedOffice = await officeModel.find({ uuid: office_uuid });

    // check if office doesn't exist

    if (!existedOffice) {
      return res.status(404).json({
        status: "failed",
        error: "office does not exist",
      });
    }

    const existedConsultant = await userModel.findOne({uuid : consultant});

    if (!existedConsultant) {
      return res.status(404).json({
        status: "failed",
        error: "consultant not found",
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
        amount:consultantInfo?.fee || 0,
    });

    await newAppointment.save();


    // if(is_billed){
     

    //       const newTransaction = new TransactionModel({
    //         patientUPI: upi,
    //         type: "appointment",
    //         type_uuid: uuid,
    //         paymentMethod: payment_policy, // Assuming default payment method
    //         date: new Date(),
    //         billingOfficer: biller,
    //         totalAmount: consultantInfo?.fee || 0, // Assuming consultantInfo has a fee field
    //         paymentStatus: "paid",
    //         sponsor,
    //         sponsor_plan,
    //         createdAt: new Date(),
    //         month: moment().format("MMMM"),
    //         year: moment().format("YYYY"),


    //       });

    //       await newTransaction.save();
          
    //     }
    

    

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

// export async function getAppointments(req: Request<{}, {}>, res: Response) {
//     try {
//       const appointment = await appointmentModel.find({});
  
//       return res.status(200).json({
//         status: "success",
//         appointments: appointment,
//       });
//     } catch (error: any) {
//       console.error(error);
//     }
//   }
  


export async function getAppointments(req: Request<{}, {}>, res: Response) {
  try {

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 6;
    const skip = (page - 1) * limit;

    const appointment = await appointmentModel.find({}).sort({createdAt : -1 }).skip(skip).limit(limit);

    const totalAppointments = await appointmentModel.countDocuments({});
    const totalPages = Math.ceil(totalAppointments / limit);

    return res.status(200).json({
      status: "success",
      appointments: appointment,
      totalPages,
      currentPage: page,
    });


    // const appointment = await appointmentModel.find({});

   
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
        return res.status(404).json({
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
  
      const existed = await patientModel.findOne({ upi: upi });
  
      if (!existed) {
        return res.status(404).json({
          status: "failed",
          message: "user with upi not found",
        });
      }

      const appointments = await appointmentModel.find({ upi: upi });
  
      return res.status(200).json({
        status: "success",
        appointments: appointments,
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
          //  consultant:consultantDetails
           consultant:consultantInfo?.firstname + " " + consultantInfo?.lastname,
        consultant_uuid:consultant,
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


//cancel appointment

export async function cancelAppointment(req: Request<{uuid:string}, {}, {}>, res: Response) {

  const uuid = req.params.uuid;

  try {
    const appointment = await appointmentModel.findOne({ uuid });

    if (!appointment) {
      return res.status(404).json({
        status: "failed",
        error: "Appointment not found",
      });
    }

    appointment.status = "cancelled";
    await appointment.save();
   

    return res.status(200).json({
      status: "success",
      message: "Appointment cancelled successfully",
    });
  } catch (error:any) {
    console.error(error);
  }
}



// appointment billing
export async function billAppoinment(
  req: Request<{}, {}, AppointmentInterface>,
  res: Response
) {
  // validate input

 
    // validate input

    // const errors = validationResult(req);

    // if(!errors.isEmpty()){
    //     return res.status(400).json({
    //         "status":"failed",
    //         "error":errors.array(),
    //     });
    // }


  const {
   upi,
   uuid,
   amount,
   payment_policy,
   biller,
   sponsor,
   sponsor_plan
   
  } = req.body;
  try {
   




          const newTransaction = new TransactionModel({
            patientUPI: upi,
            type: "appointment",
            type_uuid: uuid,
            paymentMethod: payment_policy, // Assuming default payment method
            date: new Date(),
            billingOfficer: biller,
            totalAmount: amount || 0, // Assuming consultantInfo has a fee field
            paymentStatus: "paid",
            sponsor,
            sponsor_plan,
            createdAt: new Date(),
            month: moment().format("MMMM"),
            year: moment().format("YYYY"),


          });

          await newTransaction.save();
          
    

          const appointment = await appointmentModel.findOne({uuid});

          if(!appointment){
            return res.status(404).json({
              status: "failed",
              error: "appointment not found",
            });
          }
    
          appointment.is_billed = true;
          await appointment.save();

    

    //send notification to user

    return res.status(200).json({
      status: "success",
      message: "Appointment billed successfully",
    
    });
  } catch (error) {
    console.error(error);
  }
}

