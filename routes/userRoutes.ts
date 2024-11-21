import { Router } from 'express';

import isAuthenticated from '../middlewares/authenticated';
import { changePassword, updateProfile } from '../controllers/userController';
import { validateChangePassword } from '../middlewares/userMiddleware';

const userRouter = Router();



// user update profile (phone)

userRouter.put('/profile', isAuthenticated, updateProfile);

//change password
userRouter.put('/changepassword', isAuthenticated, changePassword);


export default userRouter;