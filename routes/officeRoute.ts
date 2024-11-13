import { Router } from 'express';
import { getAllOffice, createOffice, officUpdate, deleteOffice } from '../controllers/officeController';
import { validateOffice } from '../middlewares/validateOffice';

const officeRouter = Router();

// Define route
officeRouter.get('/fetch', getAllOffice); // to use middleware platform admin

//crate office


officeRouter.post('/create',validateOffice, createOffice); // to use middleware platform admin



//update office details

officeRouter.put('/update/:uuid',officUpdate); // to use middleware office sudo admin

officeRouter.delete('/delete/:uuid', deleteOffice); //super site admin middleware












export default officeRouter;