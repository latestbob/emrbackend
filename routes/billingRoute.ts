import { Router } from 'express';
// import { registerUser , LoginUser, getUser, forgotPass, verifyToken, resetPass } from '../controllers/authController';
// import { validateRegiseter, validateLogin, validateForgot, validateReset } from '../midlewares/authMiddleware';
import isAuthenticated from '../middlewares/authenticated';

import isAdmin from '../middlewares/adminMiddleware';
import isSuperAdmin from '../middlewares/superMiddleware';
import { createBill, getAllBillingEncounters } from '../controllers/billingController';




const billingRouter = Router();


// register a user

billingRouter.post('/create', isAuthenticated, createBill);

//get all appointments

billingRouter.get('/all', isAuthenticated, getAllBillingEncounters);





export default billingRouter;