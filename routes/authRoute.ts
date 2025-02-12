import { Router } from 'express';
import { registerUser , LoginUser, getUser, forgotPass, verifyToken, resetPass } from '../controllers/authController';
import { validateRegiseter, validateLogin, validateForgot, validateReset, validateToken } from '../middlewares/authMiddleware';
import isAuthenticated from '../middlewares/authenticated';
import isAdmin from '../middlewares/adminMiddleware';

const authRouter = Router();


// register a user

authRouter.post('/register', isAuthenticated, validateRegiseter, registerUser);

//login user
authRouter.post('/login', validateLogin, LoginUser);


//protected auth route
//get user

authRouter.post('/user', isAuthenticated, getUser);

//end of protected auth route


// forget password auth route

authRouter.post('/forgot',validateForgot, forgotPass);

//verify token

authRouter.post('/verifytoken', validateToken, verifyToken);

//reset password

authRouter.post('/reset-password',validateReset, resetPass);




export default authRouter;