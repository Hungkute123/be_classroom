import { Schema, model } from "mongoose";
interface ReviewMark {
  Name: string;
  MSSV: string;
  TypeMark: string;
  CodeClass: string;
  CurrentMark: number;
  DesiredMark: number;
  CommentStudent: string;
  FinalMask?: number;
  Answer?: string;
  Mark?: number;
  Status: boolean;
}
const ReviewMarkSchema = new Schema<ReviewMark>({
  Name: { type: String, require: true },
  MSSV: { type: String, require: true },
  TypeMark: { type: String, require: true },
  CodeClass: { type: String, require: true },
  CurrentMark: { type: Number, require: true },
  DesiredMark: { type: Number, require: true },
  CommentStudent: { type: String, require: true },
  FinalMask: Number,
  Answer: String,
  Mark: Number,
  Status: { type: Boolean, require: true },
});

export const ReviewMarkModel = model<ReviewMark>(
  "reviewmarks",
  ReviewMarkSchema
);
