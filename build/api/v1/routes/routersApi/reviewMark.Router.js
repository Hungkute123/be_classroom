"use strict";
var express_1 = require("express");
var reviewMarkRouter = express_1.Router();
// Middleware
// Controller
var controllers_1 = require("../../controllers");
var authenToken_Middleware_1 = require("../../middlewares/authenToken.Middleware");
//-------------------------------------------- api/products/... -------------------------------
//--------------------------------------------GET------------------------------------------
reviewMarkRouter.get("/get-review", authenToken_Middleware_1.authenTokenMiddleware, controllers_1.reviewMarkController.getReviewMark);
reviewMarkRouter.get("/get-all-review", authenToken_Middleware_1.authenTokenMiddleware, controllers_1.reviewMarkController.getAllReviewMark);
//--------------------------------------------POST-----------------------------------------
reviewMarkRouter.post("/add-review", authenToken_Middleware_1.authenTokenMiddleware, controllers_1.reviewMarkController.addReviewMark);
//--------------------------------------------PUT------------------------------------------
reviewMarkRouter.patch("/update-review", authenToken_Middleware_1.authenTokenMiddleware, controllers_1.reviewMarkController.updateReviewMark);
module.exports = reviewMarkRouter;
