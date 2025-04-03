import { Response, Request  } from 'express';
import { Types } from 'mongoose';
import { UserInterface } from '../interfaces/userInterface';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import { validateRegiseter } from '../middlewares/authMiddleware';
import userModel from '../models/userModels';
import officeModel from '../models/officeModel';
import nodemailer from "nodemailer";


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
        
      const {firstname, lastname, email, phone, office, office_uuid, role, position, department, password, dob, gender, address, fee, aos} = req.body;
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

      //Super Admin, Administrator, Receptionist, Accountant, Billing and Accounts Staff, IT Support

      if (role && !["Super Admin", "Administrator", "Receptionist", "Accountant", "Billing and Accounts Staff", "IT Support"].includes(role)) {
        if (!fee || !aos) {
          return res.status(400).json({
            status: "failed",
            error: "Both fee and aos are required for clinical staff"
          });
        }
      }

     

        const hashedPassword = await bcrypt.hash(password,10);

        const uuid:string =  Math.random().toString(36).substring(2, 8).toLowerCase();
      

        const newUser = new userModel({
            firstname, lastname, email, phone, office, office_uuid, role, position, department, password:hashedPassword, uuid:uuid, gender, dob, address, fee, aos
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
            return res.status(404).json({
                status:"Failed",
                error:"User not found",
            });
        }

        //check user password

        const isMatched = await bcrypt.compare(password, user.password);
        if(!isMatched){
            return res.status(404).json({
                status:"Failed",
                error:"User not found",
            });
        }

        // Create a token
        const token = jwt.sign({ email: user.email, role: user.role }, process.env.JWT_SECRET as string, { expiresIn: '8h' });

       
        // Hide user password
        const userWithoutPassword = {
          ...user.toObject(),
          password: null
        };


        return res.status(200).json({
            status:"success",
           user:userWithoutPassword,
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


// forgot password

export async function forgotPass(req:Request<{}, {}>, res:Response){
    
    const errors = validationResult(req);

    if(!errors.isEmpty()){
          return res.status(400).json({
              status:"failed",
              error:errors.array(),
          });
    }


    try{

        const {email} = req.body;

        const user = await userModel.findOne({email});

        if(!user){
            return res.status(400).json({message: "Email not registered"});
        }


    //    generate jwt token

    const resetToken = jwt.sign({ email: user.email }, process.env.JWT_SECRET as string, { expiresIn: '1h' });


       // Create a reset link
       const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;


        // Set up the email transporter

        // Set up the email transporter
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST, // Mailtrap host
        port: parseInt(process.env.SMTP_PORT || "587"), // Mailtrap port
        auth: {
          user: process.env.SMTP_USER, // Your Mailtrap username
          pass: process.env.SMTP_PASS, // Your Mailtrap password
        },
      });

     
      
  
      // Send the email
      const mailOptions = {
        from: "office@mdamonitor.com",
        to: email,
        subject: "Password Reset Request",
        html: `<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" style="line-height: inherit;">
<head>
<!--[if gte mso 9]>
<xml>
  <o:OfficeDocumentSettings>
    <o:AllowPNG/>
    <o:PixelsPerInch>96</o:PixelsPerInch>
  </o:OfficeDocumentSettings>
</xml>
<![endif]-->
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
  <title></title>

  
  

<!--[if !mso]><!--><link href="https://fonts.googleapis.com/css?family=Cabin:400,700&display=swap" rel="stylesheet" type="text/css"><link href="https://fonts.googleapis.com/css?family=Montserrat:400,700&display=swap" rel="stylesheet" type="text/css"><link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700&display=swap" rel="stylesheet" type="text/css"><!--<![endif]-->

</head>

<body class="clean-body u_body" style="line-height: inherit; margin: 0; padding: 0; -webkit-text-size-adjust: 100%; background-color: #ffffff; color: #000000;">
  <!--[if IE]><div class="ie-container"><![endif]-->
  <!--[if mso]><div class="mso-container"><![endif]-->
  <table id="u_body" style="line-height: inherit; color: #000000; border-collapse: collapse; table-layout: fixed; border-spacing: 0; mso-table-lspace: 0pt; mso-table-rspace: 0pt; vertical-align: top; min-width: 320px; Margin: 0 auto; background-color: #ffffff; width: 100%;" cellpadding="0" cellspacing="0" width="100%" valign="top" bgcolor="#ffffff">
  <tbody style="line-height: inherit;">
  <tr style="line-height: inherit; border-collapse: collapse; vertical-align: top;" valign="top">
    <td style="line-height: inherit; color: #000000; word-break: break-word; vertical-align: top; border-collapse: collapse;" valign="top">
    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #ffffff;"><![endif]-->
    

<div class="u-row-container" style="line-height: inherit; padding: 0px; background-color: #ffffff;">
  <div class="u-row" style="line-height: inherit; Margin: 0 auto; min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;">
    <div style="line-height: inherit; border-collapse: collapse; display: table; width: 100%; height: 100%; background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: #ffffff;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
<div class="u-col u-col-100" style="line-height: inherit; max-width: 320px; min-width: 600px; display: table-cell; vertical-align: top;">
  <div style="line-height: inherit; height: 100%; width: 100%;">
  <!--[if (!mso)&(!IE)]><!--><div style="line-height: inherit; height: 100%; padding: 0px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-right: 0px solid transparent; border-bottom: 0px solid transparent;"><!--<![endif]-->
  
<table id="u_content_image_1" style="line-height: inherit; vertical-align: top; border-collapse: collapse; color: #000000; font-family: 'Montserrat',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0" valign="top">
  <tbody style="line-height: inherit;">
    <tr style="line-height: inherit; vertical-align: top; border-collapse: collapse;" valign="top">
      <td class="v-container-padding-padding" style="line-height: inherit; vertical-align: top; border-collapse: collapse; color: #000000; overflow-wrap: break-word; word-break: break-word; padding: 20px 10px; font-family: 'Montserrat',sans-serif;" align="left" valign="top">
        


      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>



<div class="u-row-container" style="line-height: inherit; padding: 0px; background-color: white;">
  <div class="u-row" style="line-height: inherit; Margin: 0 auto; min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;">
    <div style="line-height: inherit; border-collapse: collapse; display: table; width: 100%; height: 100%; background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: white;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="600" style="background-color: white;width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
<div class="u-col u-col-100" style="line-height: inherit; max-width: 320px; min-width: 600px; display: table-cell; vertical-align: top;">
  <div style="line-height: inherit; background-color: white; height: 100%; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px; width: 100%;">
  <!--[if (!mso)&(!IE)]><!--><div style="line-height: inherit; height: 100%; padding: 0px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-right: 0px solid transparent; border-bottom: 0px solid transparent; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
  
<table id="u_content_heading_1" style="line-height: inherit; vertical-align: top; border-collapse: collapse; color: #000000; font-family: 'Montserrat',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0" valign="top">
  <tbody style="line-height: inherit;">
    <tr style="line-height: inherit; vertical-align: top; border-collapse: collapse;" valign="top">
      <td class="v-container-padding-padding" style="line-height: inherit; vertical-align: top; border-collapse: collapse; color: #000000; overflow-wrap: break-word; word-break: break-word; padding: 80px 10px 0px; font-family: 'Montserrat',sans-serif;" align="left" valign="top">
        
  <h1 class="v-line-height v-font-size" style="margin: 0px; line-height: 140%; text-align: center; word-wrap: break-word; font-weight: normal; font-family: 'Open Sans',sans-serif; font-size: 30px;">
    <div style="line-height: inherit;">
<div style="line-height: inherit;"><strong style="line-height: inherit;"></strong></div>
</div>
  </h1>

      </td>
    </tr>
  </tbody>
</table>

<table style="line-height: inherit; vertical-align: top; border-collapse: collapse; color: #000000; font-family: 'Montserrat',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0" valign="top">
  <tbody style="line-height: inherit;">
    <tr style="line-height: inherit; vertical-align: top; border-collapse: collapse;" valign="top">
      <td class="v-container-padding-padding" style="line-height: inherit; vertical-align: top; border-collapse: collapse; color: #000000; overflow-wrap: break-word; word-break: break-word; padding: 13px; font-family: 'Montserrat',sans-serif;" align="left" valign="top">
        


      </td>
    </tr>
  </tbody>
</table>

<table id="u_content_text_4" style="line-height: inherit; vertical-align: top; border-collapse: collapse; color: #000000; font-family: 'Montserrat',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0" valign="top">
  <tbody style="line-height: inherit;">
    <tr style="line-height: inherit; vertical-align: top; border-collapse: collapse;" valign="top">
      <td class="v-container-padding-padding" style="line-height: inherit; vertical-align: top; border-collapse: collapse; color: #000000; overflow-wrap: break-word; word-break: break-word; padding: 0px 50px 40px; font-family: 'Montserrat',sans-serif;" align="left" valign="top">
        
  <div class="v-line-height" style="line-height: 160%; text-align: center; word-wrap: break-word;">
    <p style="margin: 0; font-size: 14px; line-height: 170%;"><span style="font-size: 12px; line-height: 20.4px;">

        You requested a password reset. Click the link below to reset your password. This link is valid for 1 hour</p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

<table id="u_content_button_1" style="line-height: inherit; vertical-align: top; border-collapse: collapse; color: #000000; font-family: 'Montserrat',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0" valign="top">
  <tbody style="line-height: inherit;">
    <tr style="line-height: inherit; vertical-align: top; border-collapse: collapse;" valign="top">
      <td class="v-container-padding-padding" style="line-height: inherit; vertical-align: top; border-collapse: collapse; color: #000000; overflow-wrap: break-word; word-break: break-word; padding: 0px 10px 40px; font-family: 'Montserrat',sans-serif;" align="left" valign="top">
        
  <!--[if mso]><style>.v-button {background: transparent !important;}</style><![endif]-->
<div align="center" style="line-height: inherit;">
  <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://admin.asknello.com" style="height:37px; v-text-anchor:middle; width:203px;" arcsize="67.5%"  stroke="f" fillcolor="#d07750"><w:anchorlock/><center style="color:#FFFFFF;font-family:'Montserrat',sans-serif;"><![endif]-->  
    <a href=${resetLink} target="_blank" class="v-button v-size-width" style="line-height: inherit; box-sizing: border-box; display: inline-block; font-family: 'Montserrat',sans-serif; text-decoration: none; -webkit-text-size-adjust: none; text-align: center; color: #FFFFFF; background-color: rgb(193 57 58); border-radius: 25px; -webkit-border-radius: 25px; -moz-border-radius: 25px; width: 35%; max-width: 100%; overflow-wrap: break-word; word-break: break-word; word-wrap: break-word; mso-border-alt: none;">
      <span class="v-line-height" style="display: block; padding: 10px 20px; line-height: 120%;"><span style="font-size: 14px; line-height: 16.8px;">Reset Password</span></span>
    </a>
  <!--[if mso]></center></v:roundrect><![endif]-->
</div>

      </td>
    </tr>
  </tbody>
</table>

<table id="u_content_text_3" style="line-height: inherit; vertical-align: top; border-collapse: collapse; color: #000000; font-family: 'Montserrat',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0" valign="top">
  <tbody style="line-height: inherit;">
    <tr style="line-height: inherit; vertical-align: top; border-collapse: collapse;" valign="top">
      <td class="v-container-padding-padding" style="line-height: inherit; vertical-align: top; border-collapse: collapse; color: #000000; overflow-wrap: break-word; word-break: break-word; padding: 0px 60px 20px; font-family: 'Montserrat',sans-serif;" align="left" valign="top">
        
  <div class="v-line-height" style="line-height: 140%; text-align: center; word-wrap: break-word;">
    <p style="margin: 0; font-size: 14px; line-height: 140%;"><span style="font-size: 14px; line-height: 19.6px; font-family: 'Open Sans', sans-serif;">Powered by Nello</span></p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>



<div class="u-row-container" style="line-height: inherit; padding: 0px; background-color: transparent;">
  <div class="u-row" style="line-height: inherit; Margin: 0 auto; min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;">
    <div style="line-height: inherit; border-collapse: collapse; display: table; width: 100%; height: 100%; background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
<div class="u-col u-col-100" style="line-height: inherit; max-width: 320px; min-width: 600px; display: table-cell; vertical-align: top;">
  <div style="line-height: inherit; height: 100%; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px; width: 100%;">
  <!--[if (!mso)&(!IE)]><!--><div style="line-height: inherit; height: 100%; padding: 0px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-right: 0px solid transparent; border-bottom: 0px solid transparent; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
  
<table id="u_content_image_3" style="line-height: inherit; vertical-align: top; border-collapse: collapse; color: #000000; font-family: 'Montserrat',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0" valign="top">
  <tbody style="line-height: inherit;">
    <tr style="line-height: inherit; vertical-align: top; border-collapse: collapse;" valign="top">
      <td class="v-container-padding-padding" style="line-height: inherit; vertical-align: top; border-collapse: collapse; color: #000000; overflow-wrap: break-word; word-break: break-word; padding: 10px; font-family: 'Montserrat',sans-serif;" align="left" valign="top">
        
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="line-height: inherit; vertical-align: top; border-collapse: collapse; color: #000000;" valign="top">
  <tr style="line-height: inherit; vertical-align: top; border-collapse: collapse;" valign="top">
    <td style="line-height: inherit; vertical-align: top; border-collapse: collapse; color: #000000; padding-right: 0px; padding-left: 0px;" align="center" valign="top">
      
      <img align="center" border="0" src="images/image-1.png" alt="" title="" style="line-height: inherit; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; clear: both; border: none; height: auto; float: none; width: 20%; max-width: 116px; display: inline-block;" width="116" class="v-src-width v-src-max-width">
      
    </td>
  </tr>
</table>

      </td>
    </tr>
  </tbody>
</table>

<table style="line-height: inherit; vertical-align: top; border-collapse: collapse; color: #000000; font-family: 'Montserrat',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0" valign="top">
  <tbody style="line-height: inherit;">
    <tr style="line-height: inherit; vertical-align: top; border-collapse: collapse;" valign="top">
      <td class="v-container-padding-padding" style="line-height: inherit; vertical-align: top; border-collapse: collapse; color: #000000; overflow-wrap: break-word; word-break: break-word; padding: 10px 10px 80px; font-family: 'Montserrat',sans-serif;" align="left" valign="top">
        


      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>


    <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
    </td>
  </tr>
  </tbody>
  </table>
  <!--[if mso]></div><![endif]-->
  <!--[if IE]></div><![endif]-->
</body>

</html>`,
      };
  
      await transporter.sendMail(mailOptions);
  
      return res.status(200).json({
        status: "success",
        message: "Password reset email sent. Please check your inbox.",
        resetToken: resetToken,

      });
   




    }
    catch(error){
        console.error(error);
    }
}


export async function verifyToken(req:Request<{}, {}>, res:Response){

  const errors = validationResult(req);

  if(!errors.isEmpty()){
        return res.status(400).json({
            status:"failed",
            error:errors.array(),
        });
  }


    const {token} = req.body;

    try {
        // verify the token

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);


        return res.status(200).json({
            valid:true,
            user:decoded,
        
        });
    } catch (error:any) {
        console.error("Token validation error:", error.message);
        return res.status(400).json({ valid: false, error: "Invalid or expired token" });
    }

}


//reset password

export async function resetPass(req:Request<{}, {}>, res:Response){


    // validate input

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({
            "status":"failed",
            "error":errors.array(),
        });
    }
        
      const { email, password, token} = req.body;
    try {
        const user = await userModel.findOne({email});

        if(!user){
            return res.status(400).json({
                status:"failed",
                error:"user with email not registered"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

        const hashedPassword = await bcrypt.hash(password,10);

      user.password = hashedPassword;

      await user.save();


        //send notification to user

        return res.status(200).json({
            status:"success",
            message:"Password updated successfully"
        });


    } catch (error:any) {
      console.error("Token validation error:", error.message);
      return res.status(400).json({ valid: false, error: "Invalid or expired token" });
    }

}

