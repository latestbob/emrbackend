import { Router } from 'express';
// import { registerUser , LoginUser, getUser, forgotPass, verifyToken, resetPass } from '../controllers/authController';
// import { validateRegiseter, validateLogin, validateForgot, validateReset } from '../middlewares/authMiddleware';
import isAuthenticated from '../middlewares/authenticated';
import { validatePatientRegiseter } from '../middlewares/patientValidate';
import { deleteUniquePatient, getPatients, getUniquePatient, registerPatient, searchUsers, updateUniquePatient } from '../controllers/patientController';
import isAdmin from '../middlewares/adminMiddleware';
import isSuperAdmin from '../middlewares/superMiddleware';

const patientRouter = Router();


// register a user

patientRouter.post('/register', isAuthenticated, validatePatientRegiseter, registerPatient);

//get all registered patients
patientRouter.get("/all", isAuthenticated, getPatients);

//get unique patient by upi
patientRouter.get("/unique/:upi", isAuthenticated, getUniquePatient);


//edit unique patient
patientRouter.put("/unique/:upi", isAuthenticated, validatePatientRegiseter, updateUniquePatient);


//delete unique patient
patientRouter.delete("/unique/:upi", isAuthenticated, isSuperAdmin, deleteUniquePatient);

// search patient by lastame, upi or uuid

patientRouter.get("/search-users", isAuthenticated, searchUsers);


export default patientRouter;