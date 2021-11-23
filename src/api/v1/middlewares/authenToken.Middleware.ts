import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// dotenv
import dotenv from "dotenv";
dotenv.config();

export function authenTokenMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  try { 
    let token: string;
    token = req.query.jwt || req.body.jwt;
    console.log("hehe", token)
    if (!token || typeof token == undefined) {res.status(401).json({ data: false, message: "JWT wrong" });
    return;}
    console.log("huhu")
    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string,
      (err, data) => {
        if (err) {
          res.status(200).json({ data: false, message: "JWT wrong" });
          return;
        }

        res.locals.data = data;
        next();
      }
    );
  } catch (error) {
    res.status(401).json(error);
  }
}
