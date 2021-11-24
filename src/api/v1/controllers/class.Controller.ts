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
      const { data, message, status } =
      await classServices.getClassByCodeClass(CodeClass);
    res.status(status).send({ data, message });
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
      console.log("haha", req.query);
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
        subject: "Email mời bạn tham gia lớp học ✔",
        text: "Chào mừng bạn đến với Classroom",
        html:
          "<b>Nhấn vào đường link để có thể tham gia khóa học: " +
          path +
          "<b>.Vui lòng không chia sẽ link với bất kỳ ai!",
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
}
export const classController = new ClassController();
