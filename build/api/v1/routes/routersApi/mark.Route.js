"use strict";
var express_1 = require("express");
var markRouter = express_1.Router();
// Middleware
// Controller
var controllers_1 = require("../../controllers");
var authenToken_Middleware_1 = require("../../middlewares/authenToken.Middleware");
//-------------------------------------------- api/products/... -------------------------------
//--------------------------------------------GET------------------------------------------
markRouter.get("/get-all-mark", authenToken_Middleware_1.authenTokenMiddleware, controllers_1.markController.getAllMark);
markRouter.get("/get-mark", authenToken_Middleware_1.authenTokenMiddleware, controllers_1.markController.getMark);
//--------------------------------------------POST-----------------------------------------
markRouter.post("/add-list-student", authenToken_Middleware_1.authenTokenMiddleware, controllers_1.markController.addListStudent);
markRouter.post("/add-mark", authenToken_Middleware_1.authenTokenMiddleware, controllers_1.markController.addMark);
//--------------------------------------------PUT------------------------------------------
markRouter.patch("/update-mark", authenToken_Middleware_1.authenTokenMiddleware, controllers_1.markController.updateMark);
module.exports = markRouter;
