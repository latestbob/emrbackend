import {Request, Response} from 'express';
import departModel from '../models/departmentModel';
import { DepartInterface } from '../interfaces/departInterface';
import officeModel from '../models/officeModel';
import { validationResult } from 'express-validator';
import { Types } from 'mongoose';
import { error } from 'console';


export async function createDepartment(req:Request<{},{}, DepartInterface>, res:Response){

   
   const errors = validationResult(req);


   if(!errors.isEmpty()){
        return res.status(400).json({
            status:"failed",
            error: errors.array(),
        });
   }
   
    const {name, branch, office_uuid} = req.body;


    try {
        // check if office with such id exists
        const exist = officeModel.findOne({uuid:office_uuid});

        if(!exist){
            return res.status(400).json({
                status:"failed",
                error:` Office with uuid of ${office_uuid} not found`
            });
        }

        
        const depart = new departModel(req.body);
        
        await depart.save();

        return res.status(200).json({
            status:"success",
            "department":depart,
        });




        
    } catch (error) {
        console.error(error);
        
    }

}


// all departments in an office

export async function getDepartments(req:Request<{uuid:string},{}, DepartInterface>, res:Response){


    const uuid :string = req.params.uuid;



    try {

        // check if oofice with such uuid exists;

        const check = await officeModel.findOne({uuid:uuid});

        if(!check){
            return res.status(400).json({
                status:"failed",
                error:"office not found",
            });


        }

        else{
            const department = await departModel.find({office_uuid:uuid});

            return res.status(200).json({
                status:"success",
                departments : department
            });
        }

       
        
    } catch (error) {
        return res.status(200).json({
            status:"failed",
            message: 'Server Error', error,
        });
    }
}

//update unique department


export async function updateDepartment(req:Request<{id:Types.ObjectId},{}, DepartInterface>, res:Response){


    const id = req.params.id;

    if(!Types.ObjectId.isValid(id)){
        //check if its nt a valid id

        return res.status(400).json({
            status:"failed",
            error:"Not a valid id format"
        });
    }

    const errors = validationResult(req);


   if(!errors.isEmpty()){
        return res.status(400).json({
            status:"failed",
            error: errors.array(),
        });
   }

    try {

        //continue here

        const department = await departModel.findByIdAndUpdate(id, req.body, {new:true});


        if(!department){
            return res.status(400).json({
                status:"failed",
                error:"department not found"
            });
        }

        return res.status(200).json({
            status : "success",
            department : department
        });
        
    } catch (error) {
        console.error(error);
    }

}


//delete department

export async function deleteDepartment(req:Request <{id:Types.ObjectId}, {}, DepartInterface>, res:Response){

    // validate id

    const id = req.params.id;

    if(!Types.ObjectId.isValid(id)){
        return res.status(400).json({
            status:"failed",
            error:"Not a valid Id format"
        });
    }

    try {
        const department = await departModel.findByIdAndDelete(id);

        if(!department){
            return res.status(400).json({
                status:"failed",
                error:"Unable delete department"
            });
        }

        return res.status(200).json({
            status:"success",
            message:"department deleted successfully"
        });
    } catch (error) {
        console.error(error);
    }

}