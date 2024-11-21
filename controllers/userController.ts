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