import { Router } from 'express';
// import { registerUser , LoginUser, getUser, forgotPass, verifyToken, resetPass } from '../controllers/authController';
// import { validateRegiseter, validateLogin, validateForgot, validateReset } from '../midlewares/authMiddleware';
import isAuthenticated from '../middlewares/authenticated';

import isAdmin from '../middlewares/adminMiddleware';
import isSuperAdmin from '../middlewares/superMiddleware';
import { createBill, createEncounterTransaction, getAllBillingEncounters } from '../controllers/billingController';

import { getAllTransactions, getTransactionByPatientUpi, getTransactionByUuid } from '../controllers/transactionController';


import isLabRadiologist from '../middlewares/labStaffMiddleware';
import { validateResult, validateResultUpdate } from '../middlewares/resultMiddleware';
import { addResult, downloadUniqueResultByTestName, editUniqueResult, getEncounterResult, getUniqueResult, getUniqueResultByTestName } from '../controllers/resultController';
import isDoctor from '../middlewares/doctorMiddleware';
import isReceptionOnly from '../middlewares/receptionistMiddleware';

const resultRouter = Router();




// transactionRouter.get('/fetch', isAuthenticated, getAllTransactions);

// //get transaction by type_uuid

// transactionRouter.get('/fetch/:type_uuid', isAuthenticated, getTransactionByUuid);

// //transactino made by a patient

// transactionRouter.get('/patient/:upi', isAuthenticated, getTransactionByPatientUpi);

// billingRouter.post('/transaction', isAuthenticated, isReceptionAdmin, validateTransaction, createEncounterTransaction);

resultRouter.post('/add-result', isAuthenticated, isLabRadiologist, validateResult, addResult);

resultRouter.get('/encounter/:uuid', isAuthenticated, isDoctor, getEncounterResult);
resultRouter.get('/unique/:id', isAuthenticated, isDoctor, getUniqueResult);

resultRouter.put("/edit/unique/:id", isAuthenticated, isLabRadiologist, validateResultUpdate, editUniqueResult);

//get unique result buy encounteruuid and test name

resultRouter.get('/unique/:uuid/:testname', isAuthenticated, isDoctor, getUniqueResultByTestName);

resultRouter.get('/download/:uuid/:testname', isAuthenticated, isReceptionOnly, downloadUniqueResultByTestName)




export default resultRouter;