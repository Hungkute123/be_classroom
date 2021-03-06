import { Router, Request, Response } from "express";
const markRouter = Router();

// Middleware

// Controller
import { markController } from "../../controllers";
import { authenTokenMiddleware } from "../../middlewares/authenToken.Middleware";

//-------------------------------------------- api/products/... -------------------------------

//--------------------------------------------GET------------------------------------------
markRouter.get("/get-all-mark", authenTokenMiddleware, markController.getAllMark);
markRouter.get("/get-mark", authenTokenMiddleware, markController.getMark);

//--------------------------------------------POST-----------------------------------------
markRouter.post("/add-list-student", authenTokenMiddleware, markController.addListStudent);
markRouter.post("/add-mark", authenTokenMiddleware, markController.addMark);

//--------------------------------------------PUT------------------------------------------
markRouter.patch("/update-mark", authenTokenMiddleware, markController.updateMark);

//--------------------------------------------DELETE----------------------------------------

export = markRouter;
