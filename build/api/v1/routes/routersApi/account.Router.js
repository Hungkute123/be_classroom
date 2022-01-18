"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = require("express");
var passport_1 = __importDefault(require("passport"));
var accountRouter = express_1.Router();
// Middleware
// Controller
var controllers_1 = require("../../controllers");
var authenToken_Middleware_1 = require("../../middlewares/authenToken.Middleware");
//-------------------------------------------- api/products/... -------------------------------
//--------------------------------------------GET------------------------------------------
accountRouter.get('/auth/google', passport_1.default.authenticate('google', { scope: ['profile'] }));
accountRouter.get('/auth/google/callback', passport_1.default.authenticate('google', { failureRedirect: process.env.URL_MY_FRONTEND, session: true }), function (req, res) {
    res.redirect("" + process.env.URL_MY_FRONTEND);
});
accountRouter.get('/get-info', authenToken_Middleware_1.authenTokenMiddleware, controllers_1.accountController.getInfo);
accountRouter.get('/get-list-user-accounts', controllers_1.accountController.getListUserAccounts);
accountRouter.get('/get-list-admin-accounts', controllers_1.accountController.getListAdminAccounts);
//--------------------------------------------POST-----------------------------------------
accountRouter.post("/login", controllers_1.accountController.login);
accountRouter.post('/login-google', controllers_1.accountController.loginWithGoogle);
accountRouter.post("/register", controllers_1.accountController.register);
accountRouter.post("/admin-login", controllers_1.accountController.adminLogin);
accountRouter.post("/admin-register", controllers_1.accountController.adminRegister);
accountRouter.post("/forgot-password", controllers_1.accountController.forgotPassword);
//--------------------------------------------PATCH------------------------------------------
accountRouter.patch("/update-account", authenToken_Middleware_1.authenTokenMiddleware, controllers_1.accountController.updateAccount);
accountRouter.patch("/update-account-pass", authenToken_Middleware_1.authenTokenMiddleware, controllers_1.accountController.updatePass);
accountRouter.patch("/update-account-mssv", authenToken_Middleware_1.authenTokenMiddleware, controllers_1.accountController.updateMSSV);
//--------------------------------------------PUT------------------------------------------
//--------------------------------------------DELETE----------------------------------------
accountRouter.delete("/delete-account", authenToken_Middleware_1.authenTokenMiddleware, controllers_1.accountController.deleteAccount);
module.exports = accountRouter;
