import { Router } from 'express';
// import { registerUser , LoginUser, getUser, forgotPass, verifyToken, resetPass } from '../controllers/authController';
// import { validateRegiseter, validateLogin, validateForgot, validateReset } from '../midlewares/authMiddleware';
import isAuthenticated from '../middlewares/authenticated';

import isAdmin from '../middlewares/adminMiddleware';
import isSuperAdmin from '../middlewares/superMiddleware';
import { addNewSponsor, createSponsorPlan, deleteUniqueSponsor, fetchAllSponsor, fetchAllSponsorPlans, fetchPaginateSponsor, fetchUniquePlanByName, getUniqueSponsor, updateUniqueSponsor } from '../controllers/sponsorController';
import { validateSponsor } from '../middlewares/sponsorMiddleware';








const sponsorRouter = Router();


// add new sponsor

sponsorRouter.post('/create',validateSponsor, isAuthenticated, isAdmin, addNewSponsor);

//get sponsor

sponsorRouter.get('/fetch', isAuthenticated, fetchAllSponsor);

//fetch paginate sponsors
sponsorRouter.get('/fetch-paginated', isAuthenticated, fetchPaginateSponsor);

//get unique sponsor

sponsorRouter.get('/fetch/:uuid',  isAuthenticated, getUniqueSponsor);

//edit unique sponsor

sponsorRouter.put('/edit/:uuid', validateSponsor, isAuthenticated, isAdmin, updateUniqueSponsor);


//delete unique sponsor

sponsorRouter.delete('/delete/:uuid', isAuthenticated, deleteUniqueSponsor);


//sponsor plan

sponsorRouter.post('/plan/:uuid', isAuthenticated, createSponsorPlan);

// get all plan code

sponsorRouter.get('/fetch/all/plans', isAuthenticated, fetchAllSponsorPlans)


//get unique plan by name

sponsorRouter.get('/fetch/plan/:name', isAuthenticated, fetchUniquePlanByName)




export default sponsorRouter;