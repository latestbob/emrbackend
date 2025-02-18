import { Router } from 'express';
// import { registerUser , LoginUser, getUser, forgotPass, verifyToken, resetPass } from '../controllers/authController';
// import { validateRegiseter, validateLogin, validateForgot, validateReset } from '../midlewares/authMiddleware';
import isAuthenticated from '../middlewares/authenticated';

import isAdmin from '../middlewares/adminMiddleware';
import isSuperAdmin from '../middlewares/superMiddleware';
import { addDiagnosis, fetchAllDiagnosis } from '../controllers/diagnosisController';
import isDoctor from '../middlewares/doctorMiddleware';




const diagnosisRouter = Router();


// add new diagnosis

diagnosisRouter.post('/create', isAuthenticated, isDoctor, addDiagnosis);

//get all diagnosis

diagnosisRouter.get('/fetch',  fetchAllDiagnosis);





export default diagnosisRouter;