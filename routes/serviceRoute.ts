import { Router } from 'express';
// import { registerUser , LoginUser, getUser, forgotPass, verifyToken, resetPass } from '../controllers/authController';
// import { validateRegiseter, validateLogin, validateForgot, validateReset } from '../midlewares/authMiddleware';
import isAuthenticated from '../middlewares/authenticated';

import isAdmin from '../middlewares/adminMiddleware';
import isSuperAdmin from '../middlewares/superMiddleware';
import { addNewService, fetchAllService, fetchImagingByPlan, fetchIvestigationByPlan, fetchOtherServiceByPlan, fetchServiceByType } from '../controllers/serviceController';
import { validateService } from '../middlewares/serviceMiddleware';






const serviceRouter = Router();


// add new diagnosis

serviceRouter.post('/addservice', validateService, isAuthenticated, addNewService);

//get all service

serviceRouter.get('/fetch', isAuthenticated, fetchAllService)

//get service by type

serviceRouter.get('/fetch/:type', isAuthenticated, fetchServiceByType);

//get investigation by plan

serviceRouter.get('/investigations/:plan', isAuthenticated, fetchIvestigationByPlan);

//get imaging by plan_code
serviceRouter.get('/imaging/:plan', isAuthenticated, fetchImagingByPlan);

//get other service by plan_code

serviceRouter.get("/otherservices/:plan", isAuthenticated, fetchOtherServiceByPlan)






export default serviceRouter;