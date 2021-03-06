// dependencies
import { Request, Response } from "express";
import { parse } from "path/posix";

// Interfaces

// Middlewares
import { asyncMiddleware } from "../middlewares/async.Middleware";

// services
import { reviewMarkServices } from "../services";

class ReviewMarkController {
  getAllReviewMark = asyncMiddleware(
    async (req: Request, res: Response): Promise<void> => {
      const query = req.query;
      const codeClass = String(query.CodeClass);

      const { data, message, status } =
        await reviewMarkServices.getAllReviewMark(codeClass);

      res.status(status).json({ data, message });
    }
  );

  getReviewMark = asyncMiddleware(
    async (req: Request, res: Response): Promise<void> => {
      const query = req.query;
      const codeClass = String(query.CodeClass);
      const MSSV = String(query.MSSV);

      const { data, message, status } = await reviewMarkServices.getReviewMark(
        codeClass,
        MSSV
      );

      res.status(status).json({ data, message });
    }
  );

  addReviewMark = asyncMiddleware(
    async (req: Request, res: Response): Promise<void> => {
      const body = req.body;
      const reviewMark = body.reviewMark;

      const { data, message, status } = await reviewMarkServices.addReviewMark(
        reviewMark
      );

      res.status(status).json({ data, message });
    }
  );

  updateReviewMark = asyncMiddleware(
    async (req: Request, res: Response): Promise<void> => {
      const body = req.body;
      const codeClass = body.CodeClass;
      const MSSV = body.MSSV;
      const typeMark = body.TypeMark;
      const reviewMark = body.reviewMark;
      const currentMark = body.CurrentMark;
      const desiredMark = body.DesiredMark;
      const commentStudent = body.CommentStudent;

      const { data, message, status } =
        await reviewMarkServices.updateReviewMark(
          MSSV,
          codeClass,
          typeMark,
          reviewMark,
          currentMark,
          desiredMark,
          commentStudent
        );

      res.status(status).json({ data, message });
    }
  );
}

export const reviewMarkController = new ReviewMarkController();
