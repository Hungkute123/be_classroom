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
import nodemailer from "nodemailer";
class ClassController {
  getClassByIDUser = async (req: Request, res: Response): Promise<void> => {
    const IDUser = res.locals.data._doc._id;
    const { dataUser, message, status } = await memberServices.getClassByIDUser(
      IDUser
    );

    if (status === 200) {
      let dbCodeClass: any[] = [];
      dataUser.map((d: any, k: any) => {
        dbCodeClass.push(d.CodeClass);
      });
      const { data, message, status } =
        await classServices.getClassByListCodeClass(dbCodeClass);
      res.status(status).send({ data, message });
    } else {
      res.status(status).send({ message });
    }
  };

  createClass = async (req: Request, res: Response): Promise<void> => {
    const IDUser = res.locals.data._doc._id;
    let CodeClass: string;
    while (true) {
      CodeClass = cryptoRandomString({ length: 7 });
      const { data, message, status } = await classServices.getsingleCodeClass(
        CodeClass
      );
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
    const Status: boolean = true;
    const { data, message, status } = await classServices.createClass(
      IDUser,
      CodeClass,
      Title,
      Theme,
      Part,
      Image,
      Room,
      Status
    );
    if (data !== null) {
      const Name = res.locals.data._doc.Name;
      const Image = res.locals.data._doc.Image;
      const MSSV = res.locals.data._doc.MSSV;
      await memberServices.addMember(
        IDUser,
        CodeClass,
        "Teacher",
        true,
        Name,
        Image,
        MSSV
      );
      const { data, message, status } = await classServices.getClassByCodeClass(
        CodeClass
      );
      res.status(status).send({ data, message });

      return;
    }
    res.status(status).send({ data, message });
  };

  getClassByCodeClass = asyncMiddleware(
    async (req: Request, res: Response): Promise<void> => {
      const CodeClass: string = String(req.query.codeclass);
      const IDUser = res.locals.data._doc._id;
      const { data, message, status } =
        await memberServices.checkMemberValidClassroom(IDUser, CodeClass);
      if (data !== null) {
        const { data, message, status } =
          await classServices.getClassByCodeClass(CodeClass);
        res.status(status).send({ data, message });
      } else {
        res.status(status).send({ data, message });
      }
    }
  );

  inviteClassroom = asyncMiddleware(
    async (req: Request, res: Response): Promise<void> => {
      const email: string = String(req.query.email);
      const path: string = String(req.query.path);
      console.log(req.query, req.body);
      // create reusable transporter object using the default SMTP transport
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        auth: {
          user: process.env.MAIL, // generated ethereal user
          pass: process.env.PASS, // generated ethereal password
        },
      });

      // send mail with defined transport object
      const mailOptions = {
        from: "Classroom",
        to: email,
        subject: "Email m???i b???n tham gia l???p h???c ???",
        text: "Ch??o m???ng b???n ?????n v???i Classroom",
        html:
          "<b>Nh???n v??o ???????ng link ????? c?? th??? tham gia kh??a h???c: " +
          path +
          "<b>.Vui l??ng kh??ng chia s??? link v???i b???t k??? ai!",
      };

      transporter.sendMail(mailOptions, async function (error: any, info: any) {
        if (error) {
          console.log(error);
          res
            .status(400)
            .json({ data: "failed", message: "can not send email" });
        } else {
          res.status(200).json({ data: "success", message: "success" });
        }
      });
    }
  );

  isOwnerClass = asyncMiddleware(
    async (req: Request, res: Response): Promise<void> => {
      const CodeClass: string = String(req.query.codeclass);
      const IDUser = res.locals.data._doc._id;
      const { data, message, status } = await classServices.isOwnerClass(
        IDUser,
        CodeClass
      );
      res.status(status).send({ data, message });
    }
  );
  getListClass = async (req: Request, res: Response): Promise<void> => {
    const { data, message, status } = await classServices.getListClass();
    res.status(status).send({ data, message });
  };

  updateClass = asyncMiddleware(
    async (req: Request, res: Response): Promise<void> => {
      const body = req.body;
      const key = { ...body.key };
      const classroom = { ...body.classroom };
      console.log(key, classroom);

      const { data, message, status } = await classServices.updateClass(
        classroom,
        key
      );

      res.status(status).json({ data, message });
    }
  );

  deleteClass = asyncMiddleware(
    async (req: Request, res: Response): Promise<void> => {
      const query = req.query;
      const id = query.id;
      const { data, message, status } = await classServices.deleteClass(id);

      res.status(status).json({ data, message });
    }
  );
}

export const classController = new ClassController();
