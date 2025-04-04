import { Router } from 'express';
// import { registerUser , LoginUser, getUser, forgotPass, verifyToken, resetPass } from '../controllers/authController';
// import { validateRegiseter, validateLogin, validateForgot, validateReset } from '../middlewares/authMiddleware';
import isAuthenticated from '../middlewares/authenticated';
import { validatePatientRegiseter } from '../middlewares/patientValidate';
import { deleteUniquePatient, getPaginatedPatients, getPatients, getUniquePatient, registerPatient, searchUsers, updateUniquePatient } from '../controllers/patientController';
import isAdmin from '../middlewares/adminMiddleware';
import isSuperAdmin from '../middlewares/superMiddleware';
import isReceptionAdmin from '../middlewares/receptionAdminMiddleware';

const patientRouter = Router();


// register a user

patientRouter.post('/register', validatePatientRegiseter, isAuthenticated, isReceptionAdmin, registerPatient);

//get all registered patients
patientRouter.get("/all", isAuthenticated, getPatients);

//get paginated patients
patientRouter.get("/fetch-paginated", isAuthenticated, getPaginatedPatients);

//get unique patient by upi
patientRouter.get("/unique/:upi", isAuthenticated, getUniquePatient);


//edit unique patient
patientRouter.put("/unique/:upi", isAuthenticated, validatePatientRegiseter, updateUniquePatient);


//delete unique patient
patientRouter.delete("/unique/:upi", isAuthenticated, isSuperAdmin, deleteUniquePatient);

// search patient by lastame, upi or uuid

patientRouter.get("/search-users", isAuthenticated, searchUsers);


export default patientRouter;