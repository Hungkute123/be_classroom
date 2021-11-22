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
class ClassController {
  getClassByIDUser = asyncMiddleware(
    async (req: Request, res: Response): Promise<void> => {
      const IDUser: number = 1;
      const { data, message, status } = await classServices.getClassByIDUser(
        IDUser
      );
      res.status(status).send({ data, message });
    }
  );
  createClass = asyncMiddleware(
    async (req: Request, res: Response): Promise<void> => {
      const IDUser: number = 1;
      let CodeClass: string;
      while (true) {
        CodeClass = cryptoRandomString({ length: 7 });
        const { data, message, status } =
          await classServices.getsingleCodeClass(CodeClass);
        if (data === null) {
          break;
        }
      }
      const Title: string = req.body.Title || "test";
      const Theme: string = req.body.Theme || "";
      const Part: string = req.body.Part || "";
      const Image: string =
        "https://www.gstatic.com/classroom/themes/img_backtoschool.jpg";
      const Room: string = req.body.Room || "";
      const { data, message, status } = await classServices.createClass(
        IDUser,
        CodeClass,
        Title,
        Theme,
        Part,
        Image,
        Room
      );
      if (data !== null) {
        await memberServices.addMember(IDUser, CodeClass, "Teacher", true);
      }
      res.status(status).send({ data, message });
    }
  );
  getClassByCodeClass = asyncMiddleware(
    async (req: Request, res: Response): Promise<void> => {
      const CodeClass: string = String(req.query.codeclass);
      const { data, message, status } = await classServices.getClassByCodeClass(
        CodeClass
      );
      res.status(status).send({ data, message });
    }
  );
}
export const classController = new ClassController();
