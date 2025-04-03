import { Router } from 'express';
// import { registerUser , LoginUser, getUser, forgotPass, verifyToken, resetPass } from '../controllers/authController';
// import { validateRegiseter, validateLogin, validateForgot, validateReset } from '../middlewares/authMiddleware';
import isAuthenticated from '../middlewares/authenticated';
import { validatePatientRegiseter } from '../middlewares/patientValidate';

import isAdmin from '../middlewares/adminMiddleware';
import isSuperAdmin from '../middlewares/superMiddleware';
import { getAppointments, getUniqueAppointment, getUniquePatientAppointment, scheduleAppointment, updateUniqueAppointent } from '../controllers/appointmentController';
import { getUniqueConsultation } from '../controllers/consultationController';
import isDoctor from '../middlewares/doctorMiddleware';

const consultationRouter = Router();


// register a user



//get unique doctor consultation



//get unique appointment by uuid
consultationRouter.get("/doctor/:consultant_uuid", isAuthenticated, isDoctor, getUniqueConsultation);


export default consultationRouter;