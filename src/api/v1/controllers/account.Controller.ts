// dependencies
import { Request, Response, Router } from "express";
import { parse } from "path/posix";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import axios from "axios";

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

      const password = await accountServices.getPasswordByEmail(email);

      if (password) {
        const ret = bcrypt.compareSync(pass, password);

        if (ret) {
          const data = await accountServices.getAccount(
            { Email: email },
            { Password: 0, __v: 0 }
          );
          const accessToken = jwt.sign(
            { ...data },
            process.env.ACCESS_TOKEN_SECRET as string,
            {
              expiresIn: process.env.TIMERESET,
            }
          );

          res.status(200).json({ data: accessToken, message: "Login success" });

          return;
        }
      }

      res.status(200).json({ data: false, message: "Login failed" });
    }
  );

  loginWithGoogle = asyncMiddleware(
    async (req: Request, res: Response): Promise<void> => {
      const body = req.body;
      const jwtGoogle = String(body.jwt);
      axios({
        method: "GET",
        url: `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${jwtGoogle}`,
      })
        .then(async (response: any) => {
          const isEmail = response.data.email_verified;

          if (isEmail) {
            const email = response.data.email;
            const pass = bcrypt.hashSync("123456", Number(process.env.ROUNDS));
            const account = {
              Email: email,
              Name: response.data.name,
              Image: response.data.picture,
              Password: pass,
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
            const { data, message, status } = await accountServices.register(
              account,
              email
            );
            const user = await accountServices.getAccount(
              { Email: email },
              { Password: 0, __v: 0 }
            );
            const accessToken = jwt.sign(
              { ...user },
              process.env.ACCESS_TOKEN_SECRET as string,
              {
                expiresIn: process.env.TIMERESET,
              }
            );

            res
              .status(200)
              .json({ data: accessToken, message: "Login success" });
          }
        })
        .catch((error: any) => {
          console.log(error);
        });
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
        Permission: "User",
        CodeClass: "",
        Status: true,
        Image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJhvWpQrh3nIxmjLBQSyH5uu7OKpprR2b4-g&usqp=CAU",
        CreateDate: Date(),
      };

      const { data, message, status } = await accountServices.register(
        account,
        email
      );

      res.status(status).json({ data, message });
    }
  );

  getInfo = asyncMiddleware(
    async (req: Request, res: Response): Promise<void> => {
      const data = await accountServices.getAccount(
        {
          Email: res.locals.email,
        },
        { Password: 0, __v: 0 }
      );

      res.status(200).json({ data });
    }
  );

  updateAccount = asyncMiddleware(
    async (req: Request, res: Response): Promise<void> => {
      const body = req.body;
      const key = { ...body.key };
      const account = { ...body.account };

      console.log(key, account);

      const { data, message, status } = await accountServices.updateAccount(
        account,
        key
      );

      res.status(status).json({ data, message });
    }
  );

  updatePass = asyncMiddleware(
    async (req: Request, res: Response): Promise<void> => {
      const body = req.body;
      const email = body.Email;
      const password = body.Password;
      const passwordNew = body.PasswordNew;
      const passOld = await accountServices.getPasswordByEmail(email);
      const ret = bcrypt.compareSync(password, passOld);

      if (ret) {
        const account = {
          Email: email,
          Password: bcrypt.hashSync(passwordNew, Number(process.env.ROUNDS)),
        };
        const { data, message, status } = await accountServices.updateAccount(
          { ...account },
          { Email: email }
        );

        res.status(status).json({ data, message });

        return;
      }

      res.status(200).json({ data: false, message: "Incorrect password" });
    }
  );

  updateMSSV = asyncMiddleware(
    async (req: Request, res: Response): Promise<void> => {
      const body = req.body;
      const email = body.Email;
      const mssv = body.MSSV;
      
      const account = await accountServices.getAccount(
        { MSSV: mssv },
        { _id: 0, Password: 0 }
      );

      if (account) {
        res.status(200).json({ data: false, message: "MSSV already exists" });
        return;
      }

      const { data, message, status } = await accountServices.updateAccount(
        { MSSV: mssv },
        { Email: email }
      );

      res.status(status).json({ data, message });
    }
  );
  adminLogin = asyncMiddleware(
    async (req: Request, res: Response): Promise<void> => {
      const body = req.body;
      const email = String(body.Email);
      const pass = String(body.Password);

      const password = await accountServices.getPasswordByEmail(email);

      if (password) {
        const ret = bcrypt.compareSync(pass, password);

        if (ret) {
          const data = await accountServices.getAccount(
            { Email: email },
            { Password: 0, __v: 0 }
          );
          if (data && data.Permission === "Admin") {
            const accessToken = jwt.sign(
              { ...data },
              process.env.ACCESS_TOKEN_SECRET as string,
              {
                expiresIn: process.env.TIMERESET,
              }
            );

            res.status(200).json({ data: accessToken, message: "Login success" });

            return;
          }
        }
      }

      res.status(200).json({ data: false, message: "Login failed" });
    }
  );
  adminRegister = asyncMiddleware(
    async (req: Request, res: Response): Promise<void> => {
      const body = req.body;
      const email = String(body.email);
      const pass = String(body.password);
      const fullName = String(body.full_name);
      const passCover = bcrypt.hashSync(pass, Number(process.env.ROUNDS));

      const account = {
        Email: email,
        Password: passCover,
        Name: fullName,
        Phone: "",
        Year: "",
        Introduce: "",
        Birth: "",
        Gender: "",
        Permission: "Admin",
        Status: true,
        Image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJhvWpQrh3nIxmjLBQSyH5uu7OKpprR2b4-g&usqp=CAU",
        CreateDate: Date(),
      };

      const { data, message, status } = await accountServices.register(
        account,
        email
      );

      res.status(status).json({ data, message });
    }
  );
  getListUserAccounts = asyncMiddleware(
    async (req: Request, res: Response): Promise<void> => {
      const { data, message, status } = await accountServices.getListAccountsWithPermission('User');
      res.status(status).json({ data, message });
    }
  );
  getListAdminAccounts = asyncMiddleware(
    async (req: Request, res: Response): Promise<void> => {
      const { data, message, status } = await accountServices.getListAccountsWithPermission('Admin');
      res.status(status).json({ data, message });
    }
  );
  deleteAccount = asyncMiddleware(
    async (req: Request, res: Response): Promise<void> => {
      const query = req.query;
      const id = query.id;
      const { data, message, status } = await accountServices.deleteAccount(
        id
      );

      res.status(status).json({ data, message });
    }
  );
}

export const accountController = new AccountController();
