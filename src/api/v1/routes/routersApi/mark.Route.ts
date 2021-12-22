import { Router, Request, Response } from "express";
const markRouter = Router();

// Middleware

// Controller
import { markController } from "../../controllers";
import { authenTokenMiddleware } from "../../middlewares/authenToken.Middleware";

//-------------------------------------------- api/products/... -------------------------------

//--------------------------------------------GET------------------------------------------
markRouter.get("/get-all-mark", authenTokenMiddleware, markController.getAllMark);

//--------------------------------------------POST-----------------------------------------
markRouter.post("/add-list-student", authenTokenMiddleware, markController.addListStudent);
markRouter.post("/add-mark", authenTokenMiddleware, markController.addMark);

//--------------------------------------------PUT------------------------------------------

//--------------------------------------------DELETE----------------------------------------

export = markRouter;
