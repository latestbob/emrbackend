import { Router } from 'express';
// import { registerUser , LoginUser, getUser, forgotPass, verifyToken, resetPass } from '../controllers/authController';
// import { validateRegiseter, validateLogin, validateForgot, validateReset } from '../midlewares/authMiddleware';
import isAuthenticated from '../middlewares/authenticated';

import isAdmin from '../middlewares/adminMiddleware';
import isSuperAdmin from '../middlewares/superMiddleware';

import { validateService } from '../middlewares/serviceMiddleware';
import { addEncounter, fetchAllEncounter, fetchEncountersByBillingStatus, fetchEncountersByPatientId, fetchUniqueEncounter } from '../controllers/encounterController';
import { validateEncounter } from '../middlewares/encounterMiddleware';






const encounterRouter = Router();


// add new diagnosis


encounterRouter.post('/submit', isAuthenticated, validateEncounter,  addEncounter);

//get all encounter

encounterRouter.get('/fetch-all', isAuthenticated, fetchAllEncounter);


encounterRouter.get('/fetch/:uuid', isAuthenticated, fetchUniqueEncounter);

encounterRouter.get('/patient/:id', isAuthenticated, fetchEncountersByPatientId);

encounterRouter.get('/billing/:status', isAuthenticated, fetchEncountersByBillingStatus);





export default encounterRouter;