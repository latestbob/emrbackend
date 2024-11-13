import { Router } from 'express';
import { createRole } from '../controllers/roleController';

import { validateRole } from '../middlewares/validateRole';
import { getRole, deleteRole } from '../controllers/roleController';



const roleRouter = Router ();


//create role

roleRouter.post('/create', validateRole, createRole); //sudo admin

//get all role in an office

roleRouter.get('/:office_uuid', getRole);

//delete Role

roleRouter.delete('/:id', deleteRole);  // middleware super admin



export default roleRouter;