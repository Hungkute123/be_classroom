import { Express } from "express";
import classRouter from "./routersApi/class.Route";
import memberRouter from "./routersApi/member.Route";

export function routersApi(app: Express): void {
  app.use("/api/class", classRouter);
  app.use("/api/member", memberRouter);
}
