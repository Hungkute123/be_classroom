import { Router, Request, Response } from 'express';
const classRouter = Router();

// Middleware

// Controller
import { classController } from '../../controllers/class.Controller';


//-------------------------------------------- api/products/... -------------------------------

//--------------------------------------------GET------------------------------------------
classRouter.get('/', classController.getClassByIDUser);
classRouter.get('/codeclass', classController.getClassByCodeClass);



//--------------------------------------------POST-----------------------------------------
classRouter.post('/',classController.createClass);

//--------------------------------------------PUT------------------------------------------

//--------------------------------------------DELETE----------------------------------------

export = classRouter;
