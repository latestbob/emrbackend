import { Router } from 'express';

import isAuthenticated from '../middlewares/authenticated';
import { changePassword, getNonClinicalStaff, getUniqueUser, updateProfile, updateUniqueUser, changeUniquePassword, getClinicalStaff } from '../controllers/userController';
import { validateChangePassword, validateUpdateStaff } from '../middlewares/userMiddleware';
import isAdmin from '../middlewares/adminMiddleware';
import isSuperAdmin from '../middlewares/superMiddleware';
import { validateRegiseter } from '../middlewares/authMiddleware';


const userRouter = Router();



// user update profile (phone)

userRouter.put('/profile', isAuthenticated, updateProfile);

//change password
userRouter.put('/changepassword', validateChangePassword, isAuthenticated, isAdmin, changePassword);


//get all users that are not doctors or nurse or clinical staff

//

userRouter.get("/nonclincalstaff", isAuthenticated, getNonClinicalStaff)

userRouter.get("/clinicalstaff", isAuthenticated, getClinicalStaff)


//get unique user staff by uuid

userRouter.get("/unique/:uuid", isAuthenticated, isAdmin, getUniqueUser);


//update user, this is for admin or support admin
userRouter.put("/unique/update", validateUpdateStaff, isAuthenticated, isAdmin, updateUniqueUser);

//change unique staff password
userRouter.put("/unique/password/:uuid", isAuthenticated, isSuperAdmin, changeUniquePassword);


export default userRouter;