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
accountRouter.post("/register", controllers_1.accountController.register);
module.exports = accountRouter;
