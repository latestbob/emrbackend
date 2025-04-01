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
import serviceModel from "../models/serviceModel";


interface IService extends Document {
    type:string;
    name:string;
    price: Number;
    sponsor_uuid:string;
    plan_code:string;
    uuid:string;
    is_Active?:boolean;
    
   

}

//schedule an appointment
export async function addNewService(
  req: Request<{}, {}, IService>,
  res: Response
) {
  // validate input

  const { type, name, price, sponsor_uuid, plan_code } = req.body;
  
  try {
    

    const sponsor = await sponsorModel.findOne({ uuid:sponsor_uuid });

    // check if sponsor already exists

    if (!sponsor) {
      return res.status(404).json({
        status: "failed",
        error: "Sponsor not found",
      });
    }

    const plan = await sponsorplanModel.findOne({ plan_code });

    if (!plan) {
        return res.status(404).json({
          status: "failed",
          error: "Sponsor plan not found",
        });
      }


    const existed = await serviceModel.findOne({ name });

    if (existed) {
        return res.status(400).json({
          status: "failed",
          error: "Service Already Exists",
        });
      }
  

    const uuid: string = Math.random()
      .toString(16)
      .substring(2, 10)
      .toUpperCase();

    const newService = new serviceModel({
      name,
      type,
      price,
      sponsor_uuid,
      plan_code,
      uuid,
    });

    await newService.save();

    //send notification to user

    return res.status(200).json({
      status: "success",
      message: "Service Added successfully",
    });
  } catch (error) {
    console.error(error);
  }
}

// //fetch all service
export async function fetchAllService(req: Request<{}, {}>, res: Response) {

    try {
      const service = await serviceModel.find({});

      return res.status(200).json({
        status: "success",
        services: service,
      });
    } catch (error: any) {
      console.error(error);
    }
  }


  export async function fetchServiceByType(req: Request<{type:string}, {}>, res: Response) {

    const type = req.params.type;



    if(type !== "Pathology Investigations" && type !== "Imaging Investigation" && type !== "Service"){
      return res.status(400).json({
        status: "failed",
        error: "type must be Pathology Investigations, Imaging Investigation or Service",
      });
    } 
    

    try {
      const service = await serviceModel.find({type});

      return res.status(200).json({
        status: "success",
        services: service,
      });
    } catch (error: any) {
      console.error(error);
    }
  }



//   //update unique sponsor

  
// export async function updateUniqueSponsor(

//     req: Request<{ uuid: string }, {}, ISponsor>,
//     res: Response
//     ) {
//     const uuid = req.params.uuid;
    
//     try {
//         const existed = await sponsorModel.findOne({ uuid });
    
//         if (!existed) {
//         return res.status(400).json({
//             status: "failed",
//             error: "Sponsor does not exists",
//         });
//         }
    
//         await sponsorModel.findOneAndUpdate({ uuid }, req.body);
    
//         return res.status(200).json({
//         status: "success",
//         message: "Sponsor Updated successfully",
//         });
//     } catch (error: any) {
//         console.error(error);
//     }
//     }



//     //delete unique sponsor

//     export async function deleteUniqueSponsor(
//         req: Request<{ uuid :string}, {}, ISponsor>, res: Response
//     ){
//         const uuid = req.params.uuid;

//         try {

//             const existed = await sponsorModel.findOne({uuid});

//             if(!existed){
//                 return res.status(400).json({
//                     status:"failed",
//                     error:"Sponsor does not exists",
//                 })
//             }

//             await sponsorModel.findOneAndDelete({uuid});

//             return res.status(200).json({
//                 status:"success",
//                 message:"Sponsor deleted successfully",
//             });
            
//         } catch (error) {
            
//             console.error(error);

//         }
//     }


// //create sponsor plan

// export async function createSponsorPlan(
//     req: Request<{uuid :string}, {}, ISponsorPlan>,
//     res: Response
//   ) {
//     // validate input

//     const { name } = req.body;
//     const uuid = req.params.uuid;
    
//     try {

//         const sponsor = await sponsorModel.findOne({ uuid });

//         if (!sponsor) {
//             return res.status(400).json({
//               status: "failed",
//               error: "Sponsor does not exist",
//             });
//           }
      
  
//       const existed = await sponsorplanModel.findOne({ name });
  
//       // check if diagnosis already exists
  
//       if (existed) {
//         return res.status(400).json({
//           status: "failed",
//           error: "Sponsor plan already exists",
//         });
//       }
  
//       const newSponsorPlan = new sponsorplanModel({
//         name,
//         sponsor_uuid: uuid,
//         plan_code: Math.random()
//           .toString(16)
//           .substring(2, 10)
//           .toUpperCase(),
//       });
  
//       await newSponsorPlan.save();
  
//       //send notification to user
  
//       return res.status(200).json({
//         status: "success",
//         message: "Sponsor Plan Added successfully",
//       });
//     } catch (error) {
//       console.error(error);
//     }
//   }



//   //fetch all sponsor
// export async function fetchAllSponsorPlans(req: Request<{}, {}>, res: Response) {

//     try {
//       const plans = await sponsorplanModel.find({});

//       return res.status(200).json({
//         status: "success",
//         plans: plans,
//       });
//     } catch (error: any) {
//       console.error(error);
//     }
//   }


    
export async function fetchIvestigationByPlan(

  req: Request<{ plan: string }, {}>,
  res: Response
  ) {
  const plan = req.params.plan;
  
  try {
      const existed = await sponsorplanModel.findOne({ plan_code:plan });
  
      if (!existed) {
      return res.status(400).json({
          status: "failed",
          error: "Sponsor plan does not  exist",
      });
      }

      const services = await serviceModel.find({ plan_code: plan, type: "Pathology Investigations" });

      return res.status(200).json({
        status: "success",
        investigations: services,
      });
  
     
  } catch (error: any) {
      console.error(error);
  }
  }



  //fetch image by plan

  export async function fetchImagingByPlan(

    req: Request<{ plan: string }, {}>,
    res: Response
    ) {
    const plan = req.params.plan;
    
    try {
        const existed = await sponsorplanModel.findOne({ plan_code:plan });
    
        if (!existed) {
        return res.status(400).json({
            status: "failed",
            error: "Sponsor plan does not exist",
        });
        }
  
        const services = await serviceModel.find({ plan_code: plan, type: "Imaging Investigation" });
  
        return res.status(200).json({
          status: "success",
          imaging: services,
        });
    
       
    } catch (error: any) {
        console.error(error);
    }
    }


    //fetch other services by plan


    export async function fetchOtherServiceByPlan(

      req: Request<{ plan: string }, {}>,
      res: Response
      ) {
      const plan = req.params.plan;
      
      try {
          const existed = await sponsorplanModel.findOne({ plan_code:plan });
      
          if (!existed) {
          return res.status(400).json({
              status: "failed",
              error: "Sponsor plan does not exist",
          });
          }
    
          const services = await serviceModel.find({ plan_code: plan, type: "Service" });
    
          return res.status(200).json({
            status: "success",
            otherservice: services,
          });
      
         
      } catch (error: any) {
          console.error(error);
      }
      }
    
  
      //fetch service by uuid

      export async function getUniqueServiceByUuid(

        req: Request<{ uuid: string }, {}>,
        res: Response
        ) {
        const uuid = req.params.uuid;
        
        try {
            const existed = await serviceModel.findOne({ uuid });
        
            if (!existed) {
            return res.status(404).json({
                status: "failed",
                error: "service not found",
            });
            }
      
         
      
            return res.status(200).json({
              status: "success",
              service: existed,
            });
        
           
        } catch (error: any) {
            console.error(error);
        }
        }
      
    

        //update unique service

        export async function updateUniqueService(

    req: Request<{ uuid: string }, {}, IService>,
    res: Response
    ) {
    const uuid = req.params.uuid;

    const {name, type, price} = req.body;

     // validate input

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: "failed",
      error: errors.array(),
    });
  }
    
    try {
        const existed = await serviceModel.findOne({ uuid });
    
        if (!existed) {
        return res.status(404).json({
            status: "failed",
            error: "service not found",
        });
        }
    
        await serviceModel.findOneAndUpdate({ uuid }, req.body);
    
        return res.status(200).json({
        status: "success",
        message: "service updated successfully",
        });
    } catch (error: any) {
        console.error(error);
    }
    }
