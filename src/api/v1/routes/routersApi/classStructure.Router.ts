import { Router, Request, Response } from 'express';
const classStructureRouter = Router();

// Middleware

// Controller
import { classStructureController } from '../../controllers/classStructure.Controller';
import { authenTokenMiddleware } from '../../middlewares/authenToken.Middleware';


//-------------------------------------------- api/products/... -------------------------------

//--------------------------------------------GET------------------------------------------
classStructureRouter.get('/get',authenTokenMiddleware, classStructureController.getClassStructureByCodeClass);



//--------------------------------------------POST-----------------------------------------

classStructureRouter.post('/save',authenTokenMiddleware, classStructureController.saveClassStructure);
//--------------------------------------------PATCH------------------------------------------
classStructureRouter.patch('/update',authenTokenMiddleware, classStructureController.updateClassStructureByID);
//--------------------------------------------PUT------------------------------------------

//--------------------------------------------DELETE----------------------------------------
classStructureRouter.delete('/remove',authenTokenMiddleware, classStructureController.removeClassStructureByID);

export = classStructureRouter;
