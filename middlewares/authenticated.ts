import { Response, Request, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import { UserInterface } from '../interfaces/userInterface';


function isAuthenticated(req:Request<{}, {}>, res:Response, next:NextFunction){

const token = req.header('Authorization')?.split(' ')[1];
// console.info('Token:', token);
if(!token){
    return res.status(401).json({ message: 'No token, authorization denied' });
}



try {
    //verify token

    const decode = jwt.verify(token, process.env.JWT_SECRET as string);
     (req as any).user = decode;
     
    next();

} catch (err) {
    if(err instanceof jwt.TokenExpiredError){
        return res.status(401).json({ message: 'Token has expired' });
    }
    console.error(err);
    return res.status(401).json({ message: 'Token is not valid' });
}

}


export default isAuthenticated;