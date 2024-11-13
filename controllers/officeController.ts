import mongoose from 'mongoose';
import { Request, Response } from 'express';
import officeModel from '../models/officeModel';
import { OfficeInterface } from '../interfaces/officeInterface';

import { validationResult } from 'express-validator';
export async function getAllOffice(req : Request, res : Response){


    let offices : OfficeInterface[];

    try {

        offices = await officeModel.find();

        res.status(200).json({
            "status":"success",
            "offices" : offices
        });
        
    } catch (error) {
        console.log(error);
        res.status(400).json({
            "status":"failed",
            "message":error,
        });
    }




}


//create office

export async function createOffice(req :Request<{}, {}, OfficeInterface>, res:Response){


  const errors = validationResult(req);

  if(!errors.isEmpty()){

    //return 400

    return res.status(400).json({
        "status":"failed",
        "error":errors.array(),
    })
  }

        try {

            //check if office name already exists using their email and name

            const {email, phone} = req.body;

           // const existed = await officeModel.findOne({email:email}); check only email

           const existed = await officeModel.findOne({
            $or: [
                { email: email },
                { phone: phone }
            ]
        });

            if(existed){

                if(existed.email === email){
                    return res.status(400).json({
                        "status":"failed",
                        "message":"Medcenter with email already exists",
                    });
                }

                if(existed.phone === phone){
                    return res.status(400).json({
                        "status":"failed",
                        "message":"Medcenter with phone already exists",
                    });
                }

                
            }
            
             const uuid:string =  Math.random().toString(36).substring(2, 8).toLowerCase();
            const office =  new officeModel({
                ...req.body,
                uuid:uuid
            });
            
            await office.save();

            return res.status(200).json({
                "status":"success",
                "office":office,
            });
            
        } catch (error) {
            console.error(error);

            return res.status(400).json({
                "status":"failed",
                "message":"An error occurred while creating an medcenter"
            });
        }
}


//update office

export async function officUpdate(req:Request<{uuid:string},{}, OfficeInterface>, res:Response){

    const uuid :string = req.params.uuid;

    const updateDate:OfficeInterface = req.body;

    try {

        const office = await officeModel.findOneAndUpdate({uuid : uuid}, updateDate, {new:true});

        if(!office){
            return res.status(400).json({
                "status":"failed",
                "message":"office not found"
            });

        }

        return res.status(200).json({
            status: "success",
            message: "Office updated successfully",
            data: office,
        });

     
        
    } catch (error) {
        return res.status(500).json({
            "status": "error",
            "message": "An error occurred while updating the office",
            
        });
    }

}


///delete office

export async function deleteOffice(req:Request<{uuid:string},{}, OfficeInterface>,res:Response){
    const uuid:string = req.params.uuid;


    try {
        const office = await officeModel.findOneAndDelete({uuid : uuid});

        if(!office){
            return res.status(400).json({
                "status":"failed",
                "message":"office not found"
            });
        }

        return res.status(200).json({
            "status":"success",
            "message":"office deleted successfully"
        });
    } catch (error) {
        console.error(error);
    }
}