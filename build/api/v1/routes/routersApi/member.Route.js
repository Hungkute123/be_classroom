"use strict";
var express_1 = require("express");
var memberRouter = express_1.Router();
// Middleware
// Controller
var member_Controller_1 = require("../../controllers/member.Controller");
var authenToken_Middleware_1 = require("../../middlewares/authenToken.Middleware");
//-------------------------------------------- api/products/... -------------------------------
//--------------------------------------------GET------------------------------------------
memberRouter.get("/teacher", authenToken_Middleware_1.authenTokenMiddleware, member_Controller_1.memberController.getTeacherByCodeClass);
memberRouter.get("/student", member_Controller_1.memberController.getStudentByCodeClass);
memberRouter.get("/join", authenToken_Middleware_1.authenTokenMiddleware, member_Controller_1.memberController.joinClassroom);
memberRouter.get("/my-info", authenToken_Middleware_1.authenTokenMiddleware, member_Controller_1.memberController.getMyInfo);
module.exports = memberRouter;
