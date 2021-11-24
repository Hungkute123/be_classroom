"use strict";
var express_1 = require("express");
var accountRouter = express_1.Router();
// Middleware
// Controller
var controllers_1 = require("../../controllers");
var authenToken_Middleware_1 = require("../../middlewares/authenToken.Middleware");
//-------------------------------------------- api/products/... -------------------------------
//--------------------------------------------GET------------------------------------------
accountRouter.get('/get-info', authenToken_Middleware_1.authenTokenMiddleware, controllers_1.accountController.getInfo);
//--------------------------------------------POST-----------------------------------------
accountRouter.post("/login", controllers_1.accountController.login);
accountRouter.post('/login-google', controllers_1.accountController.loginWithGoogle);
accountRouter.post("/register", controllers_1.accountController.register);
//--------------------------------------------PATCH------------------------------------------
accountRouter.patch("/update-account", authenToken_Middleware_1.authenTokenMiddleware, controllers_1.accountController.updateAccount);
accountRouter.patch("/update-account-pass", authenToken_Middleware_1.authenTokenMiddleware, controllers_1.accountController.updatePass);
accountRouter.patch("/update-account-mssv", authenToken_Middleware_1.authenTokenMiddleware, controllers_1.accountController.updateMSSV);
module.exports = accountRouter;
