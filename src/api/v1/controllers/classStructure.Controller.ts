// dependencies
import { Request, Response } from "express";
import { parse } from "path/posix";

// Interfaces

// Middlewares
import { asyncMiddleware } from "../middlewares/async.Middleware";
import { classStructureServices } from "../services/classStructure.Service";

// services

class ClassStructureController {
  getClassStructureByCodeClass = asyncMiddleware(
    async (req: Request, res: Response): Promise<void> => {
      const CodeClass: string = String(req.query.CodeClass);
      const { data, message, status } =
        await classStructureServices.getClassStructureByCodeClass(CodeClass);

      res.status(status).send({ data, message });
    }
  );
  saveClassStructure = asyncMiddleware(
    async (req: Request, res: Response): Promise<void> => {
      const CodeClass: string = String(req.body.CodeClass);
      const MarkType: string = String(req.body.MarkType);
      const Mark: number = Number(req.body.Mark);
      const { data, message, status } =
        await classStructureServices.saveClassStructure(
          CodeClass,
          MarkType,
          Mark
        );
      res.status(status).send({ data, message });
    }
  );
  updateClassStructureByID = asyncMiddleware(
    async (req: Request, res: Response): Promise<void> => {
      const Id: string = String(req.body._id);
      const CodeClass: string = String(req.body.CodeClass);
      const MarkType: string = String(req.body.MarkType);
      const Mark: number = Number(req.body.Mark);
      const Complete: boolean = req.body.Complete;

      const { data, message, status } =
        await classStructureServices.updateClassStructureByID(
          Id,
          CodeClass,
          MarkType,
          Mark,
          Complete,
        );
      res.status(status).send({ data, message });
    }
  );
  removeClassStructureByID = asyncMiddleware(
    async (req: Request, res: Response): Promise<void> => {
      const Id: string = String(req.query._id);
      const { data, message, status } =
        await classStructureServices.removeClassStructureByID(Id);
      res.status(status).send({ data, message });
    }
  );
}
export const classStructureController = new ClassStructureController();
