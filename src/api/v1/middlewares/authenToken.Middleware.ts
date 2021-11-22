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
    const token = String(req.query.jwt);

    if (!token) res.sendStatus(401);

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
