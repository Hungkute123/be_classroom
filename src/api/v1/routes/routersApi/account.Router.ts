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
accountRouter.post('/login-google', accountController.loginWithGoogle);
accountRouter.post("/register", accountController.register);

//--------------------------------------------PATCH------------------------------------------
accountRouter.patch("/update-account", accountController.updateAccount);
accountRouter.patch("/update-account-pass", accountController.updatePass);
accountRouter.patch("/update-account-mssv", accountController.updateMSSV);

//--------------------------------------------PUT------------------------------------------

//--------------------------------------------DELETE----------------------------------------

export = accountRouter;
