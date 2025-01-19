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






  

  //get unique patient by upi

export async function getUniqueConsultation(
    req: Request<{ consultant_uuid: string }, {}>,
    res: Response
  ) {
    const consultant_uuid = req.params.consultant_uuid;
  
    try {
      //
  
      const existed = await appointmentModel.find({ consultant_uuid });
  
      if (!existed) {
        return res.status(400).json({
          status: "failed",
          message: "Appointments not found",
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

