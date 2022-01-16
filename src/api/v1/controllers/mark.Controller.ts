// dependencies
import { Request, Response } from "express";
import { parse } from "path/posix";

// Interfaces

// Middlewares
import { asyncMiddleware } from "../middlewares/async.Middleware";

// services
import { markServices } from "../services";

class MarkController {
  addListStudent = asyncMiddleware(
    async (req: Request, res: Response): Promise<void> => {
      const body = req.body;
      const listStudent = body.ListStudent;
      const codeClass = body.CodeClass;

      const { data, message, status } = await markServices.addListStudent(
        listStudent,
        codeClass
      );

      res.status(status).json({ data, message });
    }
  );

  addMark = asyncMiddleware(
    async (req: Request, res: Response): Promise<void> => {
      const body = req.body;
      const listMark = body.ListMark;
      const codeClass = body.CodeClass;
      const structure = body.KeyStructure;
      const listMSSV = [];

      for (let i = 0; i < listMark.length; i++) {
        listMSSV.push(listMark[i]["MSSV"]);
        delete listMark[i]["MSSV"];
      }

      const { data, message, status } = await markServices.addMark(
        listMark,
        structure,
        listMSSV,
        codeClass
      );

      res.status(status).json({ data, message });
    }
  );

  getAllMark = asyncMiddleware(
    async (req: Request, res: Response): Promise<void> => {
      const query = req.query;
      const codeClass = String(query.CodeClass);

      const { data, message, status } = await markServices.getAllMark(
        codeClass
      );

      res.status(status).json({ data, message });
    }
  );

  getMark = asyncMiddleware(
    async (req: Request, res: Response): Promise<void> => {
      const query = req.query;
      const codeClass = String(query.CodeClass);
      const MSSV = String(query.MSSV);

      const { data, message, status } = await markServices.getMark(
        codeClass,
        MSSV
      );

      res.status(status).json({ data, message });
    }
  );

  updateMark = asyncMiddleware(
    async (req: Request, res: Response): Promise<void> => {
      const { codeClass, MSSV, Point, MarkType } = req.body;

      const { data, message, status } = await markServices.updateMark(
        codeClass,
        MSSV,
        Point,
        MarkType
      );

      res.status(status).json({ data, message });
    }
  );
}
export const markController = new MarkController();
