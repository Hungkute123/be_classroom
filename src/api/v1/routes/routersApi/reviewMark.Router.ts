import { Router, Request, Response } from "express";
const reviewMarkRouter = Router();

// Middleware

// Controller
import { reviewMarkController } from "../../controllers";
import { authenTokenMiddleware } from "../../middlewares/authenToken.Middleware";

//-------------------------------------------- api/products/... -------------------------------

//--------------------------------------------GET------------------------------------------
reviewMarkRouter.get("/get-all-review", authenTokenMiddleware, reviewMarkController.getAllReviewMark);

//--------------------------------------------POST-----------------------------------------
reviewMarkRouter.post("/add-review", authenTokenMiddleware, reviewMarkController.addReviewMark);

//--------------------------------------------PUT------------------------------------------


//--------------------------------------------DELETE----------------------------------------

export = reviewMarkRouter;
