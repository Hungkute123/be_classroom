"use strict";
var express_1 = require("express");
var classRouter = express_1.Router();
// Middleware
// Controller
var class_Controller_1 = require("../../controllers/class.Controller");
var authenToken_Middleware_1 = require("../../middlewares/authenToken.Middleware");
//-------------------------------------------- api/products/... -------------------------------
//--------------------------------------------GET------------------------------------------
classRouter.get('/', authenToken_Middleware_1.authenTokenMiddleware, class_Controller_1.classController.getClassByIDUser);
classRouter.get('/codeclass', authenToken_Middleware_1.authenTokenMiddleware, class_Controller_1.classController.getClassByCodeClass);
classRouter.get('/invite', authenToken_Middleware_1.authenTokenMiddleware, class_Controller_1.classController.inviteClassroom);
classRouter.get("/owner", authenToken_Middleware_1.authenTokenMiddleware, class_Controller_1.classController.isOwnerClass);
classRouter.get('/list-class', class_Controller_1.classController.getListClass);
//--------------------------------------------POST-----------------------------------------
classRouter.post('/', authenToken_Middleware_1.authenTokenMiddleware, class_Controller_1.classController.createClass);
//--------------------------------------------PATCH------------------------------------------
classRouter.patch("/update-class", authenToken_Middleware_1.authenTokenMiddleware, class_Controller_1.classController.updateClass);
//--------------------------------------------PUT------------------------------------------
//--------------------------------------------DELETE----------------------------------------
classRouter.delete("/delete-class", authenToken_Middleware_1.authenTokenMiddleware, class_Controller_1.classController.deleteClass);
module.exports = classRouter;
