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
//--------------------------------------------POST-----------------------------------------
classRouter.post('/', authenToken_Middleware_1.authenTokenMiddleware, class_Controller_1.classController.createClass);
module.exports = classRouter;
