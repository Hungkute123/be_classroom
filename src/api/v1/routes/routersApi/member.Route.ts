import { Router, Request, Response } from "express";
const memberRouter = Router();

// Middleware

// Controller
import { memberController } from "../../controllers/member.Controller";

//-------------------------------------------- api/products/... -------------------------------

//--------------------------------------------GET------------------------------------------
memberRouter.get("/teacher", memberController.getTeacherByCodeClass);
memberRouter.get("/student", memberController.getStudentByCodeClass);

//--------------------------------------------POST-----------------------------------------

//--------------------------------------------PUT------------------------------------------

//--------------------------------------------DELETE----------------------------------------

export = memberRouter;
