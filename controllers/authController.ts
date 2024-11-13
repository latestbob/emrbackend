import { Response, Request  } from 'express';
import { Types } from 'mongoose';
import { UserInterface } from '../interfaces/userInterface';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import { validateRegiseter } from '../middlewares/authMiddleware';
import userModel from '../models/userModels';
import officeModel from '../models/officeModel';

//user registeration auth routes
export async function registerUser(req:Request<{}, {}, UserInterface>, res:Response){


    // validate input

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({
            "status":"failed",
            "error":errors.array(),
        });
    }
        
      const {firstname, lastname, email, phone, office, office_uuid, role, position, department, password} = req.body;
    try {
        const existedUser = await userModel.findOne({email});

        if(existedUser){
            return res.status(400).json({
                status:"failed",
                error:"user with email already exists"
            });
        }

        const existedOffice = await officeModel.find({uuid:office_uuid});

        // check if office doesn't exist

        if(!existedOffice){
            return res.status(400).json({
                status:"failed",
                error:"office does not exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const newUser = new userModel({
            firstname, lastname, email, phone, office, office_uuid, role, position, department, password:hashedPassword
        });

        await newUser.save();

        //send notification to user

        return res.status(200).json({
            status:"success",
            message:"user created successfully"
        });


    } catch (error) {
        console.error(error);
    }

}


//Login user


export async function LoginUser(req:Request<{}, {}, UserInterface>, res:Response){

// Validate request

 const errors = validationResult(req);

  if(!errors.isEmpty()){
        return res.status(400).json({
            status:"failed",
            error:errors.array(),
        });
  }

        const {email, password} = req.body;
   try {

        const user = await userModel.findOne({email});
        if(!user){
            return res.status(400).json({
                status:"failed",
                error:"user with email not found",
            });
        }

        //check user password

        const isMatched = bcrypt.compare(password, user.password);
        if(!isMatched){
            return res.status(400).json({
                status:"failed",
                error:"Invalid credentials",
            });
        }

        // Create a token
        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

       


        return res.status(200).json({
            status:"sucess",
           user:user,
           token:token,
        });

   } catch (error) {
        console.error(error);
   }

}


// GET USER

export async function getUser(req:Request<{}, {}, UserInterface>, res:Response){

    try {
        const userEmail = (req as any).user?.email; 

        if (!userEmail) {
            return res.status(401).json({ message: 'User not authenticated' });
          }
        
          const user = await userModel.findOne({email:userEmail});
          if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }
        
          res.json(user);
    } catch (error) {
        console.error(error);
    }

}