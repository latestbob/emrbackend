import { Response, Request } from "express";
import { Types } from "mongoose";
import { PatientInterface } from "../interfaces/patientInterface";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

import officeModel from "../models/officeModel";
import nodemailer from "nodemailer";

import userModel from "../models/userModels";

import sponsorModel from "../models/sponsorMode";
import { error } from "console";
import sponsorplanModel from "../models/sponsorplanModel";



interface ISponsor extends Document {
  name: string;
  type: string;
  phone?: string;
  contact_email?: string;
  contact_person?: string;
  uuid: string;
  is_Active?: boolean;
}

interface ISponsorPlan extends Document {
    name:string;
    plan_code:string;
    sponsor_uuid:string;
    plan_id?:string;
    is_Active?:boolean;
   

}

//schedule an appointment
export async function addNewSponsor(
  req: Request<{}, {}, ISponsor>,
  res: Response
) {
  // validate input

  const { name, type, phone, contact_email, contact_person } = req.body;
  
  try {
    

    const existed = await sponsorModel.findOne({ name });

    // check if diagnosis already exists

    if (existed) {
      return res.status(400).json({
        status: "failed",
        error: "Sponsor already exists",
      });
    }

    const uuid: string = Math.random()
      .toString(16)
      .substring(2, 10)
      .toUpperCase();

    const newSponsor = new sponsorModel({
      name,
      type,
      phone,
      contact_email,
      contact_person,
      uuid,
    });

    await newSponsor.save();

    //send notification to user

    return res.status(200).json({
      status: "success",
      message: "Sponsor Added successfully",
    });
  } catch (error) {
    console.error(error);
  }
}

//fetch all sponsor
export async function fetchAllSponsor(req: Request<{}, {}>, res: Response) {

    try {
      const sponsor = await sponsorModel.find({});

      return res.status(200).json({
        status: "success",
        sponsors: sponsor,
      });
    } catch (error: any) {
      console.error(error);
    }
  }


  //get unique sponsor

    
export async function getUniqueSponsor(

  req: Request<{ uuid: string }, {}, ISponsor>,
  res: Response
  ) {
  const uuid = req.params.uuid;
  
  try {
      const existed = await sponsorModel.findOne({ uuid });
  
      if (!existed) {
      return res.status(400).json({
          status: "failed",
          error: "Sponsor does not exists",
      });
      }
  
      return res.status(200).json({
        status: "success",
        sponsor:existed,
      });
  } catch (error: any) {
      console.error(error);
  }
  }



  //update unique sponsor

  
export async function updateUniqueSponsor(

    req: Request<{ uuid: string }, {}, ISponsor>,
    res: Response
    ) {
    const uuid = req.params.uuid;
    
    try {
        const existed = await sponsorModel.findOne({ uuid });
    
        if (!existed) {
        return res.status(400).json({
            status: "failed",
            error: "Sponsor does not exists",
        });
        }
    
        await sponsorModel.findOneAndUpdate({ uuid }, req.body);
    
        return res.status(200).json({
        status: "success",
        message: "Sponsor Updated successfully",
        });
    } catch (error: any) {
        console.error(error);
    }
    }



    //delete unique sponsor

    export async function deleteUniqueSponsor(
        req: Request<{ uuid :string}, {}, ISponsor>, res: Response
    ){
        const uuid = req.params.uuid;

        try {

            const existed = await sponsorModel.findOne({uuid});

            if(!existed){
                return res.status(400).json({
                    status:"failed",
                    error:"Sponsor does not exists",
                })
            }

            await sponsorModel.findOneAndDelete({uuid});

            return res.status(200).json({
                status:"success",
                message:"Sponsor deleted successfully",
            });
            
        } catch (error) {
            
            console.error(error);

        }
    }


//create sponsor plan

export async function createSponsorPlan(
    req: Request<{uuid :string}, {}, ISponsorPlan>,
    res: Response
  ) {
    // validate input

    const { name } = req.body;
    const uuid = req.params.uuid;
    
    try {

        const sponsor = await sponsorModel.findOne({ uuid });

        if (!sponsor) {
            return res.status(400).json({
              status: "failed",
              error: "Sponsor does not exist",
            });
          }
      
  
      const existed = await sponsorplanModel.findOne({ name });
  
      // check if diagnosis already exists
  
      if (existed) {
        return res.status(400).json({
          status: "failed",
          error: "Sponsor plan already exists",
        });
      }
  
      const newSponsorPlan = new sponsorplanModel({
        name,
        sponsor_uuid: uuid,
        plan_code: Math.random()
          .toString(16)
          .substring(2, 10)
          .toUpperCase(),
      });
  
      await newSponsorPlan.save();
  
      //send notification to user
  
      return res.status(200).json({
        status: "success",
        message: "Sponsor Plan Added successfully",
      });
    } catch (error) {
      console.error(error);
    }
  }



  //fetch all sponsor
export async function fetchAllSponsorPlans(req: Request<{}, {}>, res: Response) {

    try {
      const plans = await sponsorplanModel.find({});

      return res.status(200).json({
        status: "success",
        plans: plans,
      });
    } catch (error: any) {
      console.error(error);
    }
  }
