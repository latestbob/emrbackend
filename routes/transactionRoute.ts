import { Router } from 'express';
// import { registerUser , LoginUser, getUser, forgotPass, verifyToken, resetPass } from '../controllers/authController';
// import { validateRegiseter, validateLogin, validateForgot, validateReset } from '../midlewares/authMiddleware';
import isAuthenticated from '../middlewares/authenticated';

import isAdmin from '../middlewares/adminMiddleware';
import isSuperAdmin from '../middlewares/superMiddleware';
import { createBill, createEncounterTransaction, getAllBillingEncounters } from '../controllers/billingController';
import isReceptionAdmin from '../middlewares/receptionAdminMiddleware';
import { validateTransaction } from '../middlewares/transactionMiddleware';
import { getAllTransactions, getTransactionByPatientUpi, getTransactionByUuid } from '../controllers/transactionController';
// import { ITransaction } from '../interfaces/ITransaction';





const transactionRouter = Router();


// register a user

// billingRouter.post('/create', isAuthenticated, createBill);

//get all appointments

transactionRouter.get('/fetch', isAuthenticated, getAllTransactions);

//get transaction by type_uuid

transactionRouter.get('/fetch/:type_uuid', isAuthenticated, getTransactionByUuid);

//transactino made by a patient

transactionRouter.get('/patient/:upi', isAuthenticated, getTransactionByPatientUpi);

// billingRouter.post('/transaction', isAuthenticated, isReceptionAdmin, validateTransaction, createEncounterTransaction);





export default transactionRouter;