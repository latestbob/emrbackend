import { Router } from 'express';
// import { registerUser , LoginUser, getUser, forgotPass, verifyToken, resetPass } from '../controllers/authController';
// import { validateRegiseter, validateLogin, validateForgot, validateReset } from '../midlewares/authMiddleware';
import isAuthenticated from '../middlewares/authenticated';

import isAdmin from '../middlewares/adminMiddleware';
import isSuperAdmin from '../middlewares/superMiddleware';
import { createBill, createEncounterTransaction, getAllBillingEncounters } from '../controllers/billingController';
import isReceptionAdmin from '../middlewares/receptionAdminMiddleware';
import { validateTransaction } from '../middlewares/transactionMiddleware';
// import { ITransaction } from '../interfaces/ITransaction';





const billingRouter = Router();


// register a user

billingRouter.post('/create', isAuthenticated, createBill);

//get all appointments

billingRouter.get('/all', isAuthenticated, getAllBillingEncounters);

billingRouter.post('/transaction', isAuthenticated, isReceptionAdmin, validateTransaction, createEncounterTransaction);





export default billingRouter;