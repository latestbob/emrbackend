import { Router } from 'express';

import isAuthenticated from '../middlewares/authenticated';
import { changePassword, getNonClinicalStaff, getUniqueUser, updateProfile } from '../controllers/userController';
import { validateChangePassword } from '../middlewares/userMiddleware';

const userRouter = Router();



// user update profile (phone)

userRouter.put('/profile', isAuthenticated, updateProfile);

//change password
userRouter.put('/changepassword', isAuthenticated, changePassword);


//get all users that are not doctors or nurse

//

userRouter.get("/nonclincalstaff", getNonClinicalStaff)

//get unique user staff by uuid

userRouter.get("/unique/:uuid", isAuthenticated, getUniqueUser);



export default userRouter;