// dependencies
import { Request, Response } from "express";
import { parse } from "path/posix";

// Interfaces

// Middlewares
import { asyncMiddleware } from "../middlewares/async.Middleware";

// services
import { classServices } from "../services/class.Service";
import cryptoRandomString from "crypto-random-string";
import { memberServices } from "../services/member.Service";
import { truncateSync } from "fs";
class MemberController {
  getTeacherByCodeClass = asyncMiddleware(
    async (req: Request, res: Response): Promise<void> => {
      const CodeClass: string = String(req.query.codeclass);
      const { data, message, status } =
        await memberServices.getTeacherByCodeClass(CodeClass);
      res.status(status).send({ data, message });
    }
  );
  getStudentByCodeClass = asyncMiddleware(
    async (req: Request, res: Response): Promise<void> => {
      const CodeClass: string = String(req.query.codeclass);
      const { data, message, status } =
        await memberServices.getStudentByCodeClass(CodeClass);
      res.status(status).send({ data, message });
    }
  );
}
export const memberController = new MemberController();
