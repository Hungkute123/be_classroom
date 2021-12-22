"use strict";
var express_1 = require("express");
var classStructureRouter = express_1.Router();
// Middleware
// Controller
var classStructure_Controller_1 = require("../../controllers/classStructure.Controller");
var authenToken_Middleware_1 = require("../../middlewares/authenToken.Middleware");
//-------------------------------------------- api/products/... -------------------------------
//--------------------------------------------GET------------------------------------------
classStructureRouter.get('/get', authenToken_Middleware_1.authenTokenMiddleware, classStructure_Controller_1.classStructureController.getClassStructureByCodeClass);
//--------------------------------------------POST-----------------------------------------
classStructureRouter.post('/save', authenToken_Middleware_1.authenTokenMiddleware, classStructure_Controller_1.classStructureController.saveClassStructure);
//--------------------------------------------PATCH------------------------------------------
classStructureRouter.patch('/update', authenToken_Middleware_1.authenTokenMiddleware, classStructure_Controller_1.classStructureController.updateClassStructureByID);
//--------------------------------------------PUT------------------------------------------
//--------------------------------------------DELETE----------------------------------------
classStructureRouter.delete('/remove', authenToken_Middleware_1.authenTokenMiddleware, classStructure_Controller_1.classStructureController.removeClassStructureByID);
module.exports = classStructureRouter;
