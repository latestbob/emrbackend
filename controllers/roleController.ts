import {Request, Response} from 'express';
import roleModel from '../models/roleModel';
import { RoleInterface } from '../interfaces/roleInterface';
import officeModel from '../models/officeModel';
import { validationResult } from 'express-validator';
import { Types } from 'mongoose';
import { error } from 'console';


export async function createRole(req:Request<{},{}, RoleInterface>, res:Response){

   
   const errors = validationResult(req);


   if(!errors.isEmpty()){
        return res.status(400).json({
            status:"failed",
            error: errors.array(),
        });
   }
   
    const {office_uuid, name} = req.body;


    try {
        // check if office with such id exists
        const exist = officeModel.findOne({uuid:office_uuid});

        if(!exist){
            return res.status(400).json({
                status:"failed",
                error:` Medcenter with uuid of ${office_uuid} not found`
            });
        }

        const existed = await roleModel.findOne({name:name});

        if(existed){
            return res.status(400).json({
                "status":"failed",
                "message":"Role already exists",
            });
        }

        
        const role = new roleModel(req.body);
        
        await role.save();

        return res.status(200).json({
            status:"success",
            "role":role,
        });




        
    } catch (error) {
        console.error(error);
        
    }

}


// all roles in an office


export async function getRole(req:Request<{office_uuid:string},{}, RoleInterface>, res:Response){

    const office_uuid :string = req.params.office_uuid;
    //const uuid :string = req.params.uuid;

    try {
        //check if medcenter exist

        const exists = await officeModel.findOne({uuid:office_uuid});

        if(!exists){
            return res.status(400).json({
                status:"failed",
                error:"Medcenter not found",
            });
        }

        else{
            
            const roles = await roleModel.find({office_uuid});

            return res.status(200).json({
                "status":"success",
                "roles":roles
            });
        }



    } catch (error) {
        return res.status(400).json({
            status:"failed",
            message: 'Server Error', error,
        });
    }

}

//delete role

export async function deleteRole(req:Request <{id:Types.ObjectId}, {}, RoleInterface>, res:Response){

    // validate id

    const id = req.params.id;

    if(!Types.ObjectId.isValid(id)){
        return res.status(400).json({
            status:"failed",
            error:"Not a valid Id format"
        });
    }

    try {
        const role = await roleModel.findByIdAndDelete(id);

        if(!role){
            return res.status(400).json({
                status:"failed",
                error:"Unable delete Role"
            });
        }

        return res.status(200).json({
            status:"success",
            message:"Role deleted successfully"
        });
    } catch (error) {
        console.error(error);
    }

}