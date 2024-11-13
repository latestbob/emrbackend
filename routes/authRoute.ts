import { Router } from 'express';
import { registerUser , LoginUser, getUser } from '../controllers/authController';
import { validateRegiseter, validateLogin } from '../middlewares/authMiddleware';
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


export default authRouter;