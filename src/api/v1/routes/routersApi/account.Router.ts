import { Router, Request, Response } from "express";
import passport from "passport";
const accountRouter = Router();

// Middleware

// Controller
import { accountController } from "../../controllers";
import { authenticateAdminMiddleware, authenTokenMiddleware } from "../../middlewares/authenToken.Middleware";

//-------------------------------------------- api/products/... -------------------------------

//--------------------------------------------GET------------------------------------------
accountRouter.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));
accountRouter.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: process.env.URL_MY_FRONTEND, session: true }),
  function (req, res) {
    res.redirect(`${process.env.URL_MY_FRONTEND}`);
  });
  
accountRouter.get('/get-info', authenTokenMiddleware, accountController.getInfo);
accountRouter.get('/get-list-user-accounts',authenticateAdminMiddleware, accountController.getListUserAccounts);
accountRouter.get('/get-list-admin-accounts',authenticateAdminMiddleware, accountController.getListAdminAccounts);
//--------------------------------------------POST-----------------------------------------
accountRouter.post("/login", accountController.login);
accountRouter.post('/login-google', accountController.loginWithGoogle);
accountRouter.post("/register", accountController.register);
accountRouter.post("/admin-login", accountController.adminLogin);
accountRouter.post("/admin-register", accountController.adminRegister);
accountRouter.post("/forgot-password", accountController.forgotPassword);

//--------------------------------------------PATCH------------------------------------------
accountRouter.patch("/update-account", authenTokenMiddleware, accountController.updateAccount);
accountRouter.patch("/update-account-pass", authenTokenMiddleware, accountController.updatePass);
accountRouter.patch("/update-account-mssv", authenTokenMiddleware, accountController.updateMSSV);

//--------------------------------------------PUT------------------------------------------

//--------------------------------------------DELETE----------------------------------------
accountRouter.delete("/delete-account", authenticateAdminMiddleware, accountController.deleteAccount)

export = accountRouter;
