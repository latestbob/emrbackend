import { Router } from 'express';
// import { registerUser , LoginUser, getUser, forgotPass, verifyToken, resetPass } from '../controllers/authController';
// import { validateRegiseter, validateLogin, validateForgot, validateReset } from '../midlewares/authMiddleware';
import isAuthenticated from '../middlewares/authenticated';

import isAdmin from '../middlewares/adminMiddleware';
import isSuperAdmin from '../middlewares/superMiddleware';

import { validateService } from '../middlewares/serviceMiddleware';
import { addEncounter, fetchAllEncounter, fetchEncounterByAppointmentUuid, fetchEncountersByBillingStatus, fetchEncountersByPatientId, fetchUniqueEncounter, updateConsultationEncounter } from '../controllers/encounterController';
import { validateEncounter, validateUpdateEncounter } from '../middlewares/encounterMiddleware';
import isDoctor from '../middlewares/doctorMiddleware';






const encounterRouter = Router();


// add new diagnosis


encounterRouter.post('/submit', isAuthenticated, validateEncounter,  addEncounter);

//get all encounter

encounterRouter.get('/fetch-all', isAuthenticated, fetchAllEncounter);


encounterRouter.get('/fetch/:uuid', isAuthenticated, fetchUniqueEncounter);

encounterRouter.get('/patient/:id', isAuthenticated, fetchEncountersByPatientId);

encounterRouter.get('/billing/:status', isAuthenticated, fetchEncountersByBillingStatus);

//get unique encounter by appointment uuid

encounterRouter.get('/unique/:appointment_uuid', isAuthenticated, fetchEncounterByAppointmentUuid);

//update encounter by appointment_uuid

encounterRouter.put('/unique/:appointment_uuid', isAuthenticated, isDoctor, validateUpdateEncounter, updateConsultationEncounter);



export default encounterRouter;