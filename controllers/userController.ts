import { Response, Request  } from 'express';
import { Types } from 'mongoose';
import { UserInterface } from '../interfaces/userInterface';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';

import userModel from '../models/userModels';
import officeModel from '../models/officeModel';
import nodemailer from "nodemailer";


// update profile


export async function updateProfile(req:Request<{},{}, UserInterface>, res:Response){


    

    const {phone, uuid} = req.body;


    try {

        const existed = await userModel.findOne({uuid});

        if(!existed){
            return res.status(400).json({message:"user not found"});
        }

        existed.phone = phone;

        await existed.save();


        return res.status(200).json({
            status :"success",
            message:"Profile updated successfully"
        });

        
    } catch (error:any) {
        console.error(error);
    }

}

// change password

export async function changePassword(req:Request<{},{}, UserInterface>, res:Response){

    const {email, password} = req.body;


    try {

        const existed = await userModel.findOne({email});

        if(!existed){
            return res.status(400).json({message:"user not found"});
        }

        const hashedPassword = await bcrypt.hash(password,10);

        existed.password = hashedPassword;

        await existed.save();


        return res.status(200).json({
            status :"success",
            message:"Password updated successfully"
        });

        
    } catch (error:any) {
        console.error(error);
    }

}



export async function getNonClinicalStaff(req:Request<{},{}, UserInterface>, res:Response){

  


    try {

        const nonclinical = await userModel.find({
            role: { $nin: ['Doctor', 'Nurse'] }
          });

        


        return res.status(200).json({
            status :"success",
            nonclinicalstaff:nonclinical,
        });

        
    } catch (error:any) {
        console.error(error);
    }

}


//get Unique User by uuid


export async function getUniqueUser(req:Request<{uuid:string},{}, UserInterface>, res:Response){

    const uuid = req.params.uuid;
 

    try {

        //

        const existed = await userModel.findOne({uuid});

        if(!existed){
            return res.status(400).json({
                "status":"failed",
                "message":"User not found"
            });
        }
        


        return res.status(200).json({
            status :"success",
            user : existed
        });

        
    } catch (error:any) {
        console.error(error);
    }

}

//update unique user (action by admin and super admin)

export async function updateUniqueUser(req:Request<{}, {}, UserInterface>, res:Response){


    // validate input

    // const errors = validationResult(req);

    // if(!errors.isEmpty()){
    //     return res.status(400).json({
    //         "status":"failed",
    //         "error":errors.array(),
    //     });
    // }
        
    const {firstname, lastname, email, phone, uuid, role, department, dob, gender, address} = req.body;
    try {
        const user = await userModel.findOne({uuid});

        if(!user){
            return res.status(400).json({
                status:"failed",
                error:"user  not registered"
            });
        }

        


    // Update only the provided fields in req.body
    const updatedUser = await userModel.findOneAndUpdate(
        { uuid },
        { $set: req.body },
        { new: true, runValidators: true } // new: return the updated user; runValidators: enforce schema validation
    );

    return res.status(200).json({
        status: "success",
        message: "User updated successfully",
        data: updatedUser
    });

      

   

    } catch (error) {
        console.error(error);
    }

}

