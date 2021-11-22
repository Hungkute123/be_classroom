// dependencies
import { Request, Response } from "express";
import { parse } from "path/posix";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// dotenv
import dotenv from "dotenv";
dotenv.config();

// Interfaces

// Middlewares
import { asyncMiddleware } from "../middlewares/async.Middleware";

// services
import { accountServices } from "../services/account.Service";

class AccountController {
  login = asyncMiddleware(
    async (req: Request, res: Response): Promise<void> => {
      const body = req.body;
      const email = String(body.Email);
      const pass = String(body.Password);

      console.log(email, pass);

      const password = await accountServices.getPasswordByEmail(email);

      if (password) {
        const ret = bcrypt.compareSync(pass, password.Password);

        if (ret) {
          const data = await accountServices.getAccountByEmail(email);
          const accessToken = jwt.sign(
            { ...data },
            process.env.ACCESS_TOKEN_SECRET as string,
            {
              expiresIn: "300s",
            }
          );

          res.status(200).json({ data: accessToken, message: "Login success" });

          return;
        }
      }

      res.status(200).json({ data: false, message: "Login failed" });
    }
  );

  register = asyncMiddleware(
    async (req: Request, res: Response): Promise<void> => {
      const body = req.body;
      const email = String(body.Email);
      const pass = String(body.Password);
      const name = String(body.Name);
      const passCover = bcrypt.hashSync(pass, Number(process.env.ROUNDS));

      const account = {
        Email: email,
        Password: passCover,
        Name: name,
        Phone: "",
        MSSV: "",
        Year: "",
        Introduce: "",
        Birth: "",
        Gender: "",
        Permission: 0,
        CodeClass: "",
        Status: false,
      };

      console.log(account);

      const { data, message, status } = await accountServices.register(
        account,
        email
      );

      res.status(status).json({ data, message });
    }
  );

  getInfo = (req: Request, res: Response): void => {
    res.status(200).json({ data: res.locals.data });
  };
}

export const accountController = new AccountController();
