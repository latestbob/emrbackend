import { Router } from 'express';
import { registerUser , LoginUser, getUser, forgotPass, verifyToken, resetPass } from '../controllers/authController';
import { validateRegiseter, validateLogin, validateForgot, validateReset } from '../middlewares/authMiddleware';
import isAuthenticated from '../middlewares/authenticated';

const authRouter = Router();


// register a user

authRouter.post('/register', validateRegiseter, registerUser);

//login user
authRouter.post('/login', validateLogin, LoginUser);


//protected auth route
//get user

authRouter.post('/user', isAuthenticated, getUser);

//end of protected auth route


// forget password auth route

authRouter.post('/forgot',validateForgot, forgotPass);

//verify token

authRouter.post('/verifytoken', verifyToken);

//reset password

authRouter.post('/reset-password',validateReset, resetPass);




export default authRouter;