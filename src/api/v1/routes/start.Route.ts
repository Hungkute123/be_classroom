import { Express } from "express";
import classRouter from "./routersApi/class.Route";
import accountRouter from "./routersApi/account.Router";

export function routersApi(app: Express): void {
  app.use("/api/class", classRouter);
  app.use("/api/account", accountRouter);
}
