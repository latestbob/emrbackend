import { Response, Request } from "express";
import { Types } from "mongoose";
import { PatientInterface } from "../interfaces/patientInterface";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import { validateRegiseter } from "../middlewares/authMiddleware";
import patientModel from "../models/patientModel";
import officeModel from "../models/officeModel";
import nodemailer from "nodemailer";

//user registeration auth routes
export async function registerPatient(
  req: Request<{}, {}, PatientInterface>,
  res: Response
) {
  // validate input

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: "failed",
      error: errors.array(),
    });
  }

  const {
    title,
    firstname,
    lastname,
    middlename,
    email,
    phone,
    marital_status,
    state,
    city,
    religion,
    blood_group,
    genotype,
    next_of_kin,
    next_of_kin_address,
    next_of_kin_phone,
    next_of_kin_relationship,
    height,
    weight,
    sponsor,
    sponsor_plan,
    occupation,
    office,
    office_uuid,
    dob,
    gender,
    address,
    allergies,
  } = req.body;
  try {
    const existedUser = await patientModel.findOne({ email });

    if (existedUser) {
      return res.status(400).json({
        status: "failed",
        error: "patient with email already exists",
      });
    }

   



    // check if office doesn't exist

    const existedOffice = await officeModel.findOne({
      uuid: office_uuid,
      name: office,
    });
    
    if (!existedOffice) {
      return res.status(404).json({
        status: "failed",
        error: "Office with the provided office_uuid and office not found",
      });
    }

    const hashedPassword = await bcrypt.hash("PatientPass100**", 10);

    const uuid: string = Math.random()
      .toString(16)
      .substring(2, 10)
      .toUpperCase();
    const upi: string = uuid;

    const fullname: string = firstname + " " + lastname + "-" + upi;

    const newUser = new patientModel({
      title,
      firstname,
      lastname,
      middlename,
      email,
      phone,
      marital_status,
      state,
      city,
      religion,
      blood_group,
      genotype,
      next_of_kin,
      next_of_kin_address,
      next_of_kin_phone,
      next_of_kin_relationship,
      height,
      weight,
      sponsor,
      sponsor_plan,
      occupation,
      office,
      office_uuid,
      password: hashedPassword,
      dob,
      gender,
      address,
      uuid,
      upi,
      fullname,
      allergies,
    });

    await newUser.save();

    //send notification to user

    return res.status(200).json({
      status: "success",
      message: "patient registered successfully",
    });
  } catch (error) {
    console.error(error);
  }
}

//get all registered patient

export async function getPatients(req: Request<{}, {}>, res: Response) {
  try {
    const patient = await patientModel.find({}).sort({createdAt : -1 });

    return res.status(200).json({
      status: "success",
      patients: patient,
    });
  } catch (error: any) {
    console.error(error);
  }
}

//get unique patient by upi

export async function getUniquePatient(
  req: Request<{ upi: string }, {}>,
  res: Response
) {
  const upi = req.params.upi;

  try {
    //

    const existed = await patientModel.findOne({ upi });

    if (!existed) {
      return res.status(404).json({
        status: "failed",
        message: "Patient not found",
      });
    }

    return res.status(200).json({
      status: "success",
      patient: existed,
    });
  } catch (error: any) {
    console.error(error);
  }
}

//update unique patient details

export async function updateUniquePatient(
  req: Request<{upi:string}, {}, PatientInterface>,
  res: Response
) {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: "failed",
      error: errors.array(),
    });
  }

 const upi = req.params.upi;

 

  const {
    title,
    firstname,
    lastname,
    middlename,
    email,
    phone,
    marital_status,
    state,
    city,
    religion,
    blood_group,
    genotype,
    next_of_kin,
    next_of_kin_address,
    next_of_kin_phone,
    next_of_kin_relationship,
    height,
    weight,
    sponsor,
    sponsor_plan,
    occupation,
    office,
    office_uuid,
    dob,
    gender,
    
    address,
  } = req.body;

  try {
    const user = await patientModel.findOne({ upi });

    if (!user) {
      return res.status(400).json({
        status: "failed",
        error: "Patient  not registered",
      });
    }


    const fullname: string = firstname + " " + lastname + "-" + upi;
    // Update only the provided fields in req.body

    const updatedFields = {
        ...req.body, // Spread all fields from req.body
        fullname,    // Add the computed fullname
      };
  
    const updatedUser = await patientModel.findOneAndUpdate(
      { upi },
      { $set: updatedFields },
      { new: true, runValidators: true } // new: return the updated user; runValidators: enforce schema validation
    );

    return res.status(200).json({
      status: "success",
      message: "Patient updated successfully",
      patient: updatedUser,
    });
  } catch (error) {
    console.error(error);
  }
}


export async function deleteUniquePatient(req:Request<{upi:string},{}>,res:Response){
    
    const upi = req.params.upi;


    try {
        const patient = await patientModel.findOneAndDelete({upi});

        if(!patient){
            return res.status(400).json({
                "status":"failed",
                "message":"Patient not found"
            });
        }

        return res.status(200).json({
            "status":"success",
            "message":"Patient deleted successfully"
        });
    } catch (error) {
        console.error(error);
    }
}



// search user by lastname, upi or uuid

interface SearchQuery {
  query: string;
}

export async function searchUsers(req: Request<{}, {}, SearchQuery>, res: Response): Promise<Response> {


  try {
    // Extract 'upi' from query parameters
    const {query } = req.query;

    // Validate 'upi'
    if (!query || typeof query !== 'string') {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide a valid search query.',
      });
    }

    // Build a filter object for dynamic search
    const filter: any = {
      $or: [
        { lastname: { $regex: query, $options: 'i' } },
        { upi: { $regex: query, $options: 'i' } },
        { uuid: { $regex: query, $options: 'i' } },
      ],
    };

    // Query the database with the built filter
    const users = await patientModel.find(filter);

    // Return the result
    return res.status(200).json({
      status: 'success',
      users,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      status: 'error',
      message: 'An error occurred while searching for users.',
    });
  }
}