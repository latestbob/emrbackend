import { Router } from 'express';
// import { registerUser , LoginUser, getUser, forgotPass, verifyToken, resetPass } from '../controllers/authController';
// import { validateRegiseter, validateLogin, validateForgot, validateReset } from '../midlewares/authMiddleware';
import isAuthenticated from '../middlewares/authenticated';

import isAdmin from '../middlewares/adminMiddleware';
import isSuperAdmin from '../middlewares/superMiddleware';
import { addDrugGenericName, fetchDrugGenericName } from '../controllers/drugsController';






const drugRouter = Router();


// add new diagnosis

drugRouter.post('/generic-name', isAuthenticated, addDrugGenericName);

//get all generic

drugRouter.get('/fetch/generic-names', isAuthenticated, fetchDrugGenericName);






export default drugRouter;