import { Router } from 'express';
import { createRole } from '../controllers/roleController';




const roleRouter = Router ();


//create role

roleRouter.post('/create', createRole); //sudo admin

//get departments in an office

// departRouter.get('/office/:uuid', getDepartments); 

// //update department   //sudo admin

// departRouter.put('/:id',updateMiddleware, updateDepartment);

// //delete department // sudo admin

// departRouter.delete("/:id", deleteDepartment);



export default roleRouter;