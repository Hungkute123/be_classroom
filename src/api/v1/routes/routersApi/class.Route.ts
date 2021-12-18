import { Router, Request, Response } from 'express';
const classRouter = Router();

// Middleware

// Controller
import { classController } from '../../controllers/class.Controller';
import { authenTokenMiddleware } from '../../middlewares/authenToken.Middleware';


//-------------------------------------------- api/products/... -------------------------------

//--------------------------------------------GET------------------------------------------
classRouter.get('/',authenTokenMiddleware, classController.getClassByIDUser);
classRouter.get('/codeclass',authenTokenMiddleware, classController.getClassByCodeClass);
classRouter.get('/invite',authenTokenMiddleware, classController.inviteClassroom);
classRouter.get("/owner",authenTokenMiddleware, classController.isOwnerClass);

//--------------------------------------------POST-----------------------------------------
classRouter.post('/',authenTokenMiddleware, classController.createClass);

//--------------------------------------------PUT------------------------------------------

//--------------------------------------------DELETE----------------------------------------

export = classRouter;
