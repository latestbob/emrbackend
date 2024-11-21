import { Router } from 'express';

import isAuthenticated from '../middlewares/authenticated';
import { updateProfile } from '../controllers/userController';

const userRouter = Router();



// user update profile (phone)

userRouter.put('/profile', isAuthenticated, updateProfile);


export default userRouter;