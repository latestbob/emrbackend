import { Router } from 'express';

import isAuthenticated from '../middlewares/authenticated';
import { changePassword, getNonClinicalStaff, getUniqueUser, updateProfile, updateUniqueUser, changeUniquePassword } from '../controllers/userController';
import { validateChangePassword } from '../middlewares/userMiddleware';
import isAdmin from '../middlewares/adminMiddleware';
import isSuperAdmin from '../middlewares/superMiddleware';


const userRouter = Router();



// user update profile (phone)

userRouter.put('/profile', isAuthenticated, updateProfile);

//change password
userRouter.put('/changepassword', isAuthenticated, changePassword);


//get all users that are not doctors or nurse

//

userRouter.get("/nonclincalstaff", getNonClinicalStaff)

//get unique user staff by uuid

userRouter.get("/unique/:uuid", isAuthenticated, isAdmin, getUniqueUser);


//update user, this is for admin or support admin
userRouter.put("/unique/update", isAuthenticated, isAdmin, updateUniqueUser);

//change unique staff password
userRouter.put("/unique/password/:uuid", isAuthenticated, isSuperAdmin, changeUniquePassword);


export default userRouter;