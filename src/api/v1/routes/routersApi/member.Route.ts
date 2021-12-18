import { Router, Request, Response } from "express";
const memberRouter = Router();

// Middleware

// Controller
import { memberController } from "../../controllers/member.Controller";
import { authenTokenMiddleware } from "../../middlewares/authenToken.Middleware";

//-------------------------------------------- api/products/... -------------------------------

//--------------------------------------------GET------------------------------------------
memberRouter.get("/teacher",authenTokenMiddleware, memberController.getTeacherByCodeClass);
memberRouter.get("/student", memberController.getStudentByCodeClass);
memberRouter.get("/join",authenTokenMiddleware, memberController.joinClassroom);
memberRouter.get("/my-info",authenTokenMiddleware, memberController.getMyInfo);
memberRouter.get("/join-codeclass",authenTokenMiddleware, memberController.joinClassroomByCodeClass);

//--------------------------------------------POST-----------------------------------------

//--------------------------------------------PUT------------------------------------------

//--------------------------------------------DELETE----------------------------------------

export = memberRouter;
