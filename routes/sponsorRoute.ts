import { Router } from 'express';
// import { registerUser , LoginUser, getUser, forgotPass, verifyToken, resetPass } from '../controllers/authController';
// import { validateRegiseter, validateLogin, validateForgot, validateReset } from '../midlewares/authMiddleware';
import isAuthenticated from '../middlewares/authenticated';

import isAdmin from '../middlewares/adminMiddleware';
import isSuperAdmin from '../middlewares/superMiddleware';
import { addNewSponsor, createSponsorPlan, deleteUniqueSponsor, fetchAllSponsor, fetchAllSponsorPlans, updateUniqueSponsor } from '../controllers/sponsorController';
import { validateSponsor } from '../middlewares/sponsorMiddleware';








const sponsorRouter = Router();


// add new sponsor

sponsorRouter.post('/create',validateSponsor, isAuthenticated, addNewSponsor);

//get sponsor

sponsorRouter.get('/fetch', isAuthenticated, fetchAllSponsor);


//edit unique sponsor

sponsorRouter.put('/edit/:uuid', validateSponsor, isAuthenticated, updateUniqueSponsor);


//delete unique sponsor

sponsorRouter.delete('/delete/:uuid', isAuthenticated, deleteUniqueSponsor);


//sponsor plan

sponsorRouter.post('/plan/:uuid', isAuthenticated, createSponsorPlan);

// get all plan code

sponsorRouter.get('/fetch/plans', isAuthenticated, fetchAllSponsorPlans)







export default sponsorRouter;