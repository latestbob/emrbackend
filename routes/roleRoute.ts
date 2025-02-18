import { Router } from 'express';
import { createRole } from '../controllers/roleController';

import { validateRole } from '../middlewares/validateRole';
import { getRole, deleteRole } from '../controllers/roleController';
import isAuthenticated from '../middlewares/authenticated';
import isAdmin from '../middlewares/adminMiddleware';



const roleRouter = Router ();


//create role

roleRouter.post('/create', validateRole, isAuthenticated, isAdmin, createRole); //sudo admin

//get all role in an office

roleRouter.get('/:office_uuid',isAuthenticated, getRole);

//delete Role

roleRouter.delete('/:id', deleteRole);  // middleware super admin



export default roleRouter;