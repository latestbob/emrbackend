import { Router } from 'express';
// import { registerUser , LoginUser, getUser, forgotPass, verifyToken, resetPass } from '../controllers/authController';
// import { validateRegiseter, validateLogin, validateForgot, validateReset } from '../middlewares/authMiddleware';
import isAuthenticated from '../middlewares/authenticated';
import { validatePatientRegiseter } from '../middlewares/patientValidate';

import isAdmin from '../middlewares/adminMiddleware';
import isSuperAdmin from '../middlewares/superMiddleware';
import { getAppointments, getUniqueAppointment, getUniquePatientAppointment, scheduleAppointment, updateUniqueAppointent } from '../controllers/appointmentController';
import { validateAppointment } from '../middlewares/appointmentMiddleware';

const appointmentRouter = Router();


// register a user

appointmentRouter.post('/schedule', isAuthenticated, validateAppointment,  scheduleAppointment);

//get all appointments


appointmentRouter.get("/all", isAuthenticated, getAppointments);

//get unique appointment by uuid
appointmentRouter.get("/unique/:uuid", isAuthenticated, getUniqueAppointment);

//get all appointment made by a user
appointmentRouter.get("/unique/patient/:upi", isAuthenticated, getUniquePatientAppointment);

//edit unique appointment
appointmentRouter.put("/unique/:uuid", isAuthenticated, updateUniqueAppointent);



export default appointmentRouter;