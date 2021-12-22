import { Schema, model } from "mongoose";
interface Mark {
  IDUser?: string;
  Image?: string;
  Name: string;
  MSSV: string;
  CodeClass: string;
  Point?: Object;
}
const MarkSchema = new Schema<Mark>({
  IDUser: String,
  Image: String,
  Name: { type: String, require: true },
  MSSV: { type: String, require: true },
  CodeClass: { type: String, require: true },
  Point: Object,
});

export const MarkModel = model<Mark>("marks", MarkSchema);
