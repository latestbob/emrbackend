import { Router } from 'express';
import { createDepartment , getDepartments, updateDepartment, deleteDepartment} from '../controllers/departmentController';
import { validateDepartment, updateMiddleware } from '../middlewares/validaeDepartments';
import isAuthenticated from '../middlewares/authenticated';
import isAdmin from '../middlewares/adminMiddleware';



const departRouter = Router ();


//create department

departRouter.post('/create', validateDepartment, isAuthenticated, isAdmin, createDepartment); //sudo admin

//get departments in an office

departRouter.get('/office/:uuid',isAuthenticated, getDepartments); 

//update department   //sudo admin

departRouter.put('/:id',updateMiddleware, updateDepartment);

//delete department // sudo admin

departRouter.delete("/:id", deleteDepartment);



export default departRouter;