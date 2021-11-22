import { Router, Request, Response } from "express";
const accountRouter = Router();

// Middleware

// Controller
import { accountController } from "../../controllers";
import { authenTokenMiddleware } from "../../middlewares/authenToken.Middleware";

//-------------------------------------------- api/products/... -------------------------------

//--------------------------------------------GET------------------------------------------
accountRouter.get('/get-info', authenTokenMiddleware, accountController.getInfo);

//--------------------------------------------POST-----------------------------------------
accountRouter.post("/login", accountController.login);
accountRouter.post("/register", accountController.register);

//--------------------------------------------PUT------------------------------------------

//--------------------------------------------DELETE----------------------------------------

export = accountRouter;
