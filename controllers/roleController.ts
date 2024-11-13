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


// all departments in an office
