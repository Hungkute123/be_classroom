import { Express } from "express";
import classRouter from "./routersApi/class.Route";
import memberRouter from "./routersApi/member.Route";
import accountRouter from "./routersApi/account.Router";
export function routersApi(app: Express): void {
  app.use("/api/class", classRouter);
  app.use("/api/member", memberRouter);
  app.use("/api/account", accountRouter);
  app.use("/api/class-structure", accountRouter);
}
