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
import { accountServices } from "../services";
class MemberController {
  getTeacherByCodeClass = asyncMiddleware(
    async (req: Request, res: Response): Promise<void> => {
      const CodeClass: string = String(req.query.codeclass);
      const IDUser = res.locals.data._doc._id;
      const { data, message, status } =
        await memberServices.checkMemberValidClassroom(IDUser, CodeClass);
      if (data !== null) {
        const { dataTeacher } = await memberServices.getTeacherByCodeClass(
          CodeClass
        );
        let listID: any[] = [];
        dataTeacher.map((d: any, k: any) => {
          listID.push(d.IDUser);
        });
        console.log("hung", listID);
        const { data, message, status } = await accountServices.getInfoByListID(
          listID
        );
        res.status(status).send({ data, message });
      } else {
        res.status(status).send({ data, message });
      }
    }
  );
  getStudentByCodeClass = asyncMiddleware(
    async (req: Request, res: Response): Promise<void> => {
      const CodeClass: string = String(req.query.codeclass);
      const { dataStudent } = await memberServices.getStudentByCodeClass(
        CodeClass
      );
      let listID: any[] = [];
      dataStudent.map((d: any, k: any) => {
        listID.push(d.IDUser);
      });
      const { data, message, status } = await accountServices.getInfoByListID(
        listID
      );
      res.status(status).send({ data, message });
    }
  );
  joinClassroom = asyncMiddleware(
    async (req: Request, res: Response): Promise<void> => {
      const CodeClass: string = String(req.query.codeclass);
      const Permission: string = String(req.query.permission);
      const IDUser = res.locals.data._doc._id;
      const { data, message, status } =
        await memberServices.checkMemberValidClassroom(IDUser, CodeClass);
      if (status !== 200) {
        const { data, message, status } = await memberServices.addMember(
          IDUser,
          CodeClass,
          Permission,
          true
        );
        res.status(status).send({ data, message });
      } else {
        res.status(status).send({ data, message });
      }
    }
  );
  getMyInfo = asyncMiddleware(
    async (req: Request, res: Response): Promise<void> => {
      const CodeClass: string = String(req.query.codeclass);
      const IDUser = res.locals.data._doc._id;
      const { data, message, status } =
        await memberServices.checkMemberValidClassroom(IDUser, CodeClass);
      res.status(status).send({ data, message });
    }
  );
  joinClassroomByCodeClass = asyncMiddleware(
    async (req: Request, res: Response): Promise<void> => {
      const CodeClass: string = String(req.query.codeclass);
      const Permission: string = "Student";
      const IDUser = res.locals.data._doc._id;
      const { data, message, status } =
        await memberServices.checkMemberValidClassroom(IDUser, CodeClass);
      if (status !== 200) {
        const { data, message, status } = await memberServices.addMember(
          IDUser,
          CodeClass,
          Permission,
          true
        );
        res.status(status).send({ data, message });
      } else {
        res.status(status).send({ data, message });
      }
    }
  );
}
export const memberController = new MemberController();
